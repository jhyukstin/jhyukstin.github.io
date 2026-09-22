/**
 * PROJECT TEMPLATE — copy this file, rename it, fill it in, run `npm run build`.
 *
 * Files starting with "_" are ignored by the build, so this one never appears
 * on the site. Every field except `slug` and `title` is optional: sections you
 * leave out simply aren't rendered — no empty headings.
 */

export default {
  // REQUIRED. Becomes the page URL: projects/my-game.html
  slug: 'my-game',

  // Sort position on the homepage and Work page (lower numbers come first).
  order: 99,

  // true = shown large at the top of the homepage. false = shown in the grid.
  featured: false,

  // 'games' or 'design-work' (Design Work is the second group on the Work page).
  group: 'games',

  // Old URLs that should redirect here, e.g. ['projects/OldName.html'].
  aliases: [],

  // Set to false for a project with no detail page (e.g. under NDA).
  // The card is still listed, just not clickable.
  hasPage: true,

  // Set to true to take the project out of the homepage and the Work page
  // while keeping its content, images and detail page in the repository.
  hidden: false,

  // ------------------------------------------------------------------ header
  title: 'My Game',
  subtitle: 'One sentence describing the game, shown under the title.',

  // Short line used on project cards. Keep it to one line.
  summary: 'A short description for the project card.',

  // Your roles. The first one is shown on the card.
  roles: ['Level Designer'],

  // Extra tags shown on the card (optional).
  tags: [],

  // A small label shown on the card, e.g. 'Under NDA' or 'In development'.
  badge: null,

  // Every field here is optional — only the ones you fill in are displayed.
  meta: {
    studio: 'Studio or course',
    engine: 'Unity',
    platform: 'PC (Steam)',
    genre: 'Action',
    team: '12 people',
    period: 'Jan 2025 – Present',
  },

  // ------------------------------------------------------------------- media
  // Portrait key art. Used as the social preview image and as the fallback
  // for the project card when there is no `hero`.
  thumbnail: { src: 'assets/images/my-game-cover.png', alt: 'My Game key art' },

  // Big banner at the top of the project page. Falls back to the thumbnail.
  // This is also what the project card shows, so landscape art works best.
  hero: { src: 'assets/images/my-game-hero.png', alt: 'My Game cover art' },

  // Optional: a different image just for the project card. Cards show artwork
  // on a landscape 16:9 plate (4:3 for portrait art) and fit it inside without
  // cropping, so a non-16:9 image just gets a little background on its short
  // sides. Add `fit: 'cover'` — on `cardImage`, `hero` or `thumbnail` — when
  // the artwork should fill the plate instead and nothing important sits
  // against its edges.
  // cardImage: { src: 'assets/images/my-game-card.png', alt: 'My Game' },

  /**
   * OPTIONAL TRAILER — shown at the top of the project page instead of the
   * hero image. Leave this out entirely if the project has no video: the hero
   * image is used and no empty player is ever rendered.
   *
   * YouTube (any normal link works — watch?v=, youtu.be/, /embed/):
   *   trailer: { type: 'youtube', src: 'https://www.youtube.com/watch?v=ID', title: 'Gameplay trailer' },
   *
   * Local file (put the .mp4 in assets/video/):
   *   trailer: { type: 'mp4', src: 'assets/video/my-game.mp4', title: 'Gameplay trailer' },
   *
   * `poster` is optional — the hero image is used as the thumbnail by default:
   *   poster: 'assets/images/my-game-poster.png',
   */
  // trailer: { type: 'youtube', src: 'https://www.youtube.com/watch?v=...', title: 'Gameplay trailer' },

  // ---------------------------------------------------------------- overview
  // One string per paragraph.
  overview: [
    'What the game is, in the words you would use to pitch it.',
  ],

  // ----------------------------------------------------------- contributions
  // One section per area of work you owned. Any combination of the keys below.
  sections: [
    {
      title: 'Level Design',
      subtitle: 'Optional smaller heading',
      body: ['An optional paragraph of context before the bullets.'],
      items: [
        'A specific thing you designed, built or shipped.',
        'Another one.',
      ],
      // Media is optional. An entry can be an image, a short clip, or a
      // YouTube video — mix them freely, and omit `media` entirely to show
      // just the text.
      media: [
        {
          src: 'assets/images/my-game-levels.png',
          alt: 'Describe the image for screen readers and when it fails to load',
          caption: 'Optional caption shown under the image.',
          size: 'wide', // 'wide' (full column) | 'half' | 'third' — omit for auto
        },
        // { video: 'assets/video/mechanic.mp4', poster: 'assets/images/mechanic.png', caption: 'The grapple, final tuning' },
        // { youtube: 'https://www.youtube.com/watch?v=ID', caption: 'Level walkthrough' },
      ],
      links: [{ label: 'Design Doc', href: 'https://...' }],
      note: 'Optional italic note, e.g. "Work in progress".',
    },
  ],

  // ---------------------------------------------------------- design process
  // Optional. Same shape as `sections` above, rendered under a "Design process"
  // heading: goals, iteration, playtesting, decisions. Omit it if you have none.
  // process: [
  //   { title: 'Playtesting', items: ['What changed after each round.'] },
  // ],

  // ----------------------------------------------------------------- gallery
  // A standalone image grid, rendered after the sections.
  gallery: {
    title: 'Gallery',
    items: [{ src: 'assets/images/shot-1.png', alt: 'Describe the screenshot' }],
  },

  // -------------------------------------------------------------- highlights
  /**
   * Awards, ratings and milestones. Facts only — no invented statistics.
   *
   * These appear twice from this one list: as a compact "Project highlights"
   * block on the project card, and as the Results section on the project page.
   * Three or more highlights lay out in two columns on the card; one renders as
   * a single row. Omit the field entirely and neither area is rendered.
   *
   *   text     — what is displayed (required). Write the real figure:
   *              "2,000+ Units Sold" is shown as "2k+ Units Sold". Years,
   *              ratings and numbers under a thousand are left alone.
   *   category — Award | Recognition | Milestone | Rating | Collaboration
   *              (optional; shown on the project page only)
   *   url      — optional link, opens in a new tab
   */
  highlights: [
    // { text: 'GDWC 2025 — Best Student Game Finalist', category: 'Award' },
    // { text: '4.4/5 Stars on the Meta Store', category: 'Rating', url: 'https://...' },
  ],

  // `outcomes` is the older plain-string version of the above. Still supported
  // for the Results section, but prefer `highlights`.
  // outcomes: [],

  // ----------------------------------------------------------------- credits
  // credits: { text: 'Made with a team of 20 at ...', items: ['Name — Role'] },

  // ------------------------------------------------------------------- links
  // Buttons at the top and bottom of the project page. `primary: true` styles
  // one of them as the filled button.
  links: [
    { label: 'Steam', href: 'https://...', primary: true },
    { label: 'Trailer', href: 'https://...' },
  ],
};
