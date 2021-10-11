let buyButton = document.querySelector(".buyButton")
let cross = document.querySelector(".close-cross")
let modal = document.querySelector(".booking-tickets")

buyButton.addEventListener("click", function (event) {
    modal.classList.remove("toggleVis")
    modal.style.left = "0";
    modal.style.top = "0"
})

cross.addEventListener("click", function (event) {
    modal.classList.add("toggleVis");
    modal.style.left = "calc(-100vw)";

})


modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("booking-tickets")) {
        modal.classList.add("toggleVis")
        modal.style.left = "calc(-100vw)"
    }


})
console.log("Вёрстка соответствует макету. Ширина экрана 1024px +40; Вёрстка соответствует макету. Ширина экрана 768 px + 40; Вёрстка соответствует макету. Ширина экрана 420 px + 40; На ширине экрана 1024 рх и меньше реализовано адаптивное меню + 12; Ни на одном из разрешений до 320 px включительно не появляется горизонтальная полоса прокрутки + 6 / НЕТ + 0; Совмещается адаптивная и респонсивная(резиновая) вёрстка + 14 / НЕТ + 0; Оптимизация скорости загрузки страницы + 8 / НЕТ + 0 132 / 150")