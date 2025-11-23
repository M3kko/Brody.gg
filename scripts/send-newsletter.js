import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.PUBLIC_SUPABASE_ANON_KEY.trim()
);

const resend = new Resend(process.env.RESEND_API_KEY.trim());

async function sendNewsletter(subject, htmlContent) {
    try {
        // Get all verified subscribers
        const { data: subscribers, error } = await supabase
            .from('subscribers')
            .select('email')
            .eq('verified', true);

        if (error) {
            console.error('Error fetching subscribers:', error);
            process.exit(1);
        }

        if (!subscribers || subscribers.length === 0) {
            console.log('No verified subscribers found');
            process.exit(0);
        }

        console.log(`Sending newsletter to ${subscribers.length} subscribers...`);

        // Send emails in batches to avoid rate limits
        const batchSize = 100;
        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);

            const promises = batch.map(subscriber =>
                resend.emails.send({
                    from: 'Broderick <newsletter@news.brody.gg>',
                    to: subscriber.email,
                    subject: subject,
                    html: htmlContent,
                })
            );

            await Promise.all(promises);
            console.log(`Sent batch ${Math.floor(i / batchSize) + 1} (${batch.length} emails)`);

            // Wait a bit between batches to avoid rate limits
            if (i + batchSize < subscribers.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        console.log('Newsletter sent successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error sending newsletter:', error);
        process.exit(1);
    }
}

// Example usage:
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

    <p>Billions are poured into Ai each year, over 400 billion in 2025 alone. Venture capital and consumer attention is constantly focused on solving the next software breakthrough, the next thing to give us more control over the digital world. Yet believe it or not, the reason your phone overheats, electric vehicles cost so much, and fusion is constantly "10 years away", is not in fact a software problem.</p>

    <p>And yet when MIT media lab posts on X a brand new discovery that could potentially enable one of these technologies, it gets under 20 likes. In comparison a chatgpt wrapper called Jasper AI that does copywriting for you raised 125 million at a 1.5 BILLION dollar valuation.</p>

    <a href="https://brody.gg/thoughts/materialspursuit" class="read-more">Read the full article →</a>

    <div class="footer">
      <p>You're receiving this because you subscribed at <a href="https://brody.gg">brody.gg</a></p>
    </div>
  </div>
</body>
</html>
`;

// TEST MODE - Only send to me@brody.gg
async function sendTestNewsletter() {
    try {
        const { error } = await resend.emails.send({
            from: 'Broderick <newsletter@news.brody.gg>',
            to: 'me@brody.gg',
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Error sending test email:', error);
            process.exit(1);
        }

        console.log('Test newsletter sent to me@brody.gg!');
        process.exit(0);
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

// Run test newsletter
sendTestNewsletter();
