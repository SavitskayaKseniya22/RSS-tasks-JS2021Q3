import { CallbackType, DataContent } from "../../types";

class Loader {
  private baseLink: string;
  private options: Record<string, string>;

  constructor(baseLink: string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint = "string", options = {} },
    callback: CallbackType<DataContent> = () => {
      console.error("No callback for GET response");
    },
  ) {
    this.load("GET", endpoint, callback, options);
  }

  public errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  public makeUrl(options: Record<string, string>, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  public load(method: string, endpoint: string, callback: CallbackType<DataContent>, options: Record<string, string>) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
