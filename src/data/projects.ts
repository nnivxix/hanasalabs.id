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
    name: 'Example Project',
    description: 'A short description of what this project does.',
    url: 'https://example.com',
    repo: 'https://github.com/nnivxix/example',
    tags: ['TypeScript', 'Astro'],
    featured: true,
    year: 2025,
  },
];
