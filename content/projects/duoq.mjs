export default {
  slug: 'duoq',
  order: 7,
  featured: false,
  group: 'games',

  title: 'DuoQ',
  subtitle: 'An experimental e-dating sim played through a fictional FPS, with an LLM-driven companion.',

  summary: 'E-dating sim where you tackle co-op challenges with Tala.',

  // Short label shown on the project card.
  org: 'USC Games',
  tags: ['UE5', 'AGP', 'AI'],
  roles: ['Usability Staff'],

  meta: {
    studio: 'USC Games — Advanced Game Project (AGP)',
    engine: 'Unreal Engine 5',
    platform: 'PC (Steam)',
    genre: 'Dating sim / FPS',
  },

  thumbnail: { src: 'assets/images/Duoq-cover.png', alt: 'DuoQ key art' },
  hero: { src: 'assets/images/Duoq-cover-project.jpg', alt: 'DuoQ cover art' },

  // Optional trailer. Remove this whole block to show the hero image instead.
  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=BVDNcD-rIQw',
    title: 'DuoQ — trailer',
    // poster: defaults to this project's hero image
  },

  overview: [
    'DuoQ is an experimental e-dating sim where you team up and flirt with Tala, an AI companion, through a fictional FPS. Built in Unreal Engine 5 with a custom LLM, it explores new ground in player-AI interactions.',
  ],

  sections: [
    {
      title: 'Usability',
      items: [
        'Led weekly playtest sessions and document findings using the RITE method.',
        'Collaborated closely with designers and QA teams to iterate and improve gameplay.',
      ],
    },
  ],

  links: [
    { label: 'Steam', href: 'https://store.steampowered.com/app/3677620/DuoQ/', primary: true },
    { label: 'Trailer', href: 'https://www.youtube.com/watch?v=BVDNcD-rIQw' },
  ],
};
