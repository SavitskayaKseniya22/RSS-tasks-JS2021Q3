function printStructure() {
  return `<header class="header">
  <h2>Async race</h2>
  </header>
  <main class="main"></main>
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

document.querySelector("body").innerHTML = printStructure();
