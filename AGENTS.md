# House of Prayer Church DMV — Project Rules

## Content
- Never invent Ge'ez / Tigrinya wording. Use only lines the user supplies, character-for-character; the approved set lives in `mem://reference/geez-wording`. Why: the user reviews and corrects Ge'ez themselves and has already corrected AI-drafted lines.
- Keep announcement content in sync in both `src/data/upcomingPrograms.ts` (popup) and `src/pages/Announcements.tsx` (page), and bump `POPUP_VERSION` when an event's details change so returning visitors see it once more. Why: the popup and the page are separate lists and drift otherwise.
- Bible lessons are dated `Sunday, [Month] [Day], [Year]` and listed newest first.

## Backend
- Refer to the backend as Lovable Cloud / database / auth / functions / storage in anything the user reads.

## Print & marketing artifacts
- A visual artifact gets a written design philosophy document first, then the artifact, then QA: convert every page to an image and inspect each one before delivery. Why: layout defects (clipped text, gaps, broken glyphs) only show up visually.
