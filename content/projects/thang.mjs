/**
 * THANG! — game design case study.
 *
 * Everything on projects/thang.html comes from this file. To update the page,
 * edit the field below and run `npm run build`.
 *
 *   release date / status ....... meta.release, meta.status, badge
 *   one-line description ........ subtitle (shown in the hero), summary (cards)
 *   roles ....................... roles
 *   prototype video ............. showcase[0].media
 *   screenshots ................. sections[] › media
 *   gameplay loop diagram ....... sections[] › diagram
 *
 * The page is deliberately short: hero, video, four numbered blocks. Keep each
 * block to two or three sentences and let the artwork carry the rest.
 *
 * Accuracy note: THANG! is in development. Rules below come from the project's
 * Game Design Document (v1.4). No playtest results, awards or milestones are
 * claimed anywhere on this page.
 */

export default {
  slug: 'thang',

  // Sits immediately after Overdawn (order 1) without renumbering anything else.
  order: 1.5,
  featured: true,
  group: 'games',

  title: 'THANG!',

  // The hero's one-sentence description.
  subtitle:
    'Freeze your friends solid, carry them to the oven, and bake them into popsicle weapons — a chaotic free-for-all party shooter set in a frozen town at the edge of the world.',

  summary:
    'Free-for-all party shooter — freeze your friends, carry them to the oven, and bake them into weapons.',

  // Short label shown on the project card.
  org: 'Overdawn Studio',
  tags: ['Unreal Engine 5'],
  roles: ['Creative Director & Lead Designer'],

  badge: 'In development',

  meta: {
    studio: 'Overdawn Studio',
    engine: 'Unreal Engine 5',
    platform: 'PC (Windows & Mac)',
    genre: 'Free-for-all party shooter',
    release: 'March 2027 (planned)',
    status: 'In development',
  },

  // The official poster: project thumbnail, social preview and page hero.
  thumbnail: {
    src: 'assets/images/thang-poster.jpg',
    alt:
      'THANG! poster — a polar bear in a red coat carrying a frozen cub across an icy town while blue freeze rays streak past a smoking central oven',
  },
  hero: {
    src: 'assets/images/thang-poster.jpg',
    alt:
      'THANG! poster — a polar bear in a red coat carrying a frozen cub across an icy town while blue freeze rays streak past a smoking central oven',
  },

  /**
   * The prototype video is a page section rather than a `trailer`, so the
   * poster stays as the hero image and the footage can be labelled as
   * work in progress. See `showcase` below.
   */

  // The hero subtitle is the description, so there is no separate Overview.

  // ------------------------------------------------- prototype video (top)
  showcase: [
    {
      title: 'Prototype Gameplay',
      media: [
        {
          youtube: 'https://youtu.be/xAIOIIDHXV8',
          title: 'THANG! — prototype gameplay',
          caption: 'Prototype footage from the current Unreal Engine 5 build — work in progress, not final.',
        },
      ],
    },
  ],

  // ------------------------------------------------------------ case study
  sectionsTitle: 'Design breakdown',
  sectionsNote: 'Creative Director & Lead Designer',

  sections: [
    {
      title: 'My Contributions',
      body: [
        'I direct THANG! at Overdawn Studio, owning the creative vision and the design of its systems while the wider team builds it.',
      ],
      items: [
        'Creative direction — set the tone and the three pillars the team designs toward: a readable core loop, chaotic encounters, and short social matches.',
        'Gameplay systems — designed freezing, the oven, scoring and popsicle weapons as one connected model, so each system produces what the next one needs.',
        'Level design — designed the arena’s concentric layout, its scoring zones, cover and sightlines around a single central objective.',
        'Game Design Document — wrote and maintain the GDD (v1.4) the art, audio and engineering teams work from, and lead the calls on what ships first and what stays on the backlog.',
      ],
      note:
        'THANG! is made by a team at Overdawn Studio; this page covers the design direction I own, not its implementation.',
    },

    {
      title: 'Core Gameplay Loop',
      body: [
        'Combat doesn’t end in a kill — it ends in an object. A frozen opponent is the only thing that scores, so every won fight creates the next objective.',
      ],

      diagram: {
        steps: [
          { title: 'Freeze', body: 'Shoot an opponent until they lock up solid.' },
          { title: 'Carry', body: 'The frozen bear becomes an object anyone can pick up.' },
          { title: 'Bake', body: 'Dunk or throw them into the central oven to score.' },
          { title: 'Rearm', body: 'The bake pops out a popsicle — a stronger, temporary weapon.' },
        ],
        loopLabel: 'The weapon you win is what freezes the next bear.',
      },
    },

    {
      title: 'Gameplay Design',
      mediaFirst: true,
      media: [
        {
          src: 'assets/images/thang-combat.jpg',
          alt:
            'Two polar bears fighting on an icy arena in the THANG! prototype — one carrying an ice-blue weapon, the other mid-swing with a bright slash effect, health bars above both',
          caption: 'Combat prototype — weapon interactions and freezing mechanics.',
          size: 'wide',
        },
      ],
      body: [
        'The Freeze Bar replaces health with temperature: shoot a bear until it bottoms out and they freeze into a statue anyone can carry, instead of dying.',
        'One central oven is the only place to score, the only source of weapons and the only place to thaw, so scoring, healing and rearming all resolve at the same contested spot. Delivering a frozen bear bakes it into a popsicle — a temporary, limited-ammo power spike that has to be re-earned.',
      ],
      note: 'Scoring values, timings and weapon damage are GDD specification and still in tuning.',
    },

    {
      title: 'Level Design — The Frozen Arena',
      mediaFirst: true,
      media: [
        {
          src: 'assets/images/thang-arena.jpg',
          alt:
            'The THANG! winter arena prototype — an igloo and scattered rocks on snow, tall ice pillars breaking sightlines, and a dark central oven structure rising above the frozen pond',
          caption: 'Winter arena prototype — environmental cover, verticality, and central objective.',
          size: 'wide',
        },
      ],
      body: [
        'The arena is a frozen pond built in concentric rings around the oven: a tight, tree-lined dunk zone right on top of the objective, and an open ice field beyond it where long throws are worth more.',
        'Igloos and rocks break sightlines into blind corners, bridges add elevation and firing lines into the centre, and few safe hiding spots keep bears rotating through the middle. There are no painted lines — the cover and elevation are what decide where a long shot is possible.',
      ],
      footnote: 'A top-down layout map will be added to this section once the blockout is locked.',
    },
  ],

  // No awards, sales or milestones — the game has not been released.
  // Add them to `highlights` here if and when there is something real to list.

  links: [{ label: 'Prototype Gameplay', href: 'https://youtu.be/xAIOIIDHXV8', primary: true }],
};
