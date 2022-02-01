export interface ISources {
  name: string;
  id: string;
}

export type CallbackType<T> = (data: T) => void;

export interface IData {
  articles: IArticle[];
  sources: ISource[];
}

export interface IArticle {
  source: ISources;
  urlToImage: string;
  author: string;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
