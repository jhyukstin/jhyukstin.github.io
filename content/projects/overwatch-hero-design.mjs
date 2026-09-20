export default {
  slug: 'overwatch-hero-design',
  order: 20,
  featured: false,
  group: 'design-work',

  // Hidden from the homepage and the Work page. The content, images and page
  // are all kept — set this to false to put the project back in the listings.
  hidden: true,

  // Keeps the old URL (/projects/Overwatch HDD.html) working.
  aliases: ['projects/Overwatch HDD.html'],

  title: 'Overwatch — Magnus',
  subtitle: 'An original hero design document for Overwatch.',

  summary: 'Played 2K+ hours & retired Overwatch Esports Player.',

  // Short label shown on the project card.
  org: 'Fan project',
  roles: ['Hero Design Document'],

  meta: {
    genre: 'Hero shooter',
    format: 'Design document',
  },

  thumbnail: { src: 'assets/images/Overwatch_coverpage.jpg', alt: 'Overwatch hero design document cover' },

  overview: [
    'A self-directed hero design document for Overwatch, written as a fan project. Played 2K+ hours and a retired Overwatch Esports player.',
  ],

  gallery: {
    title: 'Magnus — Hero Design Document',
    items: [
      { src: 'assets/images/Magnus_HDD-1.png', alt: 'Magnus hero design document, page 1' },
      { src: 'assets/images/Magnus_HDD-2.png', alt: 'Magnus hero design document, page 2' },
      { src: 'assets/images/Magnus_HDD-3.png', alt: 'Magnus hero design document, page 3' },
      { src: 'assets/images/Magnus_HDD-4.png', alt: 'Magnus hero design document, page 4' },
      { src: 'assets/images/Magnus_HDD-5.png', alt: 'Magnus hero design document, page 5' },
      { src: 'assets/images/Magnus_HDD-6.png', alt: 'Magnus hero design document, page 6' },
      { src: 'assets/images/Magnus_HDD-7.png', alt: 'Magnus hero design document, page 7' },
      { src: 'assets/images/Magnus_HDD-8.png', alt: 'Magnus hero design document, page 8' },
      { src: 'assets/images/Magnus_HDD-9.png', alt: 'Magnus hero design document, page 9' },
    ],
  },

  links: [
    {
      label: 'Magnus HDD',
      href: 'https://docs.google.com/document/d/1E8MFNUzfCjnr5hN7H_fZtAVkecpNjclljFCFTSmqI_c/edit?usp=sharing',
      primary: true,
    },
  ],
};
