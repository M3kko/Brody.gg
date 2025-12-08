import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY.trim());
const AUDIENCE_ID = '1563b4e7-a6fb-43e3-a4d7-56041efb7442';

function verifyToken(token) {
    try {
        const decoded = Buffer.from(token, 'base64url').toString();
        const [email, expires, signature] = decoded.split(':');

        // Verify signature
        const data = `${email}:${expires}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RESEND_API_KEY.trim())
            .update(data)
            .digest('hex');

        if (signature !== expectedSignature) {
            return { valid: false, reason: 'invalid' };
        }

        // Check expiration
        if (Date.now() > parseInt(expires)) {
            return { valid: false, reason: 'expired' };
        }

        return { valid: true, email };
    } catch {
        return { valid: false, reason: 'invalid' };
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.query;

    if (!token) {
        return res.redirect(302, '/?error=invalid_token');
    }

    const result = verifyToken(token);

    if (!result.valid) {
        return res.redirect(302, `/verified?error=${result.reason}`);
    }

    try {
        // Add contact to Resend audience
        const { error } = await resend.contacts.create({
            audienceId: AUDIENCE_ID,
            email: result.email,
        });

        if (error) {
            // If already exists, that's fine - they're already subscribed
            if (error.message?.includes('already exists')) {
                return res.redirect(302, '/verified?already=true');
            }
            return res.redirect(302, '/verified?error=failed');
        }

        return res.redirect(302, '/verified');
    } catch (error) {
        return res.redirect(302, '/?error=something-went-wrong');
    }
}
