import { ISources } from "../view/sources/sources";

class Loader {
  baseLink: string;
  options: { [key: string]: string };

  constructor(baseLink: string, options: { [key: string]: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint = "string", options = {} },
    callback: CallbackType<IData> = () => {
      console.error("No callback for GET response");
    },
  ) {
    this.load("GET", endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: { [key: string]: string }, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: CallbackType<IData>, options: { [key: string]: string }) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;

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
