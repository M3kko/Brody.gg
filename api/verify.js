import { createClient } from '@supabase/supabase-js';

// Check if environment variables are actually defined
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing environment variables in verify:', {
        url: process.env.PUBLIC_SUPABASE_URL ? 'exists' : 'missing',
        key: process.env.PUBLIC_SUPABASE_ANON_KEY ? 'exists' : 'missing'
    });
}

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL || '',
    process.env.PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.query;

    if (!token) {
        return res.redirect(302, '/?error=invalid_token');
    }

    try {
        const { data: subscriber, error: findError } = await supabase
            .from('subscribers')
            .select('*')
            .eq('verification_token', token)
            .single();

        if (findError || !subscriber) {
            return res.redirect(302, '/?error=invalid_token');
        }

        if (subscriber.verified) {
            return res.redirect(302, '/verified?already=true');
        }

        const { error: updateError } = await supabase
            .from('subscribers')
            .update({
                verified: true,
                verified_at: new Date().toISOString(),
            })
            .eq('verification_token', token);

        if (updateError) {
            console.error('Database update error:', updateError);
            return res.redirect(302, '/verified?error=failed');
        }

        return res.redirect(302, '/verified');
    } catch (error) {
        console.error('Verification error:', error);
        return res.redirect(302, '/?error=something-went-wrong');
    }
}