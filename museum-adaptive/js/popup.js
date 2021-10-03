let btn = document.querySelector(".btn-small")
let cross = document.querySelector(".close-cross")
let modal = document.querySelector(".booking-tickets")

btn.addEventListener("click", function (event) {
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