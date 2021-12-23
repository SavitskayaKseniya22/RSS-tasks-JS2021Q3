export type Toy = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

export class Card {
  src: string;
  element: string;
  favoriteString: string;
  selection: boolean;
  toyData: Toy;

  constructor(toy: Toy) {
    this.selection = false;
    this.toyData = toy;
    this.toyData.favorite ? (this.favoriteString = "да") : (this.favoriteString = "нет");
  }
  renderHTML() {
    return `<div class="toy-item" data-num=${this.toyData.num} data-selection=${this.selection}>
    <h4 class="small-title">${this.toyData.name}</h4>
    <img class="toy-image" src=${`./assets/toys/${this.toyData.num}.png`} alt="toy" />
    <ul>
      <li>Количество: <span class="count-toy">${this.toyData.count}</span></li>
      <li>Год покупки: <span class="year-toy">${this.toyData.year}</span></li>
      <li>Форма: <span class="shape-toy">${this.toyData.shape}</span></li>
      <li>Цвет: <span class="color-toy">${this.toyData.color}</span></li>
      <li>Размер: <span class="size-toy">${this.toyData.size}</span></li>
      <li>Любимая: <span class="favorite-toy">${this.favoriteString}</span></li>
    </ul>
    <img class="star-image" src="./assets/svg/star-empty.svg" alt="star" />
  </div>`;
  }
  renderSelectionHTML() {
    return `<div class="toy-item toy-item_selected" data-num=${this.toyData.num}>
    <h4 class="small-title">${this.toyData.name}</h4>
    <img class="toy-image" src=${`./assets/toys/${this.toyData.num}.png`} alt="toy" />
    <div><span class="count-toy">${this.toyData.count}</span></div>
    <button class="remove-selection"><img src="./assets/svg/close-white.svg" alt="close" /></button>
  </div>`;
  }
}