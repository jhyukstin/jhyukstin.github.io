/**
 * PROFILE — everything about you, in one place.
 *
 * Edit this file to change your name, title, bio, contact links and resume.
 * Then run:  npm run build
 */

export default {
  // ---------------------------------------------------------------- identity
  name: 'Jaehyuk Choi',

  // Shown under your name on the homepage and in the browser tab.
  title: 'Gameplay & Level Designer',

  // The one-line role strip in the header/hero. Keep it short.
  disciplines: ['Gameplay Design', 'Level Design', 'XR Development', 'HCI Research'],

  // ------------------------------------------------------- cinematic hero
  // The single line under your name on the homepage hero. Keep it to one
  // sentence — the longer `intro` is used elsewhere.
  heroLine: 'I create immersive worlds and interactive experiences across PC, mobile, and XR.',

  // The slow-scrolling strip at the bottom of the hero. Displayed in caps.
  // Add or remove keywords freely — the scroll speed adjusts to the length.
  heroMarquee: [
    'Gameplay Design',
    'Level Design',
    'Game Systems',
    'XR Development',
    'UI/UX Design',
    'HCI Research',
    'Prototyping',
    'Player Experience',
  ],

  // Faint artwork behind the hero typography. Use a small file — it loads
  // first. Set to null for a typography-only hero.
  heroBackdrop: {
    src: 'assets/images/Overdawn-cover-project.png',
    alt: '',
  },

  // Homepage hero paragraph. 2-3 sentences, plain text.
  intro:
    'I create immersive worlds and interactive experiences across PC, mobile, and XR — ' +
    'from a bullet-time shooter shipped on Steam to VR defense levels and AI-driven educational games. ' +
    'I design systems, levels and combat, then build and playtest them until they feel right.',

  /**
   * PROFILE PHOTOGRAPH — the circular portrait in the About Me block.
   *
   * To use a real photograph: save it as `assets/images/profile.jpg`
   * (a square image works best, roughly 800x800) and it is picked up
   * automatically. While that file is missing, the build falls back to your
   * avatar at `assets/images/logo.png` and prints a reminder.
   */
  photo: {
    src: 'assets/images/profile.jpg',
    fallback: 'assets/images/logo.png',
    alt: 'Portrait of Jaehyuk Choi',
  },

  // ------------------------------------------------------------------- about
  // The About Me paragraph on the homepage. Aim for 3-5 lines.
  bio:
    'I’m Jaehyuk Choi, a USC Game Development student passionate about building immersive and impactful ' +
    'player experiences. My focus is gameplay and level design: I lead design on Overdawn, and I’ve designed ' +
    'levels, combat and interfaces across VR, mobile and AR projects at FoundrySix, USC Games and Aria Spark.',

  // Each entry becomes a paragraph in the Background section of the About page.
  about: [
    'I’m Jaehyuk, a game designer at USC who loves turning ideas into playable experiences. From designing combat systems and levels to building interactive experiences across PC, mobile, VR, and AR, I enjoy experimenting, solving design challenges, and refining games through playtesting.',
  ],

  // ---------------------------------------------------------------- education
  // Shown in the compact Education & Awards strip. Add more entries if needed.
  education: [
    {
      school: 'University of Southern California',
      division: 'School of Cinematic Arts',
      degree: 'BFA, Interactive Media & Game Design',
      // period: '2022 – 2026',   // optional — uncomment and fill in if you want it shown
    },
  ],

  /**
   * AWARDS & RECOGNITION
   * `distinction` is the exact standing (Finalist, Winner, Runner Up, Nominee).
   * `project` links to that project's page when the slug matches a content file.
   * Leave `year` out when it isn't documented — nothing is guessed.
   */
  awards: [
    {
      name: 'Game Without Borders',
      distinction: 'Tencent Games Student Bronze',
      year: '2025',
      project: 'Overdawn',
      projectSlug: 'overdawn',
    },
    {
      name: 'GDWC',
      distinction: 'Finalist',
      category: 'Best Student Game',
      year: '2025',
      project: 'Overdawn',
      projectSlug: 'overdawn',
    },
    {
      name: 'SAGE',
      distinction: 'Runner Up',
      category: 'Design',
      project: 'Overdawn',
      projectSlug: 'overdawn',
    },
  ],

  // Grouped interests shown on the About page.
  interests: [
    { label: 'Game Design', detail: 'Gameplay Design and Level Design' },
    { label: 'XR Development', detail: 'HCI research and UI & UX' },
    { label: 'AI Applications', detail: 'Computer Vision and HCI' },
  ],

  // Shown as one compact line under Interests on the About page. These are
  // hobbies — the professional `interests` list above is separate.
  personalInterests: ['Running', 'Watching sports', 'Playing music (drums, guitar, bass, and keyboard)'],

  // Tools and languages.
  skills: ['Unity', 'Unreal Engine 5', 'Maya', 'C#', 'C++', 'Python', 'Figma'],

  // Professional experience. Newest first.
  experience: [
    { org: 'Overdawn Studio', role: 'Co-Founder, Lead Designer, Lead Usability' },
    { org: 'Foundry Six', role: 'VR Game Development Intern' },
    { org: 'USC Institute of Creative Technologies', role: 'Researcher, Game Developer' },
    { org: 'USC Games', role: 'Student Assistant' },
    { org: 'USC Esports', role: 'Content Lead, Overwatch Team' },
  ],

  /**
   * PUBLICATIONS
   * Grouped by `year` on the About page, newest year first. `doi` is optional:
   * leave it out and the citation renders without a link rather than a broken
   * button. Order within a year follows this array.
   */
  publications: [
    {
      year: '2026',
      title:
        'Multimodal Data Analysis in the Digital Game Industry: Success Prediction, Recommendation Systems, Trend Analysis, and Branding Strategy Validation',
      authors: 'Choi, J., & Choi, Y.',
      venue: 'HCI in Games, HCII 2026',
      details: 'LNCS 16740, 186–204',
      doi: 'https://doi.org/10.1007/978-3-032-30408-7_11',
    },
    {
      year: '2025',
      title: 'Unlocking Player Engagement for Game Design',
      authors: 'Choi, J., et al.',
      venue: '7th International Conference on HCI in Games (HCI-Games 2025)',
      doi: 'https://doi.org/10.1007/978-3-031-94162-7_27',
    },
    {
      year: '2025',
      title:
        'The Influence of Social Distance Perception Among Gamers on Relationships Between Game Motivation and Interpersonal Competency',
      authors: 'Choi, J., & Choi, Y.',
      venue: 'Entertainment Computing',
      details: '52, 100903',
      doi: 'https://doi.org/10.1016/j.entcom.2024.100903',
    },
    {
      year: '2025',
      title:
        'Examining the Influence of Avatar Identification on Sharing Intention in the Metaverse: The Mediating Role of Immersion and Moderating Effect of Perceived Social Distance',
      authors: 'Choi, J., & Choi, Y.',
      venue: 'World of Media',
      details: '1, 54–78',
      // DOI intentionally omitted: the CV lists the same DOI as the
      // Entertainment Computing paper above, which cannot be correct for both.
      // Add the real DOI here once you have it.
    },
    {
      year: '2024',
      title:
        'The Relationship Between Avatar Identification Factors and Vicarious Pleasure: The Moderating Role of Affect Intensity in the Metaverse',
      authors: 'Choi, J., et al.',
      venue: 'Journal of Metaverse',
      details: '4(2), 138–145',
      doi: 'https://doi.org/10.57019/jmv.1557144',
    },
    {
      year: '2022',
      title: 'Integrating the Mobile Game Item and Customer Loyalty Mileage in NFT',
      authors: 'Choi, J., & Choi, J. W.',
      venue: 'International Journal of Current Science Research and Review',
      details: '5(2), 553–558',
      doi: 'https://doi.org/10.47191/IJCSRR/V5-i2-30',
    },
  ],

  // ----------------------------------------------------------------- contact
  // Headline above your email in the contact block at the bottom of every
  // page. Each string is its own line.
  contactHeadline: ['Have something in mind?', 'Let’s talk.'],

  email: 'jaehyuk@usc.edu',

  // Only links with a real `href` are rendered. Delete or comment out any you don't use.
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaehyuk-choi-583a85289/' },
    { label: 'GitHub', href: 'https://github.com/jhyukstin' },
  ],

  /**
   * RESUME
   * Drop your PDF at the path below and it appears automatically in the header,
   * the hero and the About page. While the file is missing, every resume link is
   * omitted from the site (the build prints a warning, it does not fail).
   */
  resume: 'assets/resume/Jaehyuk-Choi-Resume.pdf',

  // ------------------------------------------------------------------ site
  // Used for <link rel="canonical">, sitemap.xml and social preview tags.
  siteUrl: 'https://jhyukstin.github.io',

  // Image used when the site is shared on Slack / Discord / LinkedIn.
  socialPreview: 'assets/images/main-cover.png',
};
