---
title: "Anki Audio Generator"
description: "Using Elevenlabs to generator audio versions of anki decks for language learning"
date: 2025-11-17
draft: false
---

# Learning a language is hard
Getting to hear native speakers is even harder. Most apps use text to speech which creates widely incorrect pronunciations for the vast majority of languages. Or don't offer any audio at all. It can be hard for learners to find and build anki decks that consist of audio because of the manual labor involved. (If you don't know what anki is its a spaced repeition flash card app that is very popular for med school students + language learners) 

I remember at a time I was downloading one file at a time from forvo and putting it into a deck often taking me 20-30 seconds just to create 1 card. 

So when I saw the new eleven labs model come out back in summer I immediately added it to my to do list to play around with it and create something. And while it did take me a long time to get around to it, I finally made this app that allows you to upload up an anki deck of up to 500 flashcards and get back a companion deck consisting of just the audio + the answers.

### You can see a video of it in action here

<div class="video-wrapper">
<iframe src="https://www.youtube.com/embed/On8gprRn6PE" allowfullscreen></iframe>
</div> 

# How it works
When you upload your deck you also mark your native language + practice language. It then separates your cards into those 2 categories. Anything in your practice language immediately gets flagged for processing. 

BUT before it gets processed it checks supabase to see if that word has already been procesed before, because if it has then it instead pulls from that, thus saving api costs. If the word isn't in the supabase then it gets sent to elevenlabs and the audio is sent back to the user and then supabase to be used for later. 

Obviously saving audio files isn't really necessary at such a small scale, but if you had say 1000 or 2000 monthly users, you would definitely get some overlap, and because elevenlabs is quite an expensive api you would see significant cost savings from capturing this overlap and returning from your own database rather than doing repeat processing. 

Pretty simple and me and quite a few of my friends found it useful. Unfortunately its not currently up as I am using polyglot.cafe for another project right now, and also i don't want to have an active subscription elevenlabs, but in the future when a better open source alternative comes out I will definitely put it or something similar back up.