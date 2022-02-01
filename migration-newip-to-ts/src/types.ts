export type CallbackType<T> = (data: T) => void;

export interface DataContent {
  articles: ArticleContent[];
  sources: SourceContent[];
}

export interface ArticleContent {
  source: SourceContent;
  urlToImage: string;
  author: string;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

export interface SourceContent {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
