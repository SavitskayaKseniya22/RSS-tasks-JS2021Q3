let numOfSlide = document.querySelector("#numOfSlide")
let welcomeCarousel = document.getElementById('welcome-carousel')

function setNumOfSlide() {
    let activeSlide = document.querySelector(".gradient .active img");
    numOfSlide.textContent = activeSlide.getAttribute("alt")
}
setNumOfSlide()

welcomeCarousel.addEventListener('slid.bs.carousel', function () {
    setNumOfSlide()

})