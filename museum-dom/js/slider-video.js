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
    /*let sources = videoPlayer.querySelectorAll("source")
    sources[0].src = "assets/video/video1.mp4"
    sources[1].src = "assets/video/video1.webm"
    let div = document.createElement('video');
    div.id = "video-player";
    div.width = "1440";
    div.height = "650";

    let source1 = document.createElement('source');
    source1.src = "assets/video/video1.mp4";
    div.append(source1)
    videoPlayer.append(div)*/

    let sources = videoPlayer.querySelectorAll("source")
    sources[0].src = "assets/video/video" + event.to + ".mp4"
    sources[1].src = "assets/video/video" + event.to + ".webm"
    videoPlayer.poster = "assets/video/poster" + event.to + ".jpg"
    videoPlayer.load()
    buttonPlay.style.visibility = "visible";
    playerRemotePlay.style.backgroundImage = "url(assets/svg/play.svg)";
    buttonPlay.after(videoPlayer)


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
//player.stopVideo()
// onStateChange
let videoItems = document.querySelectorAll("#video-slider .carousel-item iframe")

for (const item of videoItems) {
    item.onStateChange = function () {
        alert(1)
    }

}