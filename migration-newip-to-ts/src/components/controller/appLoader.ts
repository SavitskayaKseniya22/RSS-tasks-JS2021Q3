import Loader from "./loader";

class AppLoader extends Loader {
  constructor() {
    super("https://newsapi.org/v2/", {
      apiKey: "4731d8760b9a4d0dbc5655c35005a37d",
    });
  }
}

export default AppLoader;
