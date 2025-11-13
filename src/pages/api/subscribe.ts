import type { APIRoute } from 'astro';
import { createClient} from '@supabase/supabase-js';
import { Resend } from 'resend';

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
            from: 'newsletter@news.brody.gg', 
            to: email,
            subject: 'Verify your newsletter subscription',
            html: `
            <h2>Confirm your subscription</h2>
            <p>Click the link below to verify your email and start receiving newsletters:</p>
            <a href="${verificationUrl}">Verify Email</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
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
