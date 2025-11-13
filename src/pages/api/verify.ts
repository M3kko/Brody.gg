import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export const GET: APIRoute = async ({ url, redirect }) => {
    const token = url.searchParams.get('token');

    if (!token) {
        return redirect('/?error=invalid_token');
    }

    try {
        const { data: subscriber, error: findError} = await supabase
        .from('subscribers')
        .select('*')
        .eq('verification_token', token)
        .single();

        if (findError || !subscriber) {
            return redirect('/?error=invalid_token');
        }

        if (subscriber.verified) {
            return redirect('/?message=already_verified');
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
            return redirect('/?error=verification_failed');
        }

        return redirect('/?success=verified');
    } catch (error) {
        console.error('Verification error:', error);
        return redirect('/?error=something-went-wrong');
    }
};