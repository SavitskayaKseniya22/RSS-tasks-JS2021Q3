import "./news.css";
import { IArticle } from "../../../types";

class News {
  draw(data: IArticle[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector("#newsItemTemp") as HTMLTemplateElement;
    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      if (idx % 2) newsClone.querySelector(".news__item")!.classList.add("alt");
      (newsClone.querySelector(".news__meta-photo") as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || "img/news_placeholder.jpg"
      })`;
      newsClone.querySelector(".news__meta-author")!.textContent = item.author || item.source.name;
      newsClone.querySelector(".news__meta-date")!.textContent = item.publishedAt
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");

      newsClone.querySelector(".news__description-title")!.textContent = item.title;
      newsClone.querySelector(".news__description-source")!.textContent = item.source.name;
      newsClone.querySelector(".news__description-content")!.textContent = item.description;
      newsClone.querySelector(".news__read-more a")!.setAttribute("href", item.url);

      fragment.append(newsClone);
    });

    document.querySelector(".news")!.innerHTML = "";
    document.querySelector(".news")?.appendChild(fragment);
  }
}

export default News;
