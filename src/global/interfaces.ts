export interface Book {
  [key: string]: string | number | undefined;
  id: number;
  author: string;
  title: string;
  cover: string;
  description?: string;
  genre?: string;
  epoch?: string;
  kind?: string;
}
