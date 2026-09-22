# jhyukstin.github.io

Jaehyuk Choi's game development portfolio — [jhyukstin.github.io](https://jhyukstin.github.io)

A static site. All the content lives in plain text files under `content/`; a small
Node script turns those into the HTML pages that GitHub Pages serves. There is no
framework and there are **no dependencies to install**.

---

## How to Update My Portfolio

Everything below follows the same two steps:

1. Edit a file in `content/`
2. Run `npm run build`

Then commit and push. That's it — you never have to touch HTML.

### 1. Change my name or biography

Open **`content/profile.mjs`**.

```js
name: 'Jaehyuk Choi',
intro: 'I create immersive worlds and interactive experiences across PC, mobile, and XR — ...',
about: [
  'I’m Jaehyuk Choi, a USC Game Development student ...',
],
```

- `intro` — the paragraph on the homepage hero and the About page.
- `about` — the Background section on the About page. Each string is one paragraph.
- `interests`, `skills`, `experience` — the lists further down the About page.

### 1b. Change my profile photograph

Save your portrait as **`assets/images/profile.jpg`** (square, roughly 800×800) and
run `npm run build`. It appears automatically in the circular frame in the
About Me block.

Until that file exists the build falls back to your avatar
(`assets/images/logo.png`) and prints a reminder. To use a different filename or
a PNG, change the path in `content/profile.mjs`:

```js
photo: {
  src: 'assets/images/profile.jpg',
  fallback: 'assets/images/logo.png',
  alt: 'Portrait of Jaehyuk Choi',
},
```

### 1c. Edit the About Me paragraph

The paragraph next to your photograph is `bio` in **`content/profile.mjs`**:

```js
bio: 'I’m Jaehyuk Choi, a USC Game Development student ...',
```

Aim for 3–5 lines. This is separate from `intro` (the homepage hero) and `about`
(the About page), so you can word each one differently.

### 1d. Update my education

In **`content/profile.mjs`**:

```js
education: [
  {
    school: 'University of Southern California',
    division: 'School of Cinematic Arts',
    degree: 'BFA, Interactive Media & Game Design',
    // period: '2022 – 2026',   // optional
  },
],
```

Add another `{ ... }` entry for a second school. Uncomment `period` to show dates.

### 1e. Add or remove an award

Also in **`content/profile.mjs`**:

```js
awards: [
  {
    name: 'GDWC',
    distinction: 'Finalist',        // Winner / Finalist / Runner Up / Nominee
    category: 'Best Student Game',
    year: '2025',                   // omit if you don't want a year shown
    project: 'Overdawn',
    projectSlug: 'overdawn',        // links the award to that project page
  },
],
```

Delete an entry to remove it. Both Education and Awards appear on the homepage
and the About page, and each half disappears on its own if you empty it.

### 1f. The cinematic homepage hero

The full-screen opening sequence is built from `content/profile.mjs`:

```js
name: 'Jaehyuk Choi',            // the oversized name (splits onto two lines)
title: 'Gameplay & Level Designer',
heroLine: 'I create immersive worlds ...',       // the one sentence below it
heroMarquee: ['Gameplay Design', 'Level Design', 'Interactive Experiences'],
heroBackdrop: { src: 'assets/images/Vessel-cover-project.jpg', alt: '' },
```

- `heroBackdrop` is the faint artwork behind the type. Point it at any image in
  `assets/images/` — keep it small, it loads first — or set it to `null` for a
  typography-only hero.
- **Animation speed:** one value controls the whole sequence. In
  `assets/css/site.css`, find `.cine { --cine-beat: 0.9s; }` — lower it for a
  snappier intro, raise it for a slower one. Phones use `0.62s`, set in the
  `max-width: 640px` block.
- **Colors:** the hero now inherits the site-wide palette (see below), so there
  is nothing hero-specific to change.
- The motion itself lives in `assets/js/hero.js` (parallax and scroll hand-off
  only — the entrance is pure CSS and runs without JavaScript).

### 1g. Publications, interests and the contact headline

All three live in **`content/profile.mjs`**:

```js
personalInterests: ['Running', 'Watching sports', '...'],   // hobbies, one line
contactHeadline: ['Have something in mind?', 'Let’s talk.'], // one string per line

publications: [
  {
    year: '2026',
    title: 'Paper title',
    authors: 'Choi, J., & Choi, Y.',
    venue: 'Journal or conference',
    details: 'Volume, pages',     // optional
    doi: 'https://doi.org/...',   // optional — omit and no link is shown
  },
],
```

Publications group themselves by `year`, newest first, and order within a year
follows the array. Leave `doi` out for a paper without a verified link: the
citation still renders, just without a button. `personalInterests` is separate
from the professional `interests` list above it.

### 2. Change my professional title

Still in **`content/profile.mjs`**:

```js
title: 'Gameplay & Level Designer',          // appears in the header, hero and browser tab
disciplines: ['Gameplay Design', 'Level Design', 'XR Development', 'HCI Research'],
```

### 3. Add a new project

1. Copy **`content/projects/_TEMPLATE.mjs`** to a new file, e.g.
   `content/projects/my-game.mjs`. (Files starting with `_` are ignored by the build,
   so the template itself never shows up on the site.)
2. Fill in at least `slug`, `title`, `summary`, `roles` and `thumbnail`.
3. Put your images in `assets/images/`.
4. Run `npm run build`.

The build automatically creates `projects/my-game.html`, adds the project to the
homepage and the Work page, generates its metadata table, and wires up the
previous/next links. **You never create a page by hand.**

Every field is optional except `slug` and `title` — sections you leave out simply
aren't rendered, so there are no empty headings.

### 4. Edit an existing project

Open its file in `content/projects/`:

| Project | File |
|---|---|
| Overdawn | `content/projects/overdawn.mjs` |
| 100 Day Siege | `content/projects/100-day-siege.mjs` |
| The 7th Patient | `content/projects/7th-patient.mjs` |
| Move Move Melon! | `content/projects/move-move-melon.mjs` |
| Vessel | `content/projects/vessel.mjs` |
| DuoQ | `content/projects/duoq.mjs` |
| Aria | `content/projects/aria.mjs` |
| Soft Things Hit Hard | `content/projects/soft-things-hit-hard.mjs` |
| Tiphereth *(archived)* | `content/projects/tiphereth.mjs` |
| Overwatch — Magnus *(hidden)* | `content/projects/overwatch-hero-design.mjs` |

Inside any project file: `title`, `subtitle` and `overview` are the description;
`roles` and `org` are what shows on the card; `sections` are your contributions;
`trailer` is the video; `order` sets listing position; `featured`, `hidden` and
`archived` control visibility. Awards live in `content/profile.mjs`.

The "My contributions" blocks are the `sections` array. Each entry becomes one
numbered block on the page:

```js
sections: [
  {
    title: 'Level Design',
    subtitle: 'Day 1–5 Levels',          // optional
    body: ['An optional paragraph.'],    // optional
    items: [                             // the bullet points
      'Designed and implemented 25 levels ...',
    ],
    media: [ /* images, see below */ ],  // optional
    links: [{ label: 'Design Doc', href: 'https://...' }],  // optional
  },
],
```

### 5. Add screenshots

Put the file in `assets/images/`, then reference it from the project file:

```js
media: [
  {
    src: 'assets/images/my-game-levels.png',
    alt: 'Blockout of the second level',   // required — describes the image
    caption: 'First blockout pass.',       // optional
  },
],
```

One image fills the column; two or more become a responsive grid. Image sizes are
read automatically at build time, so nothing jumps around while the page loads.

**Project cards** are horizontal: artwork on the left, text on the right. The card
shows the project's `hero` image (falling back to `thumbnail`) inside a landscape
16:9 frame, and it is never cropped — artwork that isn't 16:9 simply gets a little
background on its short sides.

To use a different image on the card only:

```js
cardImage: { src: 'assets/images/my-game-card.png', alt: '...' },
```

Add `fit: 'cover'` to that image if you would rather it fill the frame edge to edge.

### 6. Add gameplay videos

**No project is required to have a video.** A project without one shows its hero
image instead — never an empty player or a "coming soon" box.

#### Add a YouTube trailer

Add a `trailer` block to the project file. Any normal YouTube link works
(`watch?v=`, `youtu.be/`, `/embed/`):

```js
trailer: {
  type: 'youtube',
  src: 'https://www.youtube.com/watch?v=E7KgVHyf0ak',
  title: 'Overdawn — official trailer',
},
```

The trailer replaces the hero image at the top of the project page. Your own
cover art is used as the thumbnail and the YouTube player is only downloaded when
a visitor presses play — nothing loads from YouTube before that.

#### Add a local MP4

Put the file in `assets/video/` and point at it:

```js
trailer: {
  type: 'mp4',
  src: 'assets/video/my-game.mp4',
  title: 'Gameplay trailer',
},
```

It gets normal video controls and never autoplays.

#### Change the thumbnail

```js
trailer: { type: 'youtube', src: '...', poster: 'assets/images/my-poster.png' },
```

Leave `poster` out and the project's hero image is used.

#### Remove a video

Delete the whole `trailer: { ... }` block and rebuild. The project falls back to
its hero image — nothing else needs changing.

#### Clips inside a design section

Any section's `media` list takes videos as well as images, so a clip can sit right
next to the design decision it demonstrates:

```js
media: [
  { youtube: 'https://www.youtube.com/watch?v=ID', caption: 'Level walkthrough' },
  { video: 'assets/video/grapple.mp4', poster: 'assets/images/grapple.png', caption: 'Final tuning' },
],
```

### 6b. Case-study pieces: loop diagrams, sub-sections and design reasoning

Three optional extras any section can carry. They are drawn entirely in CSS —
there is no diagram image to keep in sync with the writing — and a section that
leaves them out renders exactly as before. THANG! uses all three; see
`content/projects/thang.mjs`.

**A gameplay-loop diagram.** A numbered chain of stages that closes back on
itself. It runs across the page on a wide screen and stacks on a phone.

```js
{
  title: 'Core Gameplay Loop',
  diagram: {
    steps: [
      { title: 'Freeze', body: 'What happens at this stage.' },
      { title: 'Carry',  body: '…' },
    ],
    loopLabel: 'Text for the bar that closes the loop back to stage one.',
    note: 'A paragraph under the diagram explaining the design intention.',
  },
}
```

**Lettered sub-sections.** For a section covering two or three related systems
without splitting them into separate blocks. Each part takes `body`, `items`
and `note`. Two or more parts are lettered A, B, C; a single part is not.

```js
parts: [
  { title: 'Freeze & Thaw',   body: ['…'], items: ['…'], note: 'Still in tuning.' },
  { title: 'Oven & Scoring',  body: ['…'] },
],
```

**Design-reasoning frames.** One small card per decision, each with the same
labelled rows. The labels come from the content file, so any repeated structure
works — "objective → decision → intended behaviour" is just one use.

```js
frames: [
  {
    title: 'Constant encounters',
    rows: [
      { label: 'Design objective', text: '…' },
      { label: 'Design decision', text: '…' },
      { label: 'Intended player behaviour', text: '…' },
    ],
  },
],
```

Two more section keys go with these:

```js
mediaFirst: true,   // lead the block with its images and put the text under them
footnote: '…',      // a caveat printed after the diagram, parts and frames
                    // (`note` stays with the paragraphs at the top instead)
```

### 6c. A block above the main write-up

`showcase` takes the same shape as `sections` but renders straight after the
overview, with no index numbers and no "My contributions" heading over it —
for a prototype video or a short statement that belongs high on the page.

```js
showcase: [
  {
    title: 'Prototype Gameplay',
    body: ['Footage from the current build. Nothing here is final.'],
    media: [{ youtube: 'https://youtu.be/ID', caption: 'Prototype footage.' }],
    links: [{ label: 'Watch on YouTube', href: 'https://youtu.be/ID' }],
  },
],
```

You can also rename the heading over the main `sections` list, which defaults
to "My contributions":

```js
sectionsTitle: 'Design case study',
sectionsNote: 'Creative Director & Lead Designer',
```

### 7. Reorder projects

Change the `order` number in each project file. Lower numbers come first.

```js
order: 1,   // this one appears first
```

Decimals work, so a project can be slotted between two others without
renumbering anything else — THANG! uses `order: 1.5` to sit directly after
Overdawn (`order: 1`).

### 8. Mark a project as featured

Featured projects get the large layout at the top of the homepage:

```js
featured: true,
```

Set it to `false` and the project moves down into the More Projects card list.
Nothing else needs changing.

### 7b. Add an award or achievement to a project

In the project's file, add a `highlights` entry:

```js
highlights: [
  { text: 'GDWC 2025 — Best Student Game Finalist', category: 'Award' },
  { text: '4.4/5 Stars on the Meta Store', category: 'Rating', url: 'https://...' },
],
```

The same list appears in two places from this one definition: a compact
"Project highlights" block on the project card, and the Results section on the
project page. On a card they lay out in two columns when the text column is
wide enough for two and one column when it is not; a project with a single
highlight gets a single row; leaving the field out renders neither area.

**Write the real number.** Figures of a thousand or more are abbreviated for
display, so `'2,000+ Units Sold'` shows as **2k+ Units Sold** and
`'1,500+ Steam Wishlists'` shows as **1.5k+ Steam Wishlists**. Your file keeps
the full figure. Only numbers written with a comma are shortened, so years
(2025), ratings (4.4 / 5) and anything under a thousand are left exactly as you
typed them, and a "+" is never added to a number that did not have one.

`category` is optional (Award, Recognition, Milestone, Rating, Collaboration)
and shows on the project page only. `url` is optional and opens in a new tab
on the project page; on a card the whole card is already a link, so the
highlight is shown as plain text there.
Reorder the array to reorder the highlights.

### 8b. Hide or archive a project

Two levels of visibility, both reversible, and neither deletes anything:

```js
hidden: true,     // out of the listings, but the project page still works
archived: true,   // off the site completely — no page is generated at all
```

`hidden` takes the project off the homepage, the Work page and the sitemap while
its detail page keeps working for anyone with the direct link.

`archived` removes it from the site entirely. The content file, its text and all
its images stay in the repository, so setting `archived: false` and rebuilding
brings the whole project back.

Currently hidden: `content/projects/overwatch-hero-design.mjs`
Currently archived: `content/projects/tiphereth.mjs`

### 8c. A project with no artwork or video yet

Leave `thumbnail`, `hero` and `trailer` out entirely. The card switches to a
text-only layout with an accent rule, and the project page shows its title,
metadata and overview with no empty media box. Add a `badge` to label the state:

```js
badge: 'In development',
```

`content/projects/soft-things-hit-hard.mjs` is set up this way.

### 9. Update contact links

In **`content/profile.mjs`**:

```js
email: 'jaehyuk@usc.edu',
social: [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
  { label: 'GitHub', href: 'https://github.com/jhyukstin' },
],
```

Delete a line to remove that link — only links that exist are shown.

### 10. Update my resume

Save the PDF as **`assets/resume/Jaehyuk-Choi-Resume.pdf`** and run `npm run build`.

The résumé button then appears automatically in the header, the homepage hero, the
About page and the contact block. While the file is missing, those buttons are left
out and the build prints a reminder. To use a different filename, change the
`resume:` line in `content/profile.mjs`.

### 11. Run the website locally

```bash
npm run dev
```

Then open <http://localhost:4321>. Re-run the command after editing content.

(You can also just double-click `index.html` — every path is relative, so it works
straight from the filesystem.)

### 12. Build the website

```bash
npm run build
```

This regenerates `index.html`, `projects.html`, `about.html`, `404.html`, every page
in `projects/`, plus `sitemap.xml` and `robots.txt`.

The build also prints warnings — missing images, missing alt text, images over
1.5 MB, a missing résumé. Warnings never stop the build.

### 13. Deploy to GitHub Pages

This repository **is** the website (`jhyukstin.github.io`, served from `main`). There
is no deploy pipeline — pushing publishes.

```bash
npm run build
git add -A
git commit -m "Update portfolio"
git push
```

The site updates within a minute or so. Always run `npm run build` before committing,
otherwise the published HTML won't match your content files.

---

## Changing the colors

The whole site is one dark theme driven by six tokens at the top of
**`assets/css/site.css`**. Change a value there and every page follows — there
are no hardcoded colors anywhere else:

```css
:root {
  --color-background: #141416;   /* page background */
  --color-surface:    #202023;   /* cards, contact block */
  --color-text:       #f5f5f5;   /* headings and body */
  --color-text-muted: #a1a1aa;   /* descriptions, metadata */
  --color-accent:     #c43d4b;   /* CTAs, active nav, markers */
  --color-border:     #38383d;   /* dividers */
}
```

A few values are derived from those (a well behind images, a lighter border
for buttons, the accent hover, and the white ink used on accent buttons).
They sit directly underneath, each with a comment.

One of them is worth knowing about if you ever change the accent:
**`--color-accent-text`** is the accent used for *words*. A colour dark enough
to look right as a filled button is usually too dark to read as small type on
a dark page, so the crimson `--color-accent` carries the buttons, markers and
rules, and the brighter `--color-accent-text` carries anything written in the
accent — project numbers, "View project", the hero's role line. If you pick a
new accent, check both: the fill needs 3:1 against the background, and the
text version needs 4.5:1.

Older component names like `--paper`, `--ink` and `--line` still exist just
below, but they are only aliases pointing at the tokens above — so you never
need to touch them.

## Repository layout

```
content/                  ← EDIT THESE
  profile.mjs               name, bio, skills, experience, contact, resume
  projects/
    _TEMPLATE.mjs           copy this to add a project
    overdawn.mjs            one file per project
    ...

assets/
  css/site.css            ← the design system (colors, type, layout)
  images/                   all screenshots and key art
  resume/                   put your resume PDF here

build/                    ← the generator; you rarely need to touch it
  build.mjs                 reads content/, writes the HTML
  render.mjs                the page templates
  serve.mjs                 local preview server
  lib/                      helpers

index.html                ← GENERATED — do not edit by hand
projects.html             ← GENERATED
about.html                ← GENERATED
404.html                  ← GENERATED
projects/*.html           ← GENERATED
sitemap.xml, robots.txt   ← GENERATED
```

Anything marked GENERATED is overwritten every build. Edit `content/` instead.

## Notes

- `.nojekyll` is required: it stops GitHub Pages from running Jekyll, which would
  otherwise mishandle asset filenames that contain spaces.
- Old project URLs are preserved. `projects/Overwatch HDD.html` now redirects to
  `projects/overwatch-hero-design.html` — set up with the `aliases` field in a
  project file.
- The site ships almost no JavaScript: the only script is ~12 inline lines that
  swap a video thumbnail for the player on click, and it is added only to pages
  that actually have a YouTube video. Every other page ships none, and the video
  still works with JavaScript disabled (there is a `<noscript>` fallback).
