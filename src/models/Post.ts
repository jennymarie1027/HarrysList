import { File } from './File';

export interface Post {
  _id: string;
  authorId: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image?: string;
  file: File[];
  location: string;
  postCreated: Date
  isFave?: boolean
}
