import "./sources.css";
import { SourceContent } from "../../../types";

class Sources {
  draw(data: SourceContent[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector("#sourceItemTemp") as HTMLTemplateElement;
    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      sourceClone.querySelector(".source__item-name")!.textContent = item.name;
      sourceClone.querySelector(".source__item")?.setAttribute("data-source-id", item.id);

      fragment.append(sourceClone);
    });
    document.querySelector(".sources")?.append(fragment);
  }
}

export default Sources;
