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

  // Each entry becomes a paragraph on the About page.
  about: [
    'I’m Jaehyuk Choi, a USC Game Development student passionate about building immersive and impactful player experiences.',
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

  // ----------------------------------------------------------------- contact
  // Headline above your email in the contact block at the bottom of every page.
  contactHeadline: 'Open to gameplay & level design roles.',

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
