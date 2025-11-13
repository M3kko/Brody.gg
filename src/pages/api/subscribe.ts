import type { APIRoute } from 'astro';
import { createClient} from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

const supabase = createClient (
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
        }

        const { data: existing } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', email)
        .single();

        if (existing) {
            if (existing.verified) {
                return new Response(
                    JSON.stringify({ error: 'Email already subscribed'}),
                    { status: 400 }
                );
            }
        }

        const verificationToken = crypto.randomUUID();

        const {error: dbError} = await supabase
        .from('subscribers')
        .upsert({
            email,
            verification_token: verificationToken,
            verified: false,
        });

        if (dbError) {
            console.error('Database error:', dbError);
            return new Response(
                JSON.stringify({ error: 'Failed to save email'}),
                { status: 500 }
            );
        }

        const verificationUrl = `${request.headers.get('origin')}/api/verify?token=${verificationToken}`;

        const { error: emailError } = await resend.emails.send({
            from: 'Broderick <newsletter@news.brody.gg>',
            to: email,
            subject: 'Verify your newsletter subscription',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  background-color: #F5F1E8;
                  padding: 40px 20px;
                }
                .container {
                  max-width: 500px;
                  margin: 0 auto;
                  background-color: white;
                  padding: 40px;
                  border-radius: 8px;
                }
                .logo {
                  width: 48px;
                  height: 48px;
                  margin-bottom: 20px;
                }
                h2 {
                  color: #1a1a1a;
                  margin-bottom: 16px;
                }
                p {
                  color: #1a1a1a;
                  line-height: 1.6;
                  margin-bottom: 24px;
                }
                .button {
                  display: inline-block;
                  background-color: #FF0000;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: 500;
                }
                .footer {
                  margin-top: 24px;
                  font-size: 14px;
                  opacity: 0.7;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="https://www.brody.gg/assets/svg/triangle.svg" alt="Logo" class="logo">
                <h2>Hey, it's Broderick!</h2>
                <p>Thank you for subscribing to my newsletter. Please click below to verify that this is really you :)</p>
                <a href="${verificationUrl}" class="button">Verify Email</a>
                <p class="footer">If you didn't request this, you can safely ignore this email.</p>
              </div>
            </body>
            </html>
            `,
        });

        if (emailError) {
            console.error('Email sending error:', emailError);
            return new Response(
                JSON.stringify({ error: 'Failed to send verification email'}),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Sent! Please check your inbox to verify your email' }),
            { status: 200 }
        );

    } catch (error) { 
        console.error('Unexpected error:', error);
        return new Response(
            JSON.stringify({ error: 'Something went wrong' }),
            { status: 500 }
        );
    }
    };
