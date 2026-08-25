export interface Project {
  /** Display name of the project. */
  name: string;
  /** Short, one-line description. */
  description: string;
  /** Live/demo URL (optional). */
  url?: string;
  /** Repository URL (optional). */
  repo?: string;
  /** Tech / topic tags. */
  tags: string[];
  /** Pin to top of the list. */
  featured?: boolean;
  /** Year the project was published or last updated. */
  year?: number;
}

/**
 * Manual list of public projects shown on the home page.
 * Add a new entry by copying an object below and editing its fields.
 */
export const projects: Project[] = [
  {
    name: 'Caption Gram',
    description:
      'A web app for extracting captions from Instagram, YouTube, and Facebook posts, with optional Telegram notifications.',
    repo: 'https://github.com/nnivxix/caption-gram',
    tags: ['Nuxt', 'Vue', 'TypeScript'],
    featured: true,
    url: "https://caption-gram.hanasalabs.id/",
    year: 2026,
  },
  {
    name: 'YT CC Copy',
    description:
      'A browser extension that copies YouTube closed captions (CC) to the clipboard and saves them as per-video notes.',
    repo: 'https://github.com/nnivxix/yt-cc-copy',
    tags: ['WXT', 'Vue', 'TypeScript'],
    url: "https://yt-cc-copy.hanasalabs.id/",
    featured: true,
    year: 2026,
  },
  {
    name: 'PickPic',
    description:
      'Seamless Unsplash image exploration with instant markdown code generation for your content.',
    repo: 'https://github.com/nnivxix/pickpic',
    url: "https://pickpic.hanasalabs.id/",
    tags: ['Nuxt', 'Vue', 'TypeScript'],
    year: 2026,
  },
  {
    name: 'LinearClipper',
    description:
      'A browser extension that streamlines copying and pasting issue links from Linear.app as Markdown.',
    repo: 'https://github.com/nnivxix/linear-clipper',
    tags: ['WXT', 'Vue', 'TypeScript'],
    year: 2026,
  },
  {
    name: 'Vilm',
    description:
      'A Next.js movie discovery app powered by the TMDB API.',
    repo: 'https://github.com/nnivxix/vilm',
    url: "https://vilm.hanasalabs.id/",
    tags: ['Next.js', 'React', 'TypeScript'],
    year: 2025,
  },
];
