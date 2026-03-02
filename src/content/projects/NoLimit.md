---
title: "NoLimit"
description: "Building sports tech for injury prevention at the intersection of wearables and performance data"
date: 2026-03-03
draft: false
---

Now that the Olympics are wrapped up I wanted to take some time to write about my experience at NoLimit and the incredible things that we are working on. (you can also read more about my experience at the olympics here)

For quick context, NoLimit is a sports tech startup that created shorts that have EMG sensors and IMUs to detect muscle activation + track height and speed. They acquired my app PeakFit and brought me on as a founding engineer in August of 2025 to have me create their software and algorithms for injury detection.

My 2 primary tasks thus far have been creating

1. a coaching dashboard and
2. an app for athletes to use.

The coaching dashboard was just a general page that coaches could go to and see information at a glance about their athletes. It was an easy-to-view database that would quickly warn them if anything went wrong.

The app was created to be a gathering point of any wearable device. You could connect your Garmin, Apple Watch, Oura Ring, or any other wearable and it was built in a way that it would allow new wearables to be quickly added to it at any time.

There are 2 main reasons we encouraged our athletes to use wearables outside of our ecosystem. The first is that the vast majority of devices primarily track your biometrics like HR, HRV, breath rate, sometimes VO2 max, and steps. These are all great but they don't actually reflect how you are performing, they just tell you how ready you are to perform. So what we did is we would take this data and then match it against our shorts to see if they were performing as well as their wearable data says they should be. And if they are consistently deviating from their baselines then we know something is up.

The 2nd reason we encouraged athletes to connect other wearables is that it allowed a much better view for coaches and athletes to visualize all of their health at once, rather than through a bunch of scattered apps. We believe the core of injury prevention is not just alerting the coach/athlete, but being able to explain and reference the reason for that alert. Having access to multiple supporting sources of data makes a much more compelling argument to lower your training than just 1 data point from our own shorts.

This also allowed for us to do cool correlations like "when you get 8 hours of sleep your jumps are on average 2 inches higher!" which can be really helpful for athletes to actually visualize how being healthy / taking care of their own body helps them perform better.

## Design

Something that is really important to me in the work that I do here at NoLimit is the design of not just the app but also the website and coaching dashboard. First impressions are everything, and an athlete or coach's first impression isn't going to be your tech or algorithms. It's going to be how the app feels and looks.

I wanted coaches to open the app and know within 3 seconds if something was up with an athlete, and I wanted an athlete to open the app and immediately understand everything about their body.

So many sports tech apps are extremely complicated or hide important information behind dozens of menu options or different buttons. The wearable space is already scattered enough, and the more friction you put in between an athlete/coach and their data, the less they are going to actively seek to check it.

I'm really excited for the future of NoLimit and sports tech as a whole. Wearable technology is only going to continue to improve, and with it our understanding of our own bodies. Being able to contribute to that is something that I am extremely grateful for.