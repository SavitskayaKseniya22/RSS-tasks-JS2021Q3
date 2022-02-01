import AppLoader from "./appLoader";
import { DataContent, CallbackType } from "../../types";

class AppController extends AppLoader {
  public getSources(callback: CallbackType<DataContent>) {
    super.getResp(
      {
        endpoint: "sources",
      },
      callback,
    );
  }

  public getNews(e: Event, callback: CallbackType<DataContent>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains("source__item")) {
        const sourceId = target.getAttribute("data-source-id") as string;
        if (newsContainer.getAttribute("data-source") !== sourceId) {
          newsContainer.setAttribute("data-source", sourceId);
          super.getResp(
            {
              endpoint: "everything",
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
