---
name: write-like-me
description: Draft or rewrite any email, message, post or document in my personal voice. Use whenever writing something that will go out under my name, or when I ask to "reply", "draft", "write back" or "make this sound like me".
---

# Write like me

## If `voice.md` doesn't exist yet: build it first
1. Use the Gmail connector to search `in:sent newer_than:12m`. Collect about 200 messages that I wrote. Skip forwards, one-line acknowledgements and calendar replies.
2. Group them by audience: **colleagues**, **external/clients/funders**, **friends & family**. Note the recipient domains that mark each group.
3. For each group, pull out:
   - greetings and sign-offs, with how often each is used
   - typical length, sentence length, and when I use paragraphs vs bullets
   - how direct I am, how I hedge, how I ask for things, how I say no
   - phrases and words I use a lot, plus words I never use
   - punctuation habits (dashes, exclamation marks, emoji) and British vs American spelling
4. Write `00-context/voice.md` with **8–12 rules per audience** and **3 short anonymised example emails per audience**.
5. Show me 3 test drafts, one per audience, and apply my corrections to `voice.md`.

## Drafting
1. Read `00-context/voice.md`, plus `people.md` for the recipient.
2. Work out the audience group and the one thing the message must achieve.
3. Draft. Then check it:
   - [ ] greeting and sign-off match the audience
   - [ ] no words from the "never" list
   - [ ] length is within the audience's normal range
   - [ ] the ask or next step is explicit
4. Save it as a Gmail draft (never send), or return the text if asked.
5. If I edit the draft heavily, compare the two versions and propose a one-line update to `voice.md`.
