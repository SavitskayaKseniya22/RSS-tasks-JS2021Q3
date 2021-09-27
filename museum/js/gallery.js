const pictureInnerContainer = document.querySelector('.picture-inner-container');
pictureInnerContainer.querySelectorAll('img').forEach(e => e.remove());
let arr = [];
for (let i = 1; i <= 15; i++) {
    arr.push("assets/img/galery/galery" + i + ".jpg")
}


function shuffle(array) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let result = [];

    while (array.length > 0) {
        let random = getRandomInt(0, array.length - 1);
        let elem = array.splice(random, 1)[0];
        result.push(elem);
    }

    return result;
}
arr = shuffle(arr)
for (let i = 0; i < arr.length; i++) {
    let img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = arr[i];
    img.alt = "gallery" + i;
    img.width = "456";
    pictureInnerContainer.append(img);
}