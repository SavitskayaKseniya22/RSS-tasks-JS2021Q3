const header = document.querySelector("header");

export class ControlPanel {
  constructor() {}
  printControlPanel() {
    return `<div class="control-panel">
    <div class="create">
      <input type="text" />
      <input type="color" />
      <button>Create</button>
    </div>

    <div class="update">
      <input type="text" />
      <input type="color" />
      <button>Update</button>
    </div>

    <ul class="control-buttons">
      <li><button>Race</button></li>
      <li><button>Reset</button></li>
      <li><button>Generate cars</button></li>
    </ul>
  </div>`;
  }
}
header.innerHTML += new ControlPanel().printControlPanel();
