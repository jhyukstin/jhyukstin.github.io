export default {
  slug: 'move-move-melon',
  order: 4,
  featured: false,
  group: 'games',

  title: 'Move Move Melon!',
  subtitle: 'A whimsical 3D on-rails collection game starring a hamster on a toy ice cream maker.',

  summary: 'Whimsical 3D on-rails collection game where a hamster races.',

  // Short label shown on the project card.
  org: 'USC Games',
  tags: ['Unity', 'AGP', 'Mobile'],
  roles: ['Gameplay Design', 'Level Design'],

  meta: {
    studio: 'USC Games — Advanced Game Project (AGP)',
    engine: 'Unity',
    platform: 'Mobile',
    genre: '3D on-rails collection game',
    team: '40+ member AGP team',
  },

  thumbnail: { src: 'assets/images/MMM-cover.png', alt: 'Move Move Melon! key art' },
  hero: { src: 'assets/images/MMM-cover-project.png', alt: 'Move Move Melon! cover art' },

  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=G8XF0U2x364',
    title: 'Move Move Melon! — gameplay video',
  },

  overview: [
    'Move, Move, Melon!! is a whimsical 3D on-rails collection game where you play as Melon, a joyful hamster racing through snack-filled venues on her toy ice cream maker, a fast-paced adventure packed with charm, color, and delicious chaos.',
    'It is an active mobile runner built around stacking ice cream scoops: the further you get without losing your stack, the taller it grows.',
    'Advanced Game Project (AGP) under USC Games.',
  ],

  sections: [
    {
      title: 'Level Design',
      body: [
        'I designed three of the game’s ten levels and shaped how the run feels moment to moment — where it speeds up, where it lets the player breathe, and how quickly new hazards arrive.',
      ],
      items: [
        'Designed 3 of the 10 levels that ship in the game.',
        'Tuned gameplay pacing across the run so difficulty builds without breaking the game’s light, playful tone.',
      ],
      media: [
        {
          src: 'assets/images/MMM-level-1-1.png',
          alt: 'Move Move Melon! level 1.1: Melon rolling along a wooden pier at sunset toward a rainbow ring',
          caption: 'Level 1.1',
        },
        {
          src: 'assets/images/MMM-level-2-3.png',
          alt: 'Move Move Melon! level 2.3: Melon rolling through a candy-coloured landscape under a red sky',
          caption: 'Level 2.3',
        },
      ],
    },
    {
      title: 'Gameplay Obstacles',
      body: [
        'The hazards in a runner have to read instantly at speed. I built the obstacle behaviour that reacts to the player rather than looping on a timer.',
      ],
      items: [
        'Engineered trigger-based obstacles that activate as the player approaches them.',
      ],
    },
    {
      title: 'Team Collaboration',
      items: [
        'Worked as one of a 40+ member Advanced Game Project team at USC Games, coordinating level work with the wider design group.',
      ],
    },
  ],

  links: [
    { label: 'Steam', href: 'https://store.steampowered.com/app/4379220/Move_Move_Melon/', primary: true },
    { label: 'Gameplay Video', href: 'https://www.youtube.com/watch?v=G8XF0U2x364' },
  ],
};
