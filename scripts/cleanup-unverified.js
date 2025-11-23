import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
);

async function cleanupUnverifiedEmails() {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabase
            .from('subscribers')
            .delete()
            .eq('verified', false)
            .lt('created_at', twentyFourHoursAgo);

        if (error) {
            console.error('Error cleaning up unverified emails:', error);
            process.exit(1);
        }

        console.log('Successfully cleaned up unverified emails older than 24 hours');
        console.log(`Deleted ${data?.length || 0} unverified subscribers`);
        process.exit(0);
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

cleanupUnverifiedEmails();
