import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY.trim());
const AUDIENCE_ID = '1563b4e7-a6fb-43e3-a4d7-56041efb7442';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const { error } = await resend.contacts.create({
            audienceId: AUDIENCE_ID,
            email: email,
        });

        if (error) {
            if (error.message?.includes('already exists')) {
                return res.status(200).json({ message: 'You\'re already subscribed!' });
            }
            return res.status(500).json({ error: 'Failed to subscribe' });
        }

        return res.status(200).json({ message: 'Successfully subscribed!' });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
