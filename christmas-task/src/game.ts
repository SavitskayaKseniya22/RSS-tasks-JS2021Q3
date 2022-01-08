import { ToyCard } from "./toyCard";
import { data } from "./data";
import { Snow } from "./snow";
import { Music } from "./music";
import { Bg } from "./background";

export function saveSettings(prop: string, value: string | boolean) {
  let gameSettings = JSON.parse(window.localStorage.getItem("gameSettings"));
  gameSettings ? gameSettings : (gameSettings = gameDefault);
  gameSettings[prop] = value;
  window.localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
}

export interface GameTypes {
  music: boolean;
  snow: boolean;
  tree: string;
  bg: string;
  garland: boolean;
  garlandType: string;
}

const gameDefault = {
  music: false,
  snow: false,
  bg: "bg1",
  tree: "1",
  garland: false,
  garlandType: "5",
};

class Game {
  tree: string;
  garland: boolean;
  garlandType: string;
  treeCollection: NodeListOf<Element>;
  checkboxGarland: HTMLInputElement;
  garlandButtons: NodeListOf<Element>;
  doneList: HTMLUListElement;
  selectionsContainer: HTMLUListElement;

  constructor(game = gameDefault) {
    this.tree = game.tree;
    this.garland = game.garland;
    this.garlandType = game.garlandType;

    this.treeCollection = document.querySelectorAll("input[name='tree']");
    this.checkboxGarland = document.querySelector(".garland-enabler");
    this.garlandButtons = document.querySelectorAll("input[name='garland']");
    this.selectionsContainer = document.querySelector(".selection-options ul");
    this.doneList = document.querySelector(".done-list");

    new Snow(game);
    new Music(game);
    new Bg(game);
    this.restoreSettings(game);

    this.checkboxGarland.addEventListener("change", () => {
      this.changeGarland(this.checkboxGarland.checked, this.garlandType);
    });

    this.garlandButtons.forEach((element) => {
      element.addEventListener("click", () => {
        this.changeGarland(
          this.checkboxGarland.checked,
          (document.querySelector('input[name="garland"]:checked') as HTMLInputElement).value,
        );
      });
    });

    this.treeCollection.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeTree((e.target as HTMLInputElement).value);
      });
    });

    document.querySelector(".reset-storage")?.addEventListener("click", () => {
      this.restoreSettings(game);
      this.printSelection();
    });

    document.querySelector(".clear-tree")?.addEventListener("click", () => {
      window.localStorage.removeItem("savedTrees");
      this.doneList.innerHTML = "";
    });

    document.querySelector(".save-tree")?.addEventListener("click", () => {
      const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
      const savedTree = document.createElement("li");
      savedTree.className = `bg ${gameSettings.bg}`;
      savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
      this.doneList.append(savedTree);

      if (window.localStorage.getItem("savedTrees")) {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
        savedTrees.push(gameSettings);
        window.localStorage.setItem("savedTrees", JSON.stringify(savedTrees));
      } else {
        window.localStorage.setItem("savedTrees", JSON.stringify([gameSettings]));
      }

      savedTree.addEventListener("click", () => {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
        const num = savedTree.getAttribute("data-num");
        const data = savedTrees[Number(num)];
        this.restoreSettings(data);
      });
    });

    if (window.localStorage.getItem("savedTrees")) {
      const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees")) as GameTypes[];
      for (let i = 0; i <= savedTrees.length - 1; i++) {
        const savedTree = document.createElement("li");
        savedTree.className = `bg ${savedTrees[i].bg}`;
        savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
        this.doneList.append(savedTree);
        savedTree.addEventListener("click", () => {
          const num = savedTree.getAttribute("data-num");
          const data = savedTrees[Number(num)];
          this.restoreSettings(data);
        });
      }
    }
  }

  changeGarland(value: boolean, index: string) {
    this.garland = value;
    this.garlandType = index;
    saveSettings("garland", this.garland);
    saveSettings("garlandType", this.garlandType);
    const i = Number(index) - 1;
    this.removeGarland();
    if (this.garland) {
      this.checkboxGarland.checked = true;
      (this.garlandButtons[i] as HTMLInputElement).checked = true;
      const className = (this.garlandButtons[i] as HTMLInputElement).getAttribute("data-color");
      const treeContainer = document.querySelector(".tree-container");
      const garlandContainer = document.createElement("div");
      garlandContainer.className = "garland-container";
      garlandContainer.innerHTML += this.printGarland(className);
      treeContainer.append(garlandContainer);
    } else {
      this.checkboxGarland.checked = false;
      (this.garlandButtons[i] as HTMLInputElement).checked = false;
    }
  }
  removeGarland() {
    this.garlandButtons.forEach((element) => {
      (element as HTMLInputElement).checked = false;
    });
    document.querySelector(".garland-container")?.remove();
  }
  printGarland(className: string) {
    return `<ul id="garland-block-first" class="garland-block">
    ${`<li class=${className}></li>`.repeat(8)}
    
  </ul>
  <ul id="garland-block-second" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
  
  </ul>
  <ul id="garland-block-third" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
  
  </ul>
  <ul id="garland-block-fourth" class="garland-block">
 ${`<li class=${className}></li>`.repeat(8)}
    
  </ul>
  <ul id="garland-block-fifth" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
    
  </ul>
  
  `;
  }

  changeTree(value: string) {
    this.tree = value;
    (document.querySelector(`input[value="${value}"]`) as HTMLInputElement).checked = true;

    saveSettings("tree", this.tree);

    const treeImg = document.querySelector(".tree-image") as HTMLImageElement;
    treeImg.src = `./assets/tree/${value}.png`;

    const mapTree = document.querySelector(".map-tree");
    mapTree.addEventListener(`dragover`, (e) => {
      e.preventDefault();
    });

    mapTree.addEventListener("drop", (e) => {
      e.preventDefault();
      const activeElement = document.querySelector(".selected") as HTMLElement;
      const count = activeElement.nextElementSibling?.textContent;
      if (Number(count) > 0) {
        const dupActiveElement = activeElement.cloneNode() as HTMLElement;
        dupActiveElement.classList.remove("selected");
        mapTree.append(dupActiveElement);
        this.setCoords(dupActiveElement, e, mapTree);
        activeElement.nextElementSibling.textContent = String(+count - 1);
        this.addSelectClassname(dupActiveElement);
        dupActiveElement.addEventListener("dblclick", () => {
          this.returnToy(dupActiveElement);
        });
      } else if (activeElement.parentElement.className === "map-tree") {
        this.setCoords(activeElement, e, mapTree);
      }
    });

    this.selectionsContainer.addEventListener(`dragover`, (e) => {
      e.preventDefault();
    });
    this.selectionsContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      const activeElement = document.querySelector(".selected") as HTMLElement;
      if (activeElement.parentElement.className === "map-tree") {
        this.returnToy(activeElement);
      }
    });

    this.printSelection();
  }

  returnToy(element: HTMLElement) {
    const num = element.getAttribute("data-num");
    const target = document.querySelector(`.toy-preview [data-num='${num}']`);
    element.remove();
    const count = target.nextElementSibling.textContent;
    target.nextElementSibling.textContent = String(+count + 1);
  }

  setCoords(element: HTMLElement, e: Event, block: Element) {
    const { pageX, pageY } = e as MouseEvent;
    element.style.left = ` ${pageX - (block.getBoundingClientRect().left + 20 + window.pageXOffset)}px`;
    element.style.top = `${pageY - (block.getBoundingClientRect().top + 20 + window.pageYOffset)}px`;
  }

  restoreSettings(game: GameTypes) {
    new Bg(game).changeBg(game.bg);
    new Snow(game).changeSnow(game.snow);
    this.changeGarland(game.garland, game.garlandType);
    this.changeTree(game.tree);
    new Music(game).changeMusic(game.music);
  }

  addSelectClassname(element: Element) {
    element.addEventListener("dragstart", (e: Event) => {
      (e.target as HTMLElement).classList.add("selected");
    });
    element.addEventListener("dragend", (e: Event) => {
      (e.target as HTMLElement).classList.remove("selected");
    });
  }
  printSelection() {
    const collectionList = document.querySelector(".selection-options ul");
    const collection = JSON.parse(window.localStorage.getItem("selection")) as number[];
    collectionList.innerHTML = "";

    if (collection && collection.length > 0) {
      collection.forEach((element) => {
        collectionList.innerHTML += new ToyCard(data[element - 1]).renderPreview();
      });
    } else {
      let i = 0;
      while (i < 20) {
        collectionList.innerHTML += new ToyCard(data[i]).renderPreview();
        i++;
      }
    }

    document.querySelectorAll(".toy-preview").forEach((element) => {
      this.addSelectClassname(element);
    });
  }
}

const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
gameSettings ? new Game(gameSettings) : new Game();