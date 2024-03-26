export interface Post {
  _id: string,
  authorId: string,
  title: string,
  price: string,
  category: string,
  description: string,
  image?: string
  file?: string
}