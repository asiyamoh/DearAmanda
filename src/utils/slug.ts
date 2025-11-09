/**
 * Generates a URL-friendly slug from a topic name
 * @param name - The topic name to convert to a slug
 * @returns A URL-friendly slug (e.g., "Self-Love" → "self-love")
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
