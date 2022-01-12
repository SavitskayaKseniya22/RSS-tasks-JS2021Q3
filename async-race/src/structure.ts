export class Structure {
  structure: string;
  constructor(container: HTMLElement) {
    container.innerHTML = this.printStructure();
  }
  printStructure() {
    return `<header class="header">
  <h1>Async race</h1>
  </header>
  <main class="main">
  <ul class="cars-container">
  </ul>
  
  
  </main>
  <footer class="footer">
    <div>
      <a href="https://rs.school/js/" target="_blank">
        <img src="./images/rs-school-js.svg" alt="link" width="100" />
      </a>
    </div>
    <div>
      <a href="https://github.com/SavitskayaKseniya22" target="_blank"> made by Kseniya Savitskaya </a>
    </div>
    <div>© 2021</div>
  </footer>`;
  }
}
