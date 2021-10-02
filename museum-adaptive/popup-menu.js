let btnOpenMenu = document.querySelector(".open-menu")
let btnCloseMenu = document.querySelector(".close-menu")
let toggleContent = document.querySelector(".welcome .content")

btnOpenMenu.addEventListener("click", function (event) {
    toggleContent.classList.add("hidden")

})

btnCloseMenu.addEventListener("click", function (event) {
    toggleContent.classList.remove("hidden")
})