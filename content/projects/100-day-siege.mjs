export default {
  slug: '100-day-siege',
  order: 2,
  featured: true,
  group: 'games',

  title: '100 Day Siege',
  subtitle: 'A VR medieval fantasy defense game — hold the castle for 100 days.',

  summary: 'VR medieval fantasy defense game where you battle waves with the slingshot.',

  // Short label shown on the project card.
  org: 'FoundrySix',
  tags: ['Unity', 'VR'],
  roles: ['Game Developer', 'Level Design', '3D Art'],

  meta: {
    studio: 'FoundrySix',
    engine: 'Unity',
    platform: 'VR (Meta Quest)',
    genre: 'VR tower defense',
  },

  thumbnail: { src: 'assets/images/100DS-cover.png', alt: '100 Day Siege key art' },
  hero: { src: 'assets/images/100DS-cover-project.png', alt: '100 Day Siege cover art' },

  // Optional trailer. Remove this whole block to show the hero image instead.
  trailer: {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=gGYVrURFTWc',
    title: '100 Day Siege — gameplay video',
    // poster: defaults to this project's hero image
  },

  overview: [
    '100 Day Siege is a VR tower defense game by FoundrySix where players defend a castle from enemy waves across 100 in-game days using archery, traps, and physics-based tools.',
  ],

  sections: [
    {
      title: 'Level Design',
      subtitle: 'Day 1–5 Levels',
      items: [
        'Designed and implemented 25 levels structured across Day 1–5, with each day containing 5 waves.',
        'Optimized spatial pacing to ensure consistent player engagement and progression.',
        'Tailored VR navigation mechanics to support comfort, immersion, and accessibility.',
      ],
      media: [
        {
          src: 'assets/images/100DS_Level Design.png',
          alt: 'Level design layouts for the Day 1–5 waves of 100 Day Siege',
          size: 'wide',
        },
      ],
    },
    {
      title: 'Gameplay Engineering',
      subtitle: 'Damage Indicator System',
      items: [
        'Built a directional damage indicator system with rotating UI elements to display real-time hit directions.',
        'Designed specifically for a VR environment, aligning UI feedback with player perspective.',
        'Enhanced immersion and situational awareness by notifying players of the direction of incoming enemy projectiles.',
      ],
      media: [
        {
          src: 'assets/images/100DS-DamageIndicator.png',
          alt: 'Directional damage indicator system shown in the VR HUD',
          size: 'wide',
        },
      ],
    },
    {
      title: '3D Art',
      subtitle: 'Slingshot Model',
      items: [
        'Modeled the slingshot weapon in Autodesk Maya and textured it using Adobe Substance 3D Painter.',
        'Implemented the weapon into the VR environment with functional hand-tracking mechanics.',
        'Integrated the slingshot with the enemy targeting script to create responsive and interactive combat gameplay.',
      ],
      media: [
        {
          src: 'assets/images/100DS-SlingshotModel.png',
          alt: 'Slingshot weapon modeled in Maya and textured in Substance 3D Painter',
          size: 'wide',
        },
      ],
    },
    {
      title: 'Documentation',
      subtitle: 'Internal documentation',
      items: [
        'Created 13 internal documents for developers explaining custom scripts, model integration, and system behaviors for team collaboration.',
      ],
      media: [
        {
          src: 'assets/images/100DS-Documentations.png',
          alt: 'Internal developer documentation written for the 100 Day Siege team',
          size: 'wide',
        },
      ],
    },
  ],

  links: [
    { label: 'Meta Store', href: 'https://www.meta.com/experiences/27301584126152354/', primary: true },
    { label: 'Trailer', href: 'https://youtu.be/Kt2O2WRNICs' },
  ],
};
