//play видео
let videoPlayerContainer = document.querySelector(".video-player");
let buttonPlay = document.querySelector(".buttonPlay")
let videoPlayer = document.querySelector("#video-player")
let playerRemotePlay = document.querySelector(".player-remote .play")

function playPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();

    } else {
        videoPlayer.pause();
    }
}

videoPlayer.addEventListener("play", function () {
    buttonPlay.style.visibility = "hidden";
    playerRemotePlay.style.backgroundImage = "url(assets/svg/pause.svg)"

})
videoPlayer.addEventListener("pause", function () {
    buttonPlay.style.visibility = "visible";
    playerRemotePlay.style.backgroundImage = "url(assets/svg/play.svg)";


})

buttonPlay.addEventListener("click", function () {
    playPause()
})

playerRemotePlay.addEventListener("click", function () {
    playPause()
})
videoPlayer.addEventListener("click", function () {
    playPause()
})
videoPlayer.addEventListener("durationchange", function () {

})


document.addEventListener("keydown", function (event) {
    if (event.code == "Space" && isVisible(videoPlayerContainer)) {
        event.preventDefault()
        playPause()
    } else if (event.code == "Space" && document.fullscreenElement) {
        event.preventDefault()
        playPause()
    }
})






//звук

let playerRemoteVolume = document.querySelector(".player-remote .volume");

function videoMute() {
    if (videoPlayer.muted && videoPlayer.volume > 0) {
        playerRemoteVolume.style.backgroundImage = "url(assets/svg/volume.svg)"
        videoPlayer.muted = false;
        volumeRange.value = videoPlayer.volume;

    } else {
        playerRemoteVolume.style.backgroundImage = "url(assets/svg/mute.svg)"
        videoPlayer.muted = true;
        volumeRange.value = 0;
    }
}
playerRemoteVolume.addEventListener("click", function () {
    videoMute()
})

document.addEventListener("keydown", function (event) {
    if (event.code == "KeyM" && isVisible(videoPlayerContainer)) {
        videoMute()
    }
})


let volumeRange = document.querySelector(".player-remote #volume");
volumeRange.min = 0;
volumeRange.max = 1;
volumeRange.step = 0.1
volumeRange.value = videoPlayer.volume;


volumeRange.addEventListener("input", function () {
    videoPlayer.volume = volumeRange.value;
    if (videoPlayer.volume == 0) {
        videoPlayer.muted = true;
        playerRemoteVolume.style.backgroundImage = "url(assets/svg/mute.svg)"
    } else {
        videoPlayer.muted = false;
        playerRemoteVolume.style.backgroundImage = "url(assets/svg/volume.svg)"
    }

})



//длительность и перемотка
let remoteRange = document.querySelector(".player-remote #remote");

videoPlayer.addEventListener("durationchange", function () {
    remoteRange.max = videoPlayer.duration;
    remoteRange.value = 0;
})

videoPlayer.addEventListener("timeupdate", function () {
    remoteRange.value = videoPlayer.currentTime
})
remoteRange.addEventListener("input", function () {
    videoPlayer.currentTime = remoteRange.value
})
// фулскрин


let playerRemotefullScreen = document.querySelector(".player-remote .fullScreen");

function addFullScreen() {
    if (!document.fullscreenElement) {
        videoPlayerContainer.requestFullscreen();
        playerRemotefullScreen.style.backgroundImage = "url(assets/svg/fullscreen_exit.svg)";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            playerRemotefullScreen.style.backgroundImage = "url(assets/svg/fullScreen.svg)"
        }
    }
}
playerRemotefullScreen.addEventListener("click", function () {
    addFullScreen()

})

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}


document.addEventListener("keydown", function (event) {
    if (event.code == "KeyF" && isVisible(videoPlayerContainer)) {
        addFullScreen()
    } else if (event.code == "KeyF") {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            playerRemotefullScreen.style.backgroundImage = "url(assets/svg/fullScreen.svg)"
        }
    }
})

// ускорение ролика/замедление

document.addEventListener("keydown", function (event) {
    if (event.code == "Comma" && event.shiftKey && isVisible(videoPlayerContainer)) {
        videoPlayer.playbackRate += 0.25;
        addSpeed((videoPlayer.playbackRate).toFixed(2))
    }
})
document.addEventListener("keydown", function (event) {
    if (event.code == "Period" && event.shiftKey && isVisible(videoPlayerContainer)) {
        videoPlayer.playbackRate -= 0.25
        addSpeed((videoPlayer.playbackRate).toFixed(2))
    }
})

function addSpeed(num) {
    if (document.querySelector(".pop-speed")) {
        popSpeed.remove()
    } else {
        let popSpeed = document.createElement('div');
        popSpeed.innerHTML = num;
        popSpeed.className = "pop-speed";
        videoPlayerContainer.append(popSpeed);
        setTimeout(() => popSpeed.remove(), 1000);
    }



}