let compSlider = document.querySelector(".img-comp-slider")
let imgAfter = document.querySelector(".imgAfter")
let compSliderContainer = document.querySelector(".img-comp-container")

imgAfter.style.width = compSlider.offsetLeft + 20 + "px"


compSlider.onmousedown = function (event) {
    event.preventDefault();

    let shiftX = event.clientX - compSlider.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - compSliderContainer.getBoundingClientRect().left;
        if (newLeft < -20) { //0
            newLeft = -20;
        }
        let rightEdge = compSliderContainer.offsetWidth - compSlider.offsetWidth + 20; //-20
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        compSlider.style.left = newLeft + 'px';
        imgAfter.style.width = compSlider.offsetLeft + 20 + "px"
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

compSlider.ondragstart = function () {
    return false;
};