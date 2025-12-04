import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
);

const resend = new Resend(process.env.RESEND_API_KEY.trim());

// Your Resend Audience ID (created once, reused for all newsletters)
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

async function syncContactsToResend() {
    try {
        console.log('Syncing contacts from Supabase to Resend...');

        // Get all verified subscribers
        const { data: subscribers, error } = await supabase
            .from('subscribers')
            .select('email')
            .eq('verified', true);

        if (error) {
            console.error('Error fetching subscribers:', error);
            return false;
        }

        if (!subscribers || subscribers.length === 0) {
            console.log('No verified subscribers found');
            return false;
        }

        console.log(`Found ${subscribers.length} verified subscribers`);

        // Add contacts to Resend (respecting rate limits: 2 requests per second)
        let added = 0;
        let existing = 0;

        for (let i = 0; i < subscribers.length; i++) {
            try {
                const { data, error } = await resend.contacts.create({
                    email: subscribers[i].email,
                    unsubscribed: false,
                });

                if (error) {
                    if (error.message && error.message.includes('already exists')) {
                        existing++;
                    } else {
                        console.error(`Failed to add ${subscribers[i].email}:`, error);
                    }
                } else {
                    added++;
                }

                // Wait 500ms between requests (2 requests per second)
                if (i < subscribers.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            } catch (err) {
                console.error(`Error adding contact ${subscribers[i].email}:`, err);
            }
        }

        console.log(`Sync complete: ${added} new, ${existing} existing, ${subscribers.length} total\n`);
        return true;

    } catch (error) {
        console.error('Error syncing contacts:', error);
        return false;
    }
}

async function sendNewsletter(testMode = false, testEmail = null) {
    try {
        console.log('=== Newsletter Send ===\n');

        // Step 1: Sync contacts from Supabase
        const synced = await syncContactsToResend();
        if (!synced) {
            console.error('Failed to sync contacts, aborting send');
            process.exit(1);
        }

        // Step 2: Create and send broadcast
        console.log('Creating broadcast...');

        const broadcastData = {
            audienceId: AUDIENCE_ID,
            from: 'Broderick <newsletter@news.brody.gg>',
            subject: subject,
            html: htmlContent,
        };

        const { data, error } = await resend.broadcasts.create(broadcastData);

        if (error) {
            console.error('Error creating broadcast:', error);
            process.exit(1);
        }

        console.log('Broadcast created successfully');
        console.log('Broadcast ID:', data.id);

        // Step 3: Send the broadcast
        console.log('\nSending broadcast...');

        const { data: sendData, error: sendError } = await resend.broadcasts.send(data.id);

        if (sendError) {
            console.error('Error sending broadcast:', sendError);
            process.exit(1);
        }

        console.log('✓ Newsletter sent successfully!');

        if (testMode) {
            console.log(`\nTest mode: Broadcast sent to ${testEmail}`);
        } else {
            console.log('\nBroadcast sent to all subscribers in audience');
        }

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
