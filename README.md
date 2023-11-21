# VirtualQueue

VirtualQueue is a web application that manages multiple virtual lines of people, specifically tailored for NC State's Engineering Career Fair. This application aims to address the challenge of long lines at career fairs by redirecting linegoers to lower-traffic companies while they wait in the virtual line.

This particular solution is volunteer-operated. For each high-traffic employer, a career fair volunteer will be stationed to stand near the employer. At this spot, they can easily enter new linegoers into the system and let them visit other companies while they wait in the virtual ,line. When the employer is ready to talk to more people, the volunteer can tap to pull people out of the virtual line into the real line. The system sends an automated text message to the linegoers telling them to come to the employer.

Volunteers can verify that returning linegoers have already spent time waiting (i.e. they are not new, pretending to be waiting) by requiring them to show the text message they received.

This system relies on SMS to communicate. The Twilio SMS API (and other similar services) costs ~$0.01 per domestic text message, and ~$0.07 per international message, at time of writing. We expect at least 50% of text messages to be international. Based on previous attendance, we estimate that this system could easily cost $500+ per day (2 in the fall, 1 in the spring).

Existing services such as Waitwhile would cost around $500 for a monthly subscription at our level of usage, trading usage cost for a $1000/year equivalent subscription.

A third option is a custom application, which we could send push notifications through for free. Listing the apps publicly would cost $100/yr to list on the App Store, and $25 one-time to list on the Google Play Store. Additionally, the bureaucratic challenges of conforming to university branding guidelines & regulations, and the unpreferable idea of making attendees download another app, make this option not very attractive.

[View a demo of VirtualQueue.](https://chipthrasher.com/virtualqueue/)

Todo:
- Integration with Twilio SMS API
- Server-run web application supporting HTTP requests, so you can read/write from files
- Phone number validation