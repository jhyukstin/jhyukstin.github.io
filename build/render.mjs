/**
 * Templates. Every page is assembled here from plain strings — no framework,
 * no runtime JavaScript shipped to the browser.
 */
import { esc, escUrl, join, list, pad } from './lib/html.mjs';
import { abbreviateThousands } from './lib/format.mjs';

/* ------------------------------------------------------------------ pieces */

const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap">`;

/** <img> with intrinsic size baked in so nothing shifts while loading. */
function image(media, base, { lazy = true, className = '', capWidth = false } = {}) {
  if (!media || !media.src) return '';
  const dims = media.width && media.height ? ` width="${media.width}" height="${media.height}"` : '';
  const cls = className ? ` class="${esc(className)}"` : '';
  // Keeps a small asset from being stretched past its own resolution.
  const cap = capWidth && media.width ? ` style="max-width:${media.width}px"` : '';
  return `<img${cls} src="${escUrl(base + media.src)}" alt="${esc(media.alt || '')}"${dims}${cap}${
    lazy ? ' loading="lazy" decoding="async"' : ' decoding="async"'
  }>`;
}

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 5.14v13.72L19 12z"/></svg>';

/**
 * Click-to-play YouTube facade: the project's own poster is shown first and the
 * player is only fetched when someone presses play. Without JavaScript the
 * <noscript> iframe is used instead, so the video always works.
 */
function youtubeEmbed(media, base) {
  const id = media.youtubeId;
  if (!id) return '';
  const label = media.title || 'Play video';
  const embed = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  const poster = media.poster
    ? image({ src: media.poster, alt: '', width: media.width, height: media.height }, base)
    : `<img src="${escUrl(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}" alt="" loading="lazy" decoding="async">`;

  return `<div class="video">
  <button class="video__play" type="button" data-embed="${escUrl(`${embed}&autoplay=1`)}" data-title="${esc(label)}">
    ${poster}
    <span class="video__button" aria-hidden="true">${PLAY_ICON}</span>
    <span class="video__label">${esc(label)}</span>
  </button>
  <noscript><iframe class="video__frame" src="${escUrl(embed)}" title="${esc(
    label
  )}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></noscript>
</div>`;
}

/** A local MP4, shown with its poster and native controls. Never autoplays. */
function localVideo(media, base, { ratio = false } = {}) {
  return `<video class="video__el" controls preload="none"${
    media.poster ? ` poster="${escUrl(base + media.poster)}"` : ''
  }${ratio ? '' : ''}><source src="${escUrl(base + media.video)}" type="video/mp4">Your browser cannot play this video. <a href="${escUrl(
    base + media.video
  )}">Download it instead.</a></video>`;
}

/** Image, local video or YouTube — whichever the content entry describes. */
function mediaElement(media, base, opts) {
  if (!media) return '';
  if (media.youtubeId) return youtubeEmbed(media, base);
  if (media.video) return `<div class="video video--file">${localVideo(media, base)}</div>`;
  return image(media, base, opts);
}

function figure(media, base, opts) {
  const inner = mediaElement(media, base, opts);
  if (!inner) return '';
  return `<figure>${inner}${
    media.caption ? `\n<figcaption>${esc(media.caption)}</figcaption>` : ''
  }</figure>`;
}

/** True when anything on the page needs the click-to-play script. */
function needsVideoScript(html) {
  return html.includes('class="video__play"');
}

/** Swaps the poster for the real player on click. Only emitted when needed. */
const VIDEO_SCRIPT = `<script>
document.addEventListener('click', function (event) {
  var button = event.target.closest('.video__play');
  if (!button) return;
  var frame = document.createElement('iframe');
  frame.className = 'video__frame';
  frame.src = button.dataset.embed;
  frame.title = button.dataset.title || 'Video';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  button.replaceWith(frame);
});
</script>`;

function mediaGrid(items, base) {
  if (!items || !items.length) return '';
  const multi = items.length > 1 ? ' media-grid--multi' : '';
  return `<div class="media media-grid${multi}">
${list(items, (m) => figure(m, base))}
</div>`;
}

function header(profile, base, current) {
  const link = (href, label, id, extra = '') =>
    `<a href="${escUrl(base + href)}"${current === id ? ' aria-current="page"' : ''}${extra}>${esc(label)}</a>`;
  return `<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="${escUrl(base + 'index.html')}">
      <span class="brand__name">${esc(profile.name)}</span>
      <span class="brand__role">${esc(profile.title)}</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      ${link('projects.html', 'Work', 'work')}
      ${link('about.html', 'About', 'about')}
      <a href="#contact">Contact</a>
      ${
        profile.resumeHref
          ? `<a class="nav-resume" href="${escUrl(base + profile.resumeHref)}" target="_blank" rel="noopener">Résumé</a>`
          : ''
      }
    </nav>
  </div>
</header>`;
}

function contact(profile, base) {
  const links = [
    ...(profile.resumeHref ? [{ label: 'Résumé', href: base + profile.resumeHref }] : []),
    ...profile.social.filter((s) => s.href),
  ];
  return `<section class="contact" id="contact">
  <div class="wrap">
    <p class="label">Contact</p>
    <h2 class="contact__title">${(Array.isArray(profile.contactHeadline)
      ? profile.contactHeadline
      : [profile.contactHeadline || `Get in touch with ${profile.name}.`]
    )
      .map(esc)
      .join('<br>')}</h2>
    <a class="contact__email" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
    <div class="contact__links">
${list(links, (l) => `      <a class="btn" href="${escUrl(l.href)}"${/^https?:/i.test(l.href) ? ' target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>`)}
    </div>
  </div>
</section>`;
}

function footer(profile) {
  return `<footer class="site-footer">
  <div class="wrap">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)}</span>
    <span><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></span>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ layout */

export function layout({ profile, base, current, title, description, path, main, ogImage, bodyClass = '' }) {
  const canonical = `${profile.siteUrl.replace(/\/$/, '')}/${path}`.replace(/\/index\.html$/, '/');
  const og = ogImage || profile.socialPreview;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${escUrl(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${escUrl(canonical)}">
  ${og ? `<meta property="og:image" content="${escUrl(`${profile.siteUrl.replace(/\/$/, '')}/${og}`)}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#141416">${fontLinks}
  <link rel="stylesheet" href="${escUrl(base + 'assets/css/site.css')}">
</head>
<body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>
<a class="skip-link" href="#main">Skip to content</a>
${header(profile, base, current)}
<main id="main">
${main}
</main>
${contact(profile, base)}
${footer(profile)}
${needsVideoScript(main) ? VIDEO_SCRIPT : ''}
${main.includes('data-cine') ? `<script src="${escUrl(base + 'assets/js/hero.js')}" defer></script>` : ''}
</body>
</html>
`;
}

/* ------------------------------------------------------------------- cards */

/**
 * Project highlights — awards, ratings and milestones from the project's
 * `highlights` array. One component, used both on the listing cards and as the
 * Results section of the detail page, so the data lives in exactly one place.
 * Renders nothing at all when a project has no highlights.
 *
 * Large figures are abbreviated on the way out ("2,000+" -> "2k+"). The
 * content files keep the real number; only this rendering is shortened.
 *
 * `compact` is the card variant: a label instead of a surrounding heading, no
 * category captions, and — importantly — no links. A card is itself one big
 * anchor, and an <a> inside an <a> is invalid HTML: the parser closes the card
 * early and everything after the nested link spills out of it.
 */
function highlights(project, { compact = false } = {}) {
  const items = project.highlights || [];
  if (!items.length) return '';

  const entry = (item) => {
    const text = esc(abbreviateThousands(item.text));
    const body =
      item.url && !compact
        ? `<a href="${escUrl(item.url)}" target="_blank" rel="noopener noreferrer">${text}</a>`
        : text;
    const category = !compact && item.category ? `<span class="highlight__cat">${esc(item.category)}</span>` : '';
    return `        <li class="highlight"><span class="highlight__text">${body}</span>${category}</li>`;
  };

  const variant = compact ? ' highlights--compact' : ' highlights--page';
  // On the detail page the surrounding "Results" heading already labels these.
  const heading = compact ? '        <p class="highlights__label">Project highlights</p>\n' : '';

  return `      <div class="highlights${variant}">
${heading}        <ul class="highlights__list">
${items.map(entry).join('\n')}
        </ul>
      </div>`;
}

function roleLine(project) {
  return [project.roles?.[0], project.meta?.engine, project.meta?.platform].filter(Boolean).join(' · ');
}

/**
 * Artwork column for a card.
 *
 * The artwork sits on a plate of its own with a fixed 16:9 aspect ratio, so
 * every card's media reads at the same shape however tall the card grows.
 * Artwork squarer than 3:2 — box art, portrait key art — would be left
 * floating in the middle of that plate, so it gets a 4:3 plate instead.
 *
 * The image itself is fitted, never stretched: `contain` by default, which
 * never crops a logo, and `cover` only where a project has opted in because
 * its artwork can safely lose a little from the edges.
 */
function mediaClass(media) {
  const ratio = media?.width && media?.height ? media.width / media.height : null;
  return [
    'card__media',
    media?.fit === 'cover' ? 'card__media--cover' : '',
    ratio !== null && ratio < 1.5 ? 'card__media--upright' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * The project card — the single layout used by every project listing on the
 * site: Featured Projects and More projects on the homepage, and each section
 * of the Work page.
 *
 * Two columns on a wide screen: the information at 55% on the left, the
 * artwork at 45% on the right. Both columns grow with their content, so
 * nothing is ever clipped. `feature: true` only scales the type up — the
 * layout, the spacing and the order of the information are the same
 * everywhere.
 */
export function card(project, index, base, { feature = false } = {}) {
  const media = project.cardImage || project.hero || project.thumbnail;
  // A project with no artwork yet gets a clean text-only card rather than an
  // empty image frame.
  const mediaBlock = media?.src
    ? `  <div class="${mediaClass(media)}">
    <div class="card__plate">
      ${image(media, base, { lazy: !feature || index > 0 })}
      ${project.badge ? `<span class="card__badge">${esc(project.badge)}</span>` : ''}
    </div>
  </div>`
    : '';

  const studio = project.org || project.meta?.studio || '';
  const summary = feature
    ? project.subtitle || project.summary || ''
    : project.summary || project.subtitle || '';

  const inner = `  <div class="card__body">
    <p class="card__eyebrow"><span class="card__index">${pad(index + 1)}</span>${
      studio ? ` <span class="card__org">${esc(studio)}</span>` : ''
    }</p>
    ${!media?.src && project.badge ? `<p class="card__flag">${esc(project.badge)}</p>` : ''}
    <h3 class="card__title">${esc(project.title)}</h3>
    <p class="card__roles">${esc(roleLine(project) || (project.tags || []).join(' · '))}</p>
    <p class="card__summary">${esc(summary)}</p>
${highlights(project, { compact: true })}
    ${
      project.hasPage === false
        ? ''
        : '<span class="arrow-link card__more">View project <span aria-hidden="true">→</span></span>'
    }
  </div>
${mediaBlock}`;

  const classes = ['card', feature ? 'card--feature' : '', media?.src ? '' : 'card--text']
    .filter(Boolean)
    .join(' ');
  return project.hasPage === false
    ? `<article class="${classes} card--static">\n${inner}\n</article>`
    : `<a class="${classes}" href="${escUrl(base + project.url)}">\n${inner}\n</a>`;
}

/* ------------------------------------------------------ about me + credits */

const TROPHY_ICON =
  '<svg class="award__icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">' +
  '<path fill="currentColor" d="M18 2h3v3a4 4 0 0 1-3.2 3.92A6 6 0 0 1 13 12.9V16h3v2H8v-2h3v-3.1A6 6 0 0 1 6.2 8.92 4 4 0 0 1 3 5V2h3V1h12zM6 4H5v1a2 2 0 0 0 1 1.73zm13 0h-1v2.73A2 2 0 0 0 19 5zM8 3v5a4 4 0 0 0 8 0V3zM5 20h14v2H5z"/></svg>';

/** Circular portrait beside name, title and a short biography. */
function bioBlock(profile, base) {
  return `    <div class="bio">
      ${
        profile.photo?.src
          ? `<div class="bio__photo">${image(profile.photo, base)}</div>`
          : ''
      }
      <div class="bio__text">
        <h3 class="bio__name">${esc(profile.name)}</h3>
        <p class="bio__role">${esc(profile.title)}</p>
        <p class="bio__intro">${esc(profile.bio || profile.intro)}</p>
      </div>
    </div>`;
}

/** Compact Education & Awards strip. Either half is skipped when empty. */
function credentials(profile, base) {
  const education = profile.education || [];
  const awards = profile.awards || [];
  if (!education.length && !awards.length) return '';

  const eduItem = (e) =>
    `          <li>
            <strong>${esc(e.school)}</strong>
            ${e.division ? `<span class="credentials__division">${esc(e.division)}</span>` : ''}
            ${e.degree ? `<span class="credentials__degree">${esc(e.degree)}</span>` : ''}
            ${e.period ? `<span class="credentials__period">${esc(e.period)}</span>` : ''}
          </li>`;

  const awardItem = (a) => {
    const standing = [a.distinction, a.category].filter(Boolean).join(' — ');
    const projectLabel = a.project
      ? a.projectSlug
        ? `<a href="${escUrl(`${base}projects/${a.projectSlug}.html`)}">${esc(a.project)}</a>`
        : esc(a.project)
      : '';
    return `          <li class="award">
            ${TROPHY_ICON}
            <span class="award__text"><strong>${esc(
              [a.name, a.year].filter(Boolean).join(' ')
            )}</strong>${standing ? ` <span class="award__standing">${esc(standing)}</span>` : ''}${
      projectLabel ? ` <span class="award__project">${projectLabel}</span>` : ''
    }</span>
          </li>`;
  };

  return `    <div class="credentials">
${
  education.length
    ? `      <div>
        <p class="label">Education</p>
        <ul class="credentials__list">
${list(education, eduItem)}
        </ul>
      </div>`
    : ''
}
${
  awards.length
    ? `      <div>
        <p class="label">Awards &amp; recognition</p>
        <ul class="credentials__list">
${list(awards, awardItem)}
        </ul>
      </div>`
    : ''
}
    </div>`;
}

/* ----------------------------------------------------- cinematic hero */

/**
 * Full-viewport opening sequence for the homepage.
 *
 * The name is real, selectable text, split into masked words at build time so
 * the entrance animation is pure CSS — it runs (and the hero reads correctly)
 * with JavaScript disabled. `assets/js/hero.js` only adds the pointer parallax
 * and the scroll hand-off, and does nothing when reduced motion is requested.
 */
function cinematicHero(profile, base, scrollTarget) {
  // Two stacked lines: given name, then the rest.
  const parts = profile.name.trim().split(/\s+/);
  const lines = parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : parts;

  // Each line animates from behind its own mask, one after the other.
  const nameLines = lines
    .map(
      (line, i) =>
        `      <span class="cine__line"><span class="cine__reveal" style="--i:${i}">${esc(line)}</span></span>`
    )
    .join('\n');

  const marquee = (profile.heroMarquee || []).length
    ? profile.heroMarquee
    : ['Gameplay Design', 'Level Design', 'Interactive Experiences'];
  // Every item carries its own trailing separator, so the two halves are
  // identical in width and the -50% loop has no visible seam.
  const strip = [...marquee, ...marquee]
    .map((item) => `<span>${esc(item)}</span><i aria-hidden="true">✳</i>`)
    .join('');

  // The loop travels half the track, so its width sets the perceived speed.
  // Scaling the duration by the text length keeps that speed constant however
  // many keywords are listed.
  const marqueeSeconds = Math.max(20, Math.round(marquee.join('').length * 0.7));

  return `<section class="cine" data-cine>
  ${
    profile.heroBackdrop?.src
      ? `<div class="cine__backdrop" aria-hidden="true">${image(profile.heroBackdrop, base, {
          lazy: false,
        })}</div>`
      : ''
  }
  <div class="cine__stage">
    <div class="wrap">
      <h1 class="cine__name">
${nameLines}
      </h1>
      <p class="cine__role"><span class="cine__reveal" style="--i:2">${esc(profile.title)}</span></p>
      <p class="cine__say">${esc(profile.heroLine || profile.intro)}</p>
      <div class="cine__actions">
        <a class="cine-btn cine-btn--primary" href="${escUrl(base + 'projects.html')}">View work</a>
        <a class="cine-btn" href="${escUrl(base + 'about.html')}">About</a>
        <a class="cine-btn" href="#contact">Contact</a>
        ${
          profile.resumeHref
            ? `<a class="cine-btn" href="${escUrl(base + profile.resumeHref)}" target="_blank" rel="noopener">Résumé</a>`
            : ''
        }
      </div>
    </div>
  </div>
  <div class="cine__foot">
    <div class="wrap cine__foot-inner">
      <a class="cine__scroll" href="#${esc(scrollTarget)}"><span>Scroll</span><i aria-hidden="true"></i></a>
      <div class="cine__marquee" aria-hidden="true"><div class="cine__track" style="--marquee-duration:${marqueeSeconds}s">${strip}</div></div>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------------- home */

export function homePage(ctx) {
  const { profile, projects, base = '' } = ctx;
  const featured = projects.filter((p) => p.featured && p.hasPage !== false);
  const featuredIds = new Set(featured.map((p) => p.slug));
  const more = projects.filter((p) => !featuredIds.has(p.slug));

  const main = join([
    cinematicHero(profile, base, featured.length ? 'featured-heading' : 'more-heading'),

    featured.length &&
      `<section class="section" aria-labelledby="featured-heading">
  <div class="wrap">
    <div class="section__head">
      <h2 class="section__title" id="featured-heading">Featured Projects</h2>
      <p class="section__note">${featured.length} of ${projects.length} projects</p>
    </div>
    <div class="card-grid">
${list(featured, (p, i) => card(p, i, base, { feature: true }))}
    </div>
  </div>
</section>`,

    more.length &&
      `<section class="section" aria-labelledby="more-heading">
  <div class="wrap">
    <div class="section__head">
      <h2 class="section__title" id="more-heading">More projects</h2>
      <a class="arrow-link" href="${escUrl(base + 'projects.html')}">All work <span aria-hidden="true">→</span></a>
    </div>
    <div class="card-grid">
${list(more, (p, i) => card(p, i, base))}
    </div>
  </div>
</section>`,

    `<section class="section" aria-labelledby="about-heading">
  <div class="wrap">
    <div class="section__head">
      <h2 class="section__title" id="about-heading">About</h2>
      <a class="arrow-link" href="${escUrl(base + 'about.html')}">Full background <span aria-hidden="true">→</span></a>
    </div>
${bioBlock(profile, base)}
${credentials(profile, base)}
  </div>
</section>`,
  ]);

  return layout({
    profile,
    base,
    current: 'home',
    title: `${profile.name} — ${profile.title}`,
    description: profile.intro,
    path: 'index.html',
    main,
  });
}

/* -------------------------------------------------------------------- work */

export function workPage(ctx) {
  const { profile, projects, base = '', groups } = ctx;
  const sections = Object.entries(groups)
    .map(([key, label]) => [label, projects.filter((p) => p.group === key)])
    .filter(([, items]) => items.length);

  const main = join([
    `<section class="hero">
  <div class="wrap">
    <span class="hero__title">Work</span>
    <h1 class="hero__name">Projects</h1>
    <p class="hero__intro">Shipped games, student projects and research work — each page breaks down what I personally designed and built.</p>
  </div>
</section>`,
    ...sections.map(
      ([label, items]) => `<section class="section" aria-labelledby="${esc(label.toLowerCase().replace(/\s+/g, '-'))}-heading">
  <div class="wrap">
    <div class="section__head">
      <h2 class="section__title" id="${esc(label.toLowerCase().replace(/\s+/g, '-'))}-heading">${esc(label)}</h2>
      <p class="section__note">${items.length} project${items.length === 1 ? '' : 's'}</p>
    </div>
    <div class="card-grid">
${list(items, (p, i) => card(p, i, base))}
    </div>
  </div>
</section>`
    ),
  ]);

  return layout({
    profile,
    base,
    current: 'work',
    title: `Work — ${profile.name}`,
    description: `Game design and development projects by ${profile.name}, including ${projects
      .slice(0, 4)
      .map((p) => p.title)
      .join(', ')}.`,
    path: 'projects.html',
    main,
  });
}

/**
 * Academic bibliography, grouped by year with the newest year first. A paper
 * links from its title only when it has a DOI — no entry ever renders a dead
 * button. Nothing here is hardcoded: it all comes from `profile.publications`.
 */
function publications(profile) {
  const papers = profile.publications || [];
  if (!papers.length) return '';

  // Group by year, keeping each year's entries in the order they are listed.
  const byYear = new Map();
  for (const paper of papers) {
    const year = String(paper.year || '');
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(paper);
  }
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));

  const entry = (paper) => {
    const title = esc(paper.title);
    const meta = [paper.venue, paper.details].filter(Boolean).map(esc).join(' · ');
    return `        <li class="pub">
          <h4 class="pub__title">${
            paper.doi
              ? `<a href="${escUrl(paper.doi)}" target="_blank" rel="noopener noreferrer">${title}</a>`
              : title
          }</h4>
          ${paper.authors ? `<p class="pub__authors">${esc(paper.authors)}</p>` : ''}
          ${meta ? `<p class="pub__venue">${meta}</p>` : ''}
          ${
            paper.doi
              ? `<a class="pub__link" href="${escUrl(paper.doi)}" target="_blank" rel="noopener noreferrer" aria-label="View publication: ${esc(
                  paper.title
                )}">View publication <span aria-hidden="true">↗</span></a>`
              : ''
          }
        </li>`;
  };

  return `
<section class="section" aria-labelledby="publications-heading">
  <div class="wrap">
    <div class="section__head">
      <h2 class="section__title" id="publications-heading">Publications</h2>
      <p class="section__note">${papers.length} peer-reviewed papers</p>
    </div>
${years
  .map(
    (year) => `    <div class="pubs__group">
      <h3 class="pubs__year">${esc(year)}</h3>
      <ul class="pubs__list">
${byYear
  .get(year)
  .map(entry)
  .join('\n')}
      </ul>
    </div>`
  )
  .join('\n')}
  </div>
</section>`;
}

/* ------------------------------------------------------------------- about */

export function aboutPage(ctx) {
  const { profile, base = '' } = ctx;
  const main = `<section class="hero">
  <div class="wrap">
    <span class="hero__title">About</span>
    <h1 class="hero__name">${esc(profile.name)}</h1>
    <p class="hero__intro">${esc(profile.intro)}</p>
    ${
      profile.resumeHref
        ? `<div class="btn-row"><a class="btn btn--primary" href="${escUrl(base + profile.resumeHref)}" target="_blank" rel="noopener">Download résumé</a></div>`
        : ''
    }
  </div>
</section>

<section class="section" aria-labelledby="background-heading">
  <div class="wrap">
    <div class="section__head"><h2 class="section__title" id="background-heading">Background</h2></div>
    <div class="about-grid">
      <div class="prose about-grid__lead">
${list(profile.about, (p) => `        <p>${esc(p)}</p>`)}
      </div>
      <div>
        <h3 class="label">Interests</h3>
        <ul class="def-list def-list--tight">
${list(profile.interests, (i) => `          <li><strong>${esc(i.label)}</strong><span>${esc(i.detail)}</span></li>`)}
        </ul>
        ${
          profile.personalInterests?.length
            ? `<div class="about-personal">
          <h3 class="label">Personal Interests</h3>
          <p>${profile.personalInterests.map(esc).join(' · ')}</p>
        </div>`
            : ''
        }
      </div>
    </div>
    <div class="about-skills">
      <h3 class="label">Skills</h3>
      <ul class="chips">
${list(profile.skills, (s) => `        <li>${esc(s)}</li>`)}
      </ul>
    </div>
${credentials(profile, base)}
  </div>
</section>

<section class="section" aria-labelledby="experience-heading">
  <div class="wrap">
    <div class="section__head"><h2 class="section__title" id="experience-heading">Professional experience</h2></div>
    <ul class="def-list def-list--wide">
${list(profile.experience, (e) => `      <li><strong>${esc(e.org)}</strong><span>${esc(e.role)}</span></li>`)}
    </ul>
  </div>
</section>
${publications(profile)}`;

  return layout({
    profile,
    base,
    current: 'about',
    title: `About — ${profile.name}`,
    description: profile.about[0] || profile.intro,
    path: 'about.html',
    main,
  });
}

/* ----------------------------------------------------------- project page */

const SPEC_FIELDS = [
  ['roles', 'Role'],
  ['studio', 'Team'],
  ['engine', 'Engine'],
  ['platform', 'Platform'],
  ['genre', 'Genre'],
  ['team', 'Team size'],
  ['period', 'Timeline'],
  ['status', 'Status'],
  ['format', 'Format'],
];

function specList(project) {
  const values = { ...project.meta, roles: (project.roles || []).join(', ') };
  const rows = SPEC_FIELDS.filter(([key]) => values[key]).map(
    ([key, label]) => `    <div><dt>${esc(label)}</dt><dd>${esc(values[key])}</dd></div>`
  );
  return rows.length ? `<dl class="spec">\n${rows.join('\n')}\n  </dl>` : '';
}

function block(section, index, base) {
  const body = join([
    section.body?.length ? list(section.body, (p) => `    <p>${esc(p)}</p>`) : '',
    section.items?.length
      ? `    <ul class="bullets">\n${list(section.items, (i) => `      <li>${esc(i)}</li>`)}\n    </ul>`
      : '',
    section.note ? `    <p class="block__note">${esc(section.note)}</p>` : '',
    section.links?.length
      ? `    <div class="btn-row" style="margin-top:1.5rem">\n${list(
          section.links,
          (l) => `      <a class="btn" href="${escUrl(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`
        )}\n    </div>`
      : '',
  ]);

  return `<section class="block">
  <div class="block__head">
    <span class="block__index" aria-hidden="true">${pad(index + 1)}</span>
    <h3 class="block__title">${esc(section.title)}</h3>
    ${section.subtitle ? `<p class="block__subtitle">${esc(section.subtitle)}</p>` : ''}
  </div>
  ${body ? `<div class="block__body">\n${body}\n  </div>` : ''}
  ${section.media?.length ? `<div class="block__media">${mediaGrid(section.media, base)}</div>` : ''}
</section>`;
}

export function projectPage(ctx, project, prev, next) {
  const { profile, base = '../', groups } = ctx;
  const heroMedia = project.hero || project.thumbnail;

  const main = join([
    `<div class="wrap breadcrumb"><a href="${escUrl(base + 'projects.html')}">← All work</a></div>

<section class="wrap project-head">
  <span class="project-head__eyebrow">${esc(groups[project.group] || 'Project')}</span>
  <h1 class="project-head__title">${esc(project.title)}</h1>
  ${project.subtitle ? `<p class="project-head__subtitle">${esc(project.subtitle)}</p>` : ''}
  ${
    project.links?.length
      ? `<div class="btn-row">\n${list(
          project.links,
          (l) =>
            `    <a class="btn${l.primary ? ' btn--primary' : ''}" href="${escUrl(l.href)}" target="_blank" rel="noopener">${esc(
              l.label
            )}</a>`
        )}\n  </div>`
      : ''
  }
</section>

<div class="wrap">
  ${specList(project)}
</div>`,

    // Primary media: the trailer when the project has one, otherwise the hero
    // image at its own aspect ratio. Never both, never an empty player.
    project.trailer
      ? `<div class="wrap">
  ${mediaElement(project.trailer, base)}
</div>`
      : heroMedia &&
        `<div class="wrap">
  <div class="project-cover">${mediaElement(heroMedia, base, { lazy: false, capWidth: true })}</div>
</div>`,

    project.overview?.length &&
      `<section class="wrap section" style="padding-block:clamp(2rem,4vw,3rem)">
  <h2 class="label" style="margin-bottom:1rem">Overview</h2>
  <div class="prose">
${list(project.overview, (p) => `    <p>${esc(p)}</p>`)}
  </div>
</section>`,

    project.sections?.length &&
      `<section class="wrap" aria-labelledby="contrib-heading">
  <div class="section__head" style="margin-bottom:0">
    <h2 class="section__title" id="contrib-heading">My contributions</h2>
    <p class="section__note">${esc((project.roles || []).join(' · '))}</p>
  </div>
${list(project.sections, (s, i) => block(s, i, base))}
</section>`,

    project.process?.length &&
      `<section class="wrap" aria-labelledby="process-heading">
  <div class="section__head" style="margin-bottom:0">
    <h2 class="section__title" id="process-heading">Design process</h2>
  </div>
${list(project.process, (s, i) => block(s, i, base))}
</section>`,

    project.gallery?.items?.length &&
      `<section class="wrap section" style="padding-block:clamp(2.5rem,5vw,4rem)">
  <div class="section__head">
    <h2 class="section__title">${esc(project.gallery.title || 'Gallery')}</h2>
  </div>
  <div class="media gallery-grid">
${list(project.gallery.items, (m) => figure(m, base))}
  </div>
</section>`,

    // Results comes from `highlights`; `outcomes` is the older field and is
    // still honoured for any project that uses it instead.
    (project.highlights?.length || project.outcomes?.length) &&
      `<section class="wrap section" style="padding-block:0 clamp(2.5rem,5vw,4rem)">
  <div class="section__head">
    <h2 class="section__title">Results</h2>
  </div>
${
  project.highlights?.length
    ? highlights(project)
    : `  <ul class="outcomes">
${list(project.outcomes, (o) => `    <li>${esc(o)}</li>`)}
  </ul>`
}
</section>`,

    project.credits &&
      `<section class="wrap section" style="padding-block:0 clamp(2.5rem,5vw,4rem)">
  <div class="section__head"><h2 class="section__title">Credits</h2></div>
  <div class="prose">
    ${project.credits.text ? `<p>${esc(project.credits.text)}</p>` : ''}
    ${
      project.credits.items?.length
        ? `<ul class="bullets">\n${list(project.credits.items, (c) => `      <li>${esc(c)}</li>`)}\n    </ul>`
        : ''
    }
  </div>
</section>`,

    project.links?.length &&
      `<section class="wrap section" style="padding-block:0 clamp(2rem,4vw,3rem)">
  <div class="section__head"><h2 class="section__title">Links</h2></div>
  <div class="btn-row">
${list(
  project.links,
  (l) =>
    `    <a class="btn${l.primary ? ' btn--primary' : ''}" href="${escUrl(l.href)}" target="_blank" rel="noopener">${esc(
      l.label
    )}</a>`
)}
  </div>
</section>`,

    (prev || next) &&
      `<nav class="wrap pager" aria-label="More projects">
  ${
    prev
      ? `<a href="${escUrl(base + prev.url)}"><span class="label">Previous</span><strong>${esc(prev.title)}</strong></a>`
      : ''
  }
  ${
    next
      ? `<a class="pager__next" href="${escUrl(base + next.url)}"><span class="label">Next</span><strong>${esc(
          next.title
        )}</strong></a>`
      : ''
  }
</nav>`,
  ]);

  return layout({
    profile,
    base,
    current: 'work',
    title: `${project.title} — ${profile.name}`,
    description: project.subtitle || project.summary || project.overview?.[0] || project.title,
    path: project.url,
    ogImage: (project.hero || project.thumbnail)?.src,
    main,
  });
}

/* --------------------------------------------------------------- 404 page */

export function notFoundPage(ctx) {
  const { profile, base = '' } = ctx;
  return layout({
    profile,
    base,
    current: null,
    title: `Page not found — ${profile.name}`,
    description: 'The page you were looking for does not exist.',
    path: '404.html',
    main: `<section class="wrap error-page">
  <p class="label">Error 404</p>
  <h1>Page not found</h1>
  <p>That page has moved or never existed.</p>
  <div class="btn-row">
    <a class="btn btn--primary" href="${escUrl(base + 'index.html')}">Home</a>
    <a class="btn" href="${escUrl(base + 'projects.html')}">All work</a>
  </div>
</section>`,
  });
}

/** Static redirect page for an old URL. */
export function redirectPage(target, title) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<link rel="canonical" href="${escUrl(target)}">
<meta http-equiv="refresh" content="0; url=${escUrl(target)}">
<meta name="robots" content="noindex">
</head>
<body>
<p>This page has moved to <a href="${escUrl(target)}">${esc(title)}</a>.</p>
</body>
</html>
`;
}
