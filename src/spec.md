# Specification

## Summary
**Goal:** Update the Valentine letter UI to feel like a warm, heartfelt handwritten love letter, and clarify/support a ~31-second user-provided video upload with natural (non-looping) playback and sound.

**Planned changes:**
- Revamp the visual design across front page, envelope/opening view, message card, buttons, and video view to a consistent love-letter aesthetic (warm soft palette, romantic handwriting-style typography, paper/parchment look, subtle hearts/floral accents).
- Add and reference static generated image assets (parchment texture + small accent illustrations) from `frontend/public/assets/generated`, integrating them in a responsive, non-distracting way that preserves legibility and does not obstruct controls.
- Adjust the message view’s video upload area to include helper text indicating a short (~31s) video will play when “Yes” is clicked, and ensure playback is not forced-muted and does not loop (ends naturally with replay via controls).
- Keep a clear empty state when no video is selected, with a straightforward way to go back and choose a video.

**User-visible outcome:** The app looks like a cozy handwritten love letter throughout, with tasteful paper texture and subtle romantic accents, and users can select a short (~31s) video that plays with sound (when allowed) and stops at the end without looping.
