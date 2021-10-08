let videoSlider = document.getElementById('video-slider')

videoSlider.addEventListener('slid.bs.carousel', function (event) {
    let activeItem = document.querySelector(".carousel-inner .active")

    let videoSliderItems = document.querySelectorAll("#video-slider .carousel-item");
    for (const item of videoSliderItems) {
        item.style.display = "none"
    }
    //alert(event.from);
    //alert(event.to);
    //alert(event.direction)





    if (event.to == 3) {
        videoSliderItems[event.to].style.display = "block";
        videoSliderItems[event.to].style.order = "1"
        videoSliderItems[4].style.display = "block";
        videoSliderItems[4].style.order = "2"
        videoSliderItems[0].style.display = "block";
        videoSliderItems[0].style.order = "3"
    } else if (event.to == 4) {
        videoSliderItems[event.to].style.display = "block";
        videoSliderItems[event.to].style.order = "1"
        videoSliderItems[0].style.display = "block";
        videoSliderItems[0].style.order = "2"
        videoSliderItems[1].style.display = "block";
        videoSliderItems[1].style.order = "3"
    } else {
        videoSliderItems[event.to].style.display = "block";
        videoSliderItems[event.to].style.order = "1";
        videoSliderItems[event.to + 1].style.display = "block";
        videoSliderItems[event.to + 1].style.order = "2";
        videoSliderItems[event.to + 2].style.display = "block";
        videoSliderItems[event.to + 2].style.order = "3"
    }



})