export interface Template {
  id?: string;
  name: string;
  slug: string;
  collectionSlug?: string;
  [key: string]: unknown;
}
