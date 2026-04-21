# Memory

- HEIF photos in `fotos` are not browser-safe by default. Convert them to `.jpg` before wiring them into `index.html`.
- Keep image references pointed at renderable formats only. Do not leave raw `.heif` paths in the page.
- Do not use self-resetting countdown intervals for one-time intro gates. Use a finite timeout sequence or a clearable timer chain.
- Keep intro gates compact. Avoid giant center numerals or oversized closing text; use a small cinematic leader with motion instead.
- Do not use italic countdown numerals inside circular frames when exact centering matters. Use a full-size centering box and stable numeric rendering.
- Tune intro gate scale separately for mobile. Desktop ring/countdown proportions become too heavy on small screens.
- Nickname sections should use a 2-column grid with the final card spanning full width when there is a fifth item.
- When nickname count changes, update the section credit count so the label matches the actual grid.
- For the `close` section, use a fixed 4-column desktop grid for 8 items so rows stay aligned; avoid `auto-fit` there.
- When new files land in `fotos`, convert HEIF to JPG first, then add the new images to both the spotlight and reel sources.
- The `close` section subtitle should be relationship copy, not film-language copy. Keep it aligned with the 8 detail tags.
- The hero `presents` line should stay generic when the user asks to remove the name; do not re-add a person name unless explicitly requested.
- The site is a subpage under `/amanda/`; keep internal relative URLs resolving against that base.
