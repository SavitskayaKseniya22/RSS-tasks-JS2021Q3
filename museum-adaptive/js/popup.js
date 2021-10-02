let btn = document.querySelector(".btn-small")
let cross = document.querySelector(".close-cross")
let modal = document.querySelector(".booking-tickets")
btn.addEventListener("click", function (event) {
    modal.classList.remove("toggleVis")
    modal.style.left = "50%";
    modal.style.top = "50%"
})

cross.addEventListener("click", function (event) {
    modal.classList.add("toggleVis")
})