export default {
  slug: 'aria',
  order: 8,
  featured: false,
  group: 'games',

  title: 'Aria',
  subtitle: 'An AR AI assistant for Meta Quest 3 that guides people through DIY projects in real time.',

  summary: 'AR AI assistant for Meta Quest 3, built with Aria Spark in collaboration with Meta.',

  // Short label shown on the project card.
  org: 'Aria Spark',
  roles: ['Gamification', 'UI & UX Design'],
  tags: ['AR', 'Firebase', 'Figma'],

  meta: {
    studio: 'Aria Spark, in collaboration with Meta',
    platform: 'Meta Quest 3',
    genre: 'AR AI assistant',
    period: 'May – August 2025',
  },

  // The Aria Spark company logo, used as the project card image. It is only
  // 300x168, so it is shown at its own size rather than stretched. Replace it
  // with Aria key art here if you get a higher-resolution image.
  thumbnail: {
    src: 'assets/images/aria-spark-logo.jpg',
    alt: 'Aria Spark logo',
  },

  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=Wg8d4cCvCgc',
    title: 'Aria — project video',
    // `poster: null` keeps the video's own thumbnail (real footage) instead of
    // falling back to the logo above.
    poster: null,
  },

  overview: [
    'Aria is an AR AI assistant for Meta Quest 3 that walks people through do-it-yourself projects while they work. Instead of stopping to check a tutorial, you keep your hands on the task and Aria follows along in the headset, responding as the project moves.',
    'I worked on Aria with Aria Spark, in collaboration with Meta, between May and August 2025.',
  ],

  sections: [
    {
      title: 'Interface design',
      subtitle: 'The after-project flow',
      body: [
        'Most of my interface work sits around the moment a project ends: Aria confirms what was finished, shows what the user saved by doing it themselves, and offers to publish it to the Social Board. I designed that flow end to end — the congratulation and savings cards, the camera HUD that captures a project thumbnail, the profile screen that totals a user’s savings and levels, and the friends list.',
      ],
      items: [
        'Designed the after-project flow, from the completion confirmation through the savings breakdown to sharing.',
        'Designed the camera HUD Aria uses to capture a project thumbnail, and scripted the exchange that walks the user through taking the shot.',
        'Designed the player profile screen, including project history, average time per project and the savings total.',
        'Redesigned and implemented improvements to the chat history interface.',
        'Designed the access request interface for the permissions Aria needs.',
        'Designed the AR safety warning panel shown when the headset needs to interrupt the user.',
      ],
      media: [
        {
          src: 'assets/images/Aria-after-project-flow.png',
          alt:
            'Aria after-project flow: completion and savings cards, a share prompt, the camera HUD for capturing a project thumbnail, the player profile screen and the friends list',
          caption: 'Aria after-project flow — completion, savings, capture, profile and friends.',
          size: 'wide',
        },
      ],
    },
    {
      title: 'Working with Meta',
      body: [
        'Aria was developed in collaboration with Meta, and progress was reviewed on a two-week cycle.',
      ],
      items: [
        'Took part in biweekly reviews with Meta and the studio’s venture-capital stakeholders, walking through build progress and agreeing what needed to be ready for the next milestone.',
        'Contributed to development of the Quest 3 AR assistant alongside the rest of the team.',
      ],
    },
    {
      title: 'Gamification & the Aria Social Board',
      subtitle: 'Turning finished DIY projects into something worth sharing',
      body: [
        'The Social Board is the part of Aria where a finished project becomes visible to other people. Users post the projects they have completed, show a profile of their work, invite friends, and level up as they collaborate. I designed the flow in Figma and built the experience in Firebase Studio.',
      ],
      items: [
        'Designed a cost-saving tracking system that records what a user saved by doing a project themselves rather than paying for it.',
        'Designed a level system that advances users as they complete projects and collaborate with others.',
        'Designed a categorizing system so projects can be sorted and browsed by type.',
        'Produced the Figma mock-ups behind the feature, including the Aria after-project flow and the Social Board itself.',
        'Implemented the Social Board in Firebase Studio.',
      ],
    },
    {
      title: 'AI-assisted art',
      body: [
        'Aria needed a character and a consistent icon set before there was art support on the project, so I generated them myself.',
      ],
      items: [
        'Generated the Aria character assets and the project’s icon set using ChatGPT 4/5 and Google Gemini.',
      ],
    },
    {
      title: 'Research & documentation',
      body: [
        'Interaction decisions in the headset were backed by research and written up so the rest of the team could build against them.',
      ],
      items: [
        'Researched hand interaction for the headset and wrote the Aria hand UX script.',
        'Researched AR safety and fed the findings into the in-headset warning design.',
        'Wrote the XR button UX script defining how buttons behave in the AR space.',
        'Ran and documented Aria’s first playtest.',
        'Produced technical document studies and the project’s first research write-up.',
      ],
      // The documents above are named but not linked: no public URLs were
      // supplied, and internal design documents should not be published just
      // because the NDA has ended. Add links here only for material that is
      // approved for public release, e.g.
      // links: [{ label: 'Aria Hand UX Script', href: 'https://...' }],
    },
  ],

  links: [
    { label: 'Aria Spark', href: 'https://www.ariaspark.com/', primary: true },
    { label: 'Project Video', href: 'https://www.youtube.com/watch?v=Wg8d4cCvCgc' },
  ],
};
