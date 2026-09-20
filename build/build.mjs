/**
 * Static site build.
 *
 *   node build/build.mjs      (or: npm run build)
 *
 * Reads content/profile.mjs + every content/projects/*.mjs, writes plain HTML
 * to the repository root so GitHub Pages can serve it as-is. No dependencies.
 */
import { readdirSync, existsSync, writeFileSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { imageSize } from './lib/image-size.mjs';
import { homePage, workPage, aboutPage, projectPage, notFoundPage, redirectPage, layout } from './render.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const OUT_PROJECTS = path.join(ROOT, 'projects');

/** Section headings used to group projects on the Work page. */
const GROUPS = {
  games: 'Games',
  'design-work': 'Design Work',
};

const warnings = [];
const warn = (msg) => warnings.push(msg);

/** Files already reported as oversized, so each one is only mentioned once. */
const oversized = new Set();

/* ----------------------------------------------------------------- loading */

async function loadModule(file) {
  const mod = await import(pathToFileURL(file).href);
  return mod.default;
}

async function loadProjects() {
  const dir = path.join(CONTENT, 'projects');
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.mjs') && !f.startsWith('_'))
    .sort();

  const projects = [];
  for (const file of files) {
    const data = await loadModule(path.join(dir, file));
    if (!data?.slug) throw new Error(`content/projects/${file} is missing a "slug".`);
    if (!data?.title) throw new Error(`content/projects/${file} is missing a "title".`);
    projects.push({
      order: 100,
      featured: false,
      group: 'games',
      hasPage: true,
      hidden: false,
      archived: false,
      aliases: [],
      sourceFile: `content/projects/${file}`,
      ...data,
      url: `projects/${data.slug}.html`,
    });
  }

  const seen = new Set();
  for (const p of projects) {
    if (seen.has(p.slug)) throw new Error(`Duplicate slug "${p.slug}" in ${p.sourceFile}.`);
    seen.add(p.slug);
    if (!GROUPS[p.group]) warn(`${p.sourceFile}: unknown group "${p.group}" (known: ${Object.keys(GROUPS).join(', ')}).`);
  }

  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/* ------------------------------------------------------------------- media */

/** Attach intrinsic width/height, and report anything missing from disk. */
function resolveMedia(media, where) {
  if (!media) return media;

  // A YouTube clip inside a section: { youtube: 'url', poster, caption }
  if (media.youtube) {
    const id = youtubeId(media.youtube);
    if (!id) {
      warn(`${where}: could not read a YouTube video id from "${media.youtube}" — skipped.`);
      return null;
    }
    const poster = media.poster ? resolveMedia({ src: media.poster, alt: '' }, `${where} (poster)`) : null;
    return { ...media, youtubeId: id, poster: poster?.src, width: poster?.width, height: poster?.height };
  }

  const file = media.src || media.poster;
  if (media.video && !existsSync(path.join(ROOT, media.video))) {
    warn(`${where}: video not found — ${media.video}`);
  }
  if (!file) return media;
  const abs = path.join(ROOT, file);
  if (!existsSync(abs)) {
    warn(`${where}: image not found — ${file}`);
    return media;
  }
  // `alt: ''` is a deliberate "decorative image" marker; only a missing alt
  // attribute is a problem.
  if (media.alt === undefined && !media.video) warn(`${where}: image has no alt text — ${file}`);

  const bytes = statSync(abs).size;
  if (bytes > 1_500_000 && !oversized.has(file)) {
    oversized.add(file);
    warn(`${file} is ${(bytes / 1_048_576).toFixed(1)} MB — resize or re-export it to keep the page fast (${where}).`);
  }
  const size = imageSize(abs);
  if (!size) warn(`${where}: could not read image dimensions — ${file}`);
  return size && media.src ? { ...media, ...size } : media;
}

/** Pull the video id out of any normal YouTube URL (or accept a bare id). */
function youtubeId(src = '') {
  const patterns = [
    /(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)([\w-]{6,})/,
    /youtu\.be\/([\w-]{6,})/,
    /^([\w-]{6,})$/,
  ];
  for (const re of patterns) {
    const match = src.match(re);
    if (match) return match[1];
  }
  return null;
}

/**
 * Normalise an optional trailer entry into a media object the templates can
 * render. Supports { type: 'youtube' | 'mp4' | 'video', src, poster, title }.
 * Returns null when the project has no trailer — no empty player is rendered.
 */
function resolveTrailer(trailer, project, where) {
  if (!trailer) return null;
  const title = trailer.title || 'Gameplay trailer';
  const type = trailer.type || (youtubeId(trailer.src || '') ? 'youtube' : 'mp4');

  if (type === 'youtube') {
    const id = youtubeId(trailer.src || '');
    if (!id) {
      warn(`${where}: trailer is marked as YouTube but no video id could be read from "${trailer.src}" — skipped.`);
      return null;
    }
    // Falls back to the project's own cover art as the click-to-play poster.
    // `poster: null` opts out, keeping the video's own thumbnail instead —
    // useful when the cover art is a logo rather than real footage.
    const posterSrc =
      trailer.poster === null ? null : trailer.poster || project.hero?.src || project.thumbnail?.src;
    const poster = posterSrc ? resolveMedia({ src: posterSrc, alt: '' }, `${where} › trailer poster`) : null;
    return { youtubeId: id, title, poster: poster?.src, width: poster?.width, height: poster?.height };
  }

  if (!trailer.src) {
    warn(`${where}: trailer has no "src" — skipped.`);
    return null;
  }
  if (!existsSync(path.join(ROOT, trailer.src))) {
    warn(`${where}: trailer video not found — ${trailer.src}`);
    return null;
  }
  const posterSrc = trailer.poster || project.hero?.src || project.thumbnail?.src;
  return { video: trailer.src, title, poster: posterSrc };
}

function resolveProjectMedia(project) {
  const where = project.sourceFile;
  const out = { ...project };
  out.thumbnail = resolveMedia(project.thumbnail, where);
  out.hero = resolveMedia(project.hero, where);
  out.trailer = resolveTrailer(project.trailer, project, where);
  if (!out.thumbnail?.src && out.hero?.src) out.thumbnail = out.hero;
  if (!out.thumbnail?.src && !out.cardImage?.src) {
    warn(`${where}: no artwork yet — the project card uses the text-only layout.`);
  }

  const resolveBlocks = (blocks, kind) =>
    (blocks || []).map((s) => ({
      ...s,
      media: (s.media || []).map((m) => resolveMedia(m, `${where} › ${kind}${s.title}`)).filter(Boolean),
    }));
  out.sections = resolveBlocks(project.sections, '');
  out.process = resolveBlocks(project.process, 'design process › ');

  if (project.gallery?.items?.length) {
    out.gallery = {
      ...project.gallery,
      items: project.gallery.items.map((m) => resolveMedia(m, `${where} › gallery`)).filter(Boolean),
    };
  }

  for (const link of project.links || []) {
    if (!link.href || !/^(https?:|mailto:|\/|\.)/i.test(link.href)) {
      warn(`${where}: link "${link.label}" has a placeholder or invalid URL (${link.href}) — it was still rendered.`);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ output */

function write(relPath, html) {
  const abs = path.join(ROOT, relPath);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, html, 'utf8');
  return relPath;
}

function sitemap(profile, pages) {
  const origin = profile.siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url>\n    <loc>${origin}/${p.replace(/^index\.html$/, '').replace(/ /g, '%20')}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/* -------------------------------------------------------------------- main */

async function main() {
  const profile = await loadModule(path.join(CONTENT, 'profile.mjs'));
  const rawProjects = await loadProjects();
  const projects = rawProjects.map(resolveProjectMedia);

  // The resume link only renders when the file actually exists.
  profile.resumeHref = profile.resume && existsSync(path.join(ROOT, profile.resume)) ? profile.resume : null;
  if (profile.resume && !profile.resumeHref) {
    warn(`Resume not found at ${profile.resume} — every résumé link is omitted. Drop the PDF there and rebuild.`);
  }
  profile.social = (profile.social || []).filter((s) => s.href);

  // Profile photograph: use the real portrait when it exists, otherwise fall
  // back to the avatar already in the repository and say so.
  if (profile.photo?.src) {
    if (!existsSync(path.join(ROOT, profile.photo.src))) {
      const fallback = profile.photo.fallback;
      if (fallback && existsSync(path.join(ROOT, fallback))) {
        warn(
          `Profile photo not found at ${profile.photo.src} — using ${fallback} for now. ` +
            `Save your portrait as ${profile.photo.src} and rebuild to replace it.`
        );
        profile.photo = { ...profile.photo, src: fallback };
      } else {
        warn(`Profile photo not found at ${profile.photo.src} — the About Me portrait is omitted.`);
        profile.photo = null;
      }
    }
    profile.photo = resolveMedia(profile.photo, 'content/profile.mjs');
  }

  // `hidden` projects keep their content and page but are left out of the
  // homepage, the Work page, the previous/next pager and the sitemap.
  // `archived` projects are removed from the site entirely — no page is
  // generated at all — while their content file stays in the repository.
  const listed = projects.filter((p) => !p.hidden && !p.archived);
  const archived = projects.filter((p) => p.archived);
  const ctx = { profile, projects: listed, groups: GROUPS, base: '' };
  const written = [];

  // Remove stale generated project pages (files no longer backed by content).
  const expected = new Set();
  for (const p of projects) {
    if (p.archived) continue;
    if (p.hasPage !== false) expected.add(path.basename(p.url));
    for (const alias of p.aliases) expected.add(path.basename(alias));
  }
  if (existsSync(OUT_PROJECTS)) {
    for (const file of readdirSync(OUT_PROJECTS)) {
      if (file.endsWith('.html') && !expected.has(file)) {
        rmSync(path.join(OUT_PROJECTS, file));
        console.log(`  removed stale  projects/${file}`);
      }
    }
  }

  written.push(write('index.html', homePage(ctx)));
  written.push(write('projects.html', workPage(ctx)));
  written.push(write('about.html', aboutPage(ctx)));
  write('404.html', notFoundPage(ctx));

  const pageable = projects.filter((p) => p.hasPage !== false && !p.archived);
  const pager = pageable.filter((p) => !p.hidden);
  pageable.forEach((project) => {
    const i = pager.indexOf(project);
    const prev = i > 0 ? pager[i - 1] : undefined;
    const next = i >= 0 ? pager[i + 1] : undefined;
    written.push(write(project.url, projectPage({ ...ctx, base: '../' }, project, prev, next)));
    for (const alias of project.aliases || []) {
      // Windows checkouts are case-insensitive, so an alias that differs from
      // the real page only by capitalisation would overwrite that page.
      if (alias.toLowerCase() === project.url.toLowerCase()) {
        warn(
          `${project.sourceFile}: alias "${alias}" differs from "${project.url}" only by case — skipped. ` +
            `Set the slug to the exact old filename instead of using an alias.`
        );
        continue;
      }
      const depth = alias.split('/').length - 1;
      const target = '../'.repeat(depth) + project.url;
      write(alias, redirectPage(target, project.title));
      console.log(`  redirect       ${alias} → ${project.url}`);
    }
  });

  // GitHub Pages: skip Jekyll so filenames with spaces/underscores are served verbatim.
  write('.nojekyll', '');
  const hiddenUrls = new Set(projects.filter((p) => p.hidden).map((p) => p.url));
  write('sitemap.xml', sitemap(profile, written.filter((p) => !hiddenUrls.has(p))));
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${profile.siteUrl.replace(/\/$/, '')}/sitemap.xml\n`);

  for (const p of archived) console.log(`  archived       ${p.sourceFile} — kept in the repo, not published`);

  console.log(
    `\nBuilt ${written.length} pages (${pageable.length} project pages) from ${projects.length} projects` +
      `${archived.length ? `, ${archived.length} archived` : ''}.`
  );
  for (const page of written) console.log(`  ✓ ${page}${hiddenUrls.has(page) ? '   (hidden from listings)' : ''}`);

  if (warnings.length) {
    console.log(`\n${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`);
    for (const w of warnings) console.log(`  ! ${w}`);
  } else {
    console.log('\nNo warnings.');
  }
}

main().catch((err) => {
  console.error(`\nBuild failed: ${err.message}\n`);
  process.exit(1);
});
