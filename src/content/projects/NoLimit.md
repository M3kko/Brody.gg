---
title: "NoLimit"
description: "Building sports tech for injury prevention used by Olympic athletes."
date: 2026-03-03
draft: false
---

Now that the Olympics are wrapped up I wanted to take some time to write about my experience at NoLimit and the incredible things that we are working on. (you can also read more about my experience at the olympics [here](/2026-Winter-Olympics))

For quick context, NoLimit is a sports tech startup that created shorts with embedded EMG sensors and IMUs to detect muscle activation and track height and speed. They acquired my app [PeakFit](/peakfit) and brought me on as a founding engineer in August of 2025 to architect and build their entire software platform and injury detection algorithms from the ground up.

Beyond the engineering, I also led athlete acquisition. I reached out directly to coaches and teams, demoed the product, and personally signed multiple Olympic athletes from Team USA, Team Italy, and Latvia. Coaches were immediately excited about the injury prevention capabilities. At that level, a single injury can take an athlete out for 3+ months and completely derail a season or an Olympic campaign, so having a system that could catch problems early was something they wanted on their highest-performing athletes right away. Getting our tech into the hands of Olympic athletes and onto the world stage was a massive milestone for us as a company and for me personally.

I own two core pieces of the product:

1. a real-time coaching dashboard and
2. a cross-platform athlete app.

The coaching dashboard gives coaches a live, at-a-glance view of every athlete on their roster. It surfaces potential issues immediately so coaches can intervene before a minor imbalance becomes a serious injury. I designed it so that within seconds of opening it, a coach knows exactly who needs attention and why.

The athlete app is a unified hub for all wearable data. Athletes can connect their Garmin, Apple Watch, Oura Ring, or any other device, and I built the integration layer to be modular so new wearables can be onboarded quickly without reworking the existing system.

There are 2 main reasons we built the platform to pull in data from wearables outside of our own ecosystem.

The first is that most wearables only track biometrics like HR, HRV, breath rate, sometimes VO2 max, and steps. That data tells you how *ready* you are to perform, but it doesn't tell you how you're actually *performing*. I built algorithms that cross-reference this readiness data against the real performance output from our shorts. If an athlete's biometrics say they should be performing well but their actual output is consistently off baseline, we catch that deviation early. That gap between expected and actual performance is where injuries hide.

The second reason is that centralizing all of an athlete's health data into one platform gives coaches and athletes a complete picture instead of a fragmented one spread across a dozen apps. The core of injury prevention isn't just firing off an alert. It's being able to back that alert up with evidence from multiple data sources. Telling a coach "this athlete's muscle activation dropped 15% over the last week, their HRV is trending down, and their sleep has been inconsistent" is a far stronger case to reduce training load than a single data point from our shorts alone.

This unified data layer also opened the door for insights like "when you get 8 hours of sleep your jumps are on average 2 inches higher," which helps athletes actually see the connection between recovery habits and on-field performance.

## Design

Something that is really important to me in the work that I do at NoLimit is owning the full design of the app, the website, and the coaching dashboard. First impressions are everything, and an athlete or coach's first impression isn't going to be your tech or algorithms. It's going to be how the product feels and looks.

I designed the coaching dashboard so a coach can open it and know within 3 seconds if something is wrong with any athlete on their roster. And I built the athlete app so that someone can open it and immediately understand their body without digging through menus or navigating a maze of screens.

So many sports tech apps are bloated, over-complicated, or bury critical information behind layers of UI. The wearable space is already scattered enough. Every extra tap between an athlete and their data is another reason they stop checking it. I took that seriously and kept the interface clean, fast, and obvious.

I'm really excited for the future of NoLimit and sports tech as a whole. Wearable technology is only going to continue to improve, and with it our understanding of our own bodies. Getting to build the software layer that makes all of this actionable for real athletes and coaches at the highest level is something I don't take for granted.