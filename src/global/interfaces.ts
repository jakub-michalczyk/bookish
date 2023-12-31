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

export interface Modal {
  name: string;
  data: any;
  active: boolean;
}

export interface DataTableHeadingFields {
  name: string;
  active: boolean;
}
