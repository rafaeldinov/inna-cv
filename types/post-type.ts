export type Item = {
  _id?: string;
  type: string;
  text?: string;
  src?: string;
};

export type AccessCookie = {
  access: string;
  expires: number;
};

export type PostType = {
  id: string;
  title: string;
  area: string;
  previewImageSrc: string;
  description: string;
  images?: string[];
  items: Item[];
};
