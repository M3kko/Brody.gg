import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.PUBLIC_SUPABASE_ANON_KEY.trim()
);

const resend = new Resend(process.env.RESEND_API_KEY.trim());

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const verificationToken = crypto.randomUUID();

        const { error: dbError } = await supabase
            .from('subscribers')
            .insert({
                email,
                verification_token: verificationToken,
                verified: false,
            });

        if (dbError) {
            // If email already exists, check if it's verified
            if (dbError.code === '23505') {
                // Try to update only unverified emails
                const { data: updateData, error: updateError } = await supabase
                    .from('subscribers')
                    .update({
                        verification_token: verificationToken,
                        verified: false,
                    })
                    .eq('email', email)
                    .eq('verified', false)
                    .select();

                // If no rows were updated, email is already verified
                if (!updateError && (!updateData || updateData.length === 0)) {
                    return res.status(400).json({ error: 'Email already subscribed' });
                }

                if (updateError) {
                    return res.status(500).json({ error: 'Failed to update email' });
                }
            } else {
                return res.status(500).json({ error: 'Failed to save email' });
            }
        }

        const origin = req.headers.origin || `https://${req.headers.host}`;
        const verificationUrl = `${origin}/api/verify?token=${verificationToken}`;

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
            return res.status(500).json({ error: 'Failed to send verification email' });
        }

        return res.status(200).json({ message: 'Sent! Please check your inbox to verify your email' });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}