let body = document.querySelector("body")
let btnOpenMenu = document.querySelector(".open-menu")
let btnCloseMenu = document.querySelector(".close-menu")
let toggleContent = document.querySelector(".welcome .content")
let arrAncor = document.querySelectorAll(".main-menu a")
let checkboxMenu = document.querySelector("#toggle")
btnOpenMenu.addEventListener("click", function (event) {
    toggleContent.classList.add("hiddenSlow")

})

btnCloseMenu.addEventListener("click", function (event) {
    toggleContent.classList.remove("hiddenSlow")
})





body.addEventListener("click", function (event) {


    if (event.target.tagName != "nav" && event.target.tagName != "LABEL" && event.target.tagName != "INPUT") {
        toggleContent.classList.remove("hiddenSlow");
        checkboxMenu.checked = false;

    }

})