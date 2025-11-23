import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.PUBLIC_SUPABASE_ANON_KEY.trim()
);

async function cleanupUnverifiedEmails() {
    try {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabase
            .from('subscribers')
            .delete()
            .eq('verified', false)
            .lt('created_at', twoHoursAgo);

        if (error) {
            console.error('Error cleaning up unverified emails:', error);
            process.exit(1);
        }

        console.log('Successfully cleaned up unverified emails older than 2 hours');
        console.log(`Deleted ${data?.length || 0} unverified subscribers`);
        process.exit(0);
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

cleanupUnverifiedEmails();
