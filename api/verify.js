import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
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
            return res.redirect(302, '/verified?error=expired');
        }

        if (subscriber.verified) {
            return res.redirect(302, '/verified?already=true');
        }

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const createdAt = new Date(subscriber.created_at);

        if (createdAt < twentyFourHoursAgo) {
            await supabase
                .from('subscribers')
                .delete()
                .eq('verification_token', token);

            return res.redirect(302, '/verified?error=expired');
        }

        const { error: updateError } = await supabase
            .from('subscribers')
            .update({
                verified: true,
                verified_at: new Date().toISOString(),
            })
            .eq('verification_token', token);

        if (updateError) {
            return res.redirect(302, '/verified?error=failed');
        }

        return res.redirect(302, '/verified');
    } catch (error) {
        return res.redirect(302, '/?error=something-went-wrong');
    }
}