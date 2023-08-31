export interface IPicture {
  id?: number;
  imageURL?: string | null;
  caption?: string | null;
}

export const defaultValue: Readonly<IPicture> = {};
