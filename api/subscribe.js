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

        await resend.emails.send({
            from: 'Broderick <newsletter@news.brody.gg>',
            to: email,
            subject: 'Hey, welcome!',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  background-color: #F5F1E8;
                  padding: 40px 20px;
                  color: #1a1a1a;
                }
                .container {
                  max-width: 500px;
                  margin: 0 auto;
                  background-color: white;
                  padding: 40px;
                  border-radius: 8px;
                }
                .logo {
                  width: 36px;
                  height: 36px;
                  margin-bottom: 24px;
                }
                p {
                  font-size: 16px;
                  line-height: 1.7;
                  margin-bottom: 16px;
                }
                .signature {
                  margin-top: 32px;
                }
                .links {
                  margin-top: 24px;
                  padding-top: 24px;
                  border-top: 1px solid rgba(0,0,0,0.1);
                  font-size: 14px;
                }
                .links a {
                  color: #FF0000;
                  text-decoration: none;
                  margin-right: 16px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="https://www.brody.gg/assets/svg/triangle.svg" alt="Logo" class="logo">

                <p>Hey!</p>

                <p>Thanks for subscribing, it genuinely means a lot that you're interested in what I'm working on.</p>

                <p>I send updates once or twice a month, usually when I finish a project, wrap up an experiment, or have something I think is worth sharing.</p>

                <p>In the meantime, feel free to poke around the site. The experiments page is where I document my random productivity challenges and things I'm testing out. Projects has the stuff I've actually shipped.</p>

                <p class="signature">– Broderick</p>

                <div class="links">
                  <a href="https://brody.gg/projects">Projects</a>
                  <a href="https://brody.gg/experiments">Experiments</a>
                  <a href="https://brody.gg/about">About</a>
                </div>
              </div>
            </body>
            </html>
            `,
        });

        return res.status(200).json({ message: 'Successfully subscribed!' });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
