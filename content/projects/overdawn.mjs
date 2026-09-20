export default {
  slug: 'overdawn',
  order: 1,
  featured: true,
  group: 'games',

  title: 'Overdawn',
  subtitle: 'A 2.5D bullet-time, bullet-hell shooter set in the dying city of Andrean.',

  // Short line used on cards and in search results.
  summary: '2.5D, bullet hell, bullet time shooter set in a dystopian city of Andrean.',

  // Short label shown on the project card.
  org: 'Overdawn Studio',
  tags: ['Unity'],
  roles: ['Lead Designer', 'Co-Founder', 'Lead Usability'],

  meta: {
    studio: 'Overdawn Studio',
    engine: 'Unity',
    platform: 'PC (Steam)',
    genre: '2.5D bullet-hell shooter',
  },

  thumbnail: { src: 'assets/images/overdawn-cover.png', alt: 'Overdawn key art' },
  hero: { src: 'assets/images/Overdawn-cover-project.png', alt: 'Overdawn cover art' },

  // Optional trailer. Remove this whole block to show the hero image instead.
  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=E7KgVHyf0ak',
    title: 'Overdawn — official trailer',
    // poster: defaults to this project's hero image
  },

  overview: [
    'Overdawn is a unique 2.5D game, fast-paced, bullet-time, bullet-hell shooter featuring thrilling gunplay and precise headshots. Playing as the chosen ones, you must break back into the past, to the doom-impending state of Andrean, where your actions may alter the course of the universe.',
  ],

  sections: [
    {
      title: 'Level Design',
      items: ['Created Mock-up and Block-out in engine for 30 levels.'],
      media: [
        {
          src: 'assets/images/Overdawn_levels.png',
          alt: 'Level mock-ups and in-engine block-outs for Overdawn',
          size: 'wide',
        },
      ],
    },
    {
      title: 'Combat Design',
      items: [
        'Created comprehensive weapon and skill balance sheets for all characters and NPCs.',
        'Revised the main character’s core mechanic to improve player experience and clarity.',
        'Designed and authored a combat design document for boss encounters.',
      ],
      links: [
        {
          label: 'Weapon Sheet',
          href: 'https://docs.google.com/spreadsheets/d/1-M8eFRPXXYjcIriEBW0bhpKGvsLyIVwrFCgdznd1g-c/edit?usp=sharing',
        },
      ],
    },
    {
      title: 'Character Design',
      items: [
        'Authored character design documents for 6 unique NPC enemies, detailing abilities, behaviors, and combat roles.',
        'Developed character design documents for bosses, focusing on mechanics, narrative integration, and progression balance.',
        'Collaborated closely with the narrative team to align character backstories, motivations, and worldbuilding with gameplay design.',
      ],
      links: [
        {
          label: 'NPC Document',
          href: 'https://docs.google.com/document/d/1jSVj_7NPXk_hFwlufKm_kQj4k4MMa6DmL6AchRAewHs/edit?usp=sharing',
        },
        {
          label: 'Rev Document',
          href: 'https://docs.google.com/document/d/1wcH--WMvtjcEQaBlb8Ps8ZA4ROKWOYrY8QZJEYzxSnU/edit?usp=sharing',
        },
      ],
    },
    {
      title: 'System Design',
      items: [
        'Designed a comprehensive skill tree system, including structure, active skills, and passive skills, while collaborating closely with the narrative and art teams to ensure thematic and visual cohesion.',
        'Developed the level progression system, balancing XP curves, difficulty pacing, and reward structures to sustain long-term player engagement.',
        'Created the quest system, outlining quest lists for each chapter, defining objectives, and integrating them with both narrative beats and gameplay progression.',
      ],
      links: [
        {
          label: 'Skill Tree Doc',
          href: 'https://docs.google.com/document/d/1ORktlLp4i8UgvP3j_wjoFJ8jOO9ZadCgmado75nR_1E/edit?usp=sharing',
        },
        {
          label: 'Weapon Wheel Doc',
          href: 'https://docs.google.com/document/d/1X3qwZMSw_nKFrskixhcynMvNo77JIskvTO9iFUg_keE/edit?usp=sharing',
        },
      ],
    },
    {
      title: 'Lead Usability',
      items: [
        'Produced weekly Windows and Mac builds while leading a team of 5 usability and QA staff members.',
        'Oversaw team progress, reviewed playtest notes, and synthesized findings into actionable feedback.',
        'Collaborated closely with engineers to identify, report, and resolve bugs, ensuring smoother player experience.',
      ],
    },
    {
      title: 'UI and UX',
      items: ['Designed Main Menu, weapon wheel, and loadouts.'],
      media: [
        { src: 'assets/images/Overdawn_Main Menu.jpg', alt: 'Overdawn main menu design' },
        { src: 'assets/images/Overdawn_Loadouts.png', alt: 'Overdawn loadout screen design' },
        { src: 'assets/images/Overdawn_weapon wheel.png', alt: 'Overdawn weapon wheel design' },
      ],
    },
  ],

  outcomes: [
    'Game Without Borders (GWB) 2025 — Tencent Games Student Bronze.',
    'GDWC 2025 Finalist — Best Student Game.',
    'SAGE Runner Up — Design.',
  ],

  links: [
    { label: 'Steam', href: 'https://store.steampowered.com/app/3519070/Overdawn/', primary: true },
    { label: 'Trailer', href: 'https://www.youtube.com/watch?v=E7KgVHyf0ak' },
  ],
};
