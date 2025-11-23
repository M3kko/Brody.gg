import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
);

export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabase
            .from('subscribers')
            .delete()
            .eq('verified', false)
            .lt('created_at', twentyFourHoursAgo)
            .select();

        if (error) {
            console.error('Error cleaning up unverified emails:', error);
            return res.status(500).json({ error: 'Cleanup failed', details: error.message });
        }

        const deletedCount = data?.length || 0;
        console.log(`Successfully cleaned up ${deletedCount} unverified emails`);

        return res.status(200).json({
            success: true,
            deleted: deletedCount,
            message: `Cleaned up ${deletedCount} unverified subscribers`
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
    }
}
