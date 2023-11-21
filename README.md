# VirtualQueue

VirtualQueue is a web application that manages multiple virtual queues of people, specifically tailored for NC State's Engineering Career Fair. This application aims to address the challenge of long lines at career fairs by redirecting linegoers to lower-traffic companies while they wait in the virtual line.

Career fair volunteers operate the system by standing near a high-traffic employer. At this spot, they can easily enter new linegoers into the system and tap to pull people out of the line when the employer is ready to talk to more people. The system sends an automated text message to the linegoers telling them to come to the employer.

[View a demo of VirtualQueue.](https://chipthrasher.com/virtualqueue/)

Todo:
- A way to verify that people coming back have already waited in line
- Integration with Twilio SMS API
- Server-run web application supporting HTTP requests, so you can read/write from files
- Phone number verification