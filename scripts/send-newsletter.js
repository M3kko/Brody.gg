import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY.trim());

// Your Resend Audience ID
const AUDIENCE_ID = '1563b4e7-a6fb-43e3-a4d7-56041efb7442';

// Newsletter content - UPDATE THIS FOR EACH NEWSLETTER
const subject = "In Pursuit of Better Materials";
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #F5F1E8;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 40px;
      border-radius: 8px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
      margin-bottom: 24px;
      font-style: italic;
    }
    p {
      color: #1a1a1a;
      line-height: 1.7;
      margin-bottom: 16px;
      font-size: 16px;
    }
    .read-more {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 24px;
      background-color: #FF0000;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 14px;
      color: #666;
    }
    .footer a {
      color: #FF0000;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>In Pursuit of Better Materials</h1>
    <p class="subtitle">Humanity's biggest bottleneck.</p>

    <p>Billions are poured into AI each year, over 400 billion in 2025 alone. Venture capital and consumer attention is constantly focused on solving the next software breakthrough, the next thing to give us more control over the digital world. Yet believe it or not, the reason your phone overheats, electric vehicles cost so much, and fusion is constantly "10 years away", is not in fact a software problem.</p>

    <p>And yet when MIT media lab posts on X a brand new discovery that could potentially enable one of these technologies, it gets under 20 likes. In comparison a chatgpt wrapper called Jasper AI that does copywriting for you raised 125 million at a 1.5 BILLION dollar valuation.</p>

    <a href="https://brody.gg/materialspursuit" class="read-more">Read the full article →</a>

    <div class="footer">
      <p>You're receiving this because you subscribed at <a href="https://brody.gg">brody.gg</a></p>
      <p><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
`;

async function sendNewsletter() {
    try {
        console.log('=== Newsletter Send ===\n');

        // Create broadcast
        console.log('Creating broadcast...');

        const { data, error } = await resend.broadcasts.create({
            audienceId: AUDIENCE_ID,
            from: 'Broderick <newsletter@news.brody.gg>',
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Error creating broadcast:', error);
            process.exit(1);
        }

        console.log('Broadcast created successfully');
        console.log('Broadcast ID:', data.id);

        // Send the broadcast
        console.log('\nSending broadcast...');

        const { error: sendError } = await resend.broadcasts.send(data.id);

        if (sendError) {
            console.error('Error sending broadcast:', sendError);
            process.exit(1);
        }

        console.log('✓ Newsletter sent successfully!');
        console.log('Broadcast sent to all subscribers in audience');
        process.exit(0);

    } catch (error) {
        console.error('Error sending newsletter:', error);
        process.exit(1);
    }
}

// TEST MODE - Send to single email
async function sendTestNewsletter(testEmail) {
    try {
        console.log('=== Test Newsletter Send ===\n');
        console.log(`Sending test to: ${testEmail}\n`);

        const { data, error } = await resend.emails.send({
            from: 'Broderick <newsletter@news.brody.gg>',
            to: testEmail,
            subject: `[TEST] ${subject}`,
            html: htmlContent,
        });

        if (error) {
            console.error('Error sending test email:', error);
            process.exit(1);
        }

        console.log('✓ Test newsletter sent successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

// Run test newsletter to me@brody.gg
sendTestNewsletter('me@brody.gg');

// To send to all subscribers, comment out the line above and uncomment this:
// sendNewsletter();
