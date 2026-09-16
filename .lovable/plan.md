# Video announcement popup

## What will change
- Replace each event’s written description in the homepage popup with its own short, realistic church video.
- Keep the event title, date, time, location, “New” label, and registration/details link visible.
- Show one event at a time with simple previous/next controls so videos remain large and readable on phones.
- Use muted inline playback by default, with standard video controls for sound, pause, and replay.
- Preserve the existing daily popup timing, close button, and automatic dismissal behavior.

## Technical details
- Add a video URL to every event in the shared announcement list.
- Import the generated CDN video pointers into the event data.
- Update the popup to pause inactive videos and load video metadata efficiently.
- Verify the popup on desktop and mobile, including event navigation and video loading.
