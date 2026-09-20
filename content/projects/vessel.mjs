export default {
  slug: 'vessel',
  order: 6,
  featured: false,
  group: 'games',

  title: 'Vessel',
  subtitle: 'A multi-perspective puzzle game about swapping objects to carve a path forward.',

  summary: '3D, puzzle game about swapping objects to uncover a lost underwater civilization.',

  // Short label shown on the project card.
  org: 'USC Games',
  tags: ['UE5', 'MFA Thesis'],
  roles: ['Level Design', 'Game Design'],

  meta: {
    studio: 'USC Games — MFA Thesis',
    engine: 'Unreal Engine 5',
    platform: 'PC (Steam)',
    genre: 'Puzzle',
  },

  thumbnail: { src: 'assets/images/Vessel-cover.jpg', alt: 'Vessel key art' },
  hero: { src: 'assets/images/Vessel-cover-project.jpg', alt: 'Vessel cover art' },

  // Optional trailer. Remove this whole block to show the hero image instead.
  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=Scgc7eCBTTM',
    title: 'Vessel — trailer',
    // poster: defaults to this project's hero image
  },

  overview: [
    'Vessel is a multi-perspective puzzle game where you harness the power of object swapping to carve your path forward. Immerse yourself in the exploration of a forgotten underwater civilization, unveiling its mysteries as you navigate its intricate and atmospheric world.',
  ],

  sections: [
    {
      title: 'Game Design',
      items: [
        'Assisted the game director by contributing design feedback and supporting core vision alignment.',
        'Designed and iterated on game mechanics, player engagement, and system cohesion.',
        'Contributed to level design, shaping player progression, encounter pacing, and spatial flow.',
      ],
      media: [
        {
          src: 'assets/images/Vessel-gamedesign-project.jpg',
          alt: 'Level and game design work from Vessel',
          size: 'wide',
        },
      ],
      links: [
        {
          label: 'Work Drive',
          href: 'https://drive.google.com/drive/folders/1aeiz-IV8S9ZWzjxHKnkZisr6Ig-L8Evi?usp=sharing',
        },
      ],
    },
  ],

  links: [
    { label: 'Steam', href: 'https://store.steampowered.com/app/3321560/Vessel_The_First_Chapter/', primary: true },
    { label: 'Trailer', href: 'https://www.youtube.com/watch?v=Scgc7eCBTTM' },
    { label: 'Work Drive', href: 'https://drive.google.com/drive/folders/1aeiz-IV8S9ZWzjxHKnkZisr6Ig-L8Evi?usp=sharing' },
  ],
};
