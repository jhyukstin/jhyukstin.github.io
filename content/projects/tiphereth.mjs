export default {
  // Capitalised on purpose: this is the project's existing public URL
  // (/projects/Tiphereth.html), kept so old links keep working.
  slug: 'Tiphereth',
  order: 5,
  featured: false,
  group: 'games',

  // Archived: taken off the public site completely — no listing, no project
  // page, no sitemap entry. The content below and every image it references
  // are kept in the repository. Set this to false to restore the project.
  archived: true,

  title: 'Tiphereth',
  subtitle: 'An FPS survival action game about turning fear into strength.',

  summary: 'FPS, survival action game about turning fear into strength.',

  // Short label shown on the project card.
  org: 'USC Games',
  tags: ['Unity', 'MFA Thesis'],
  roles: ['Level Design', 'Character Design', 'Narrative Design'],

  meta: {
    studio: 'USC Games — MFA Thesis',
    engine: 'Unity',
    platform: 'PC',
    genre: 'FPS survival action',
  },

  thumbnail: { src: 'assets/images/Tiphereth-cover.png', alt: 'Tiphereth key art' },
  hero: { src: 'assets/images/Tiphereth-cover-project.png', alt: 'Tiphereth cover art' },

  overview: [
    'Tiphereth is a 3D FPS, MFA thesis project in USC games which the player runs away from unknown people in fictional 90’s soviet apartments.',
  ],

  sections: [
    {
      title: 'Game Design',
      items: [
        'Level Design: Created 5 playable levels, balancing pacing, enemy encounters, and player flow.',
        'Character Design: Designed enemy characters in collaboration with narrative and art teams to ensure cohesion across story and visuals.',
        'Narrative Design: Wrote initial narrative drafts to establish story direction and integrate gameplay with thematic elements.',
      ],
      media: [
        {
          src: 'assets/images/Tiphereth-cover-gamedesign.png',
          alt: 'Game design work from Tiphereth',
          size: 'wide',
        },
      ],
    },
  ],

  // The old page had "Steam" and "Trailer" buttons pointing at a placeholder
  // URL (href="Link"), so they are omitted until real URLs exist.
  links: [],
};
