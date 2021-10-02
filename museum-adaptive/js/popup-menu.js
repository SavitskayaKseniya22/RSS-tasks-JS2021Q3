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
/*
for (let i = 0; i < arrAncor.length; i++) {
    arrAncor[i].addEventListener("click", function (event) {
        toggleContent.classList.remove("hiddenSlow");
        checkboxMenu.setAttribute("checked", "false")

    })
}
*/