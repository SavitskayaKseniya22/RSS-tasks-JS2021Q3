const pictureInnerContainer = document.querySelector('.picture-inner-container');
pictureInnerContainer.querySelectorAll('img').forEach(e => e.remove());
let arr = [];
for (let i = 1; i <= 15; i++) {
    arr.push("assets/img/galery/galery" + i + ".jpg")
}
let sourceArr = arr.slice()

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
    img.width = "441.1";
    img.style.opacity = "0";
    img.addEventListener("click", function (event) {

        let popDiv = document.createElement('div');
        popDiv.classList.add('popDiv')



        let index = sourceArr.indexOf(arr[i])


        let popDivTitle = document.createElement('h4');
        popDivTitle.classList.add('popDivTitle')
        popDivTitle.innerText = infoArts[index].title
        popDiv.append(popDivTitle)

        let popDivSpan = document.createElement('span');
        popDivSpan.classList.add('popDivSpan')
        popDivSpan.innerText = infoArts[index].autor
        popDiv.append(popDivSpan)

        let popDivP = document.createElement('p');
        popDivP.classList.add('popDivP')
        popDivP.innerText = infoArts[index].year
        popDiv.append(popDivP)

        let popDivA = document.createElement('a');
        popDivA.classList.add('popDivA')
        popDivA.innerText = "Go to Wiki";
        popDivA.href = infoArts[index].anchor;
        popDiv.append(popDivA)


        pictureInnerContainer.append(popDiv)





    })

    pictureInnerContainer.append(img);


}




function isVisible(elem) {
    return (elem.getBoundingClientRect().top < document.documentElement.clientHeight)
}

function showVisible() {
    for (let img of pictureInnerContainer.querySelectorAll('img')) {

        if (isVisible(img)) {
            img.style.opacity = "1";
            img.style.transform = "scaleX(1.02) translateY(-100px)";




        }
    }

}

function closeVisible() {
    for (let img of pictureInnerContainer.querySelectorAll('img')) {

        if (!isVisible(img)) {
            img.style.opacity = "0";
            img.style.transform = "none"


        }
    }

}

window.addEventListener('scroll', showVisible);
window.addEventListener('scroll', closeVisible);



let infoArts = [{
    title: "Psyche Revived by Cupid's Kiss",
    autor: "Antonio Canova",
    year: "1787—1793",
    anchor: "https://en.wikipedia.org/wiki/Psyche_Revived_by_Cupid%27s_Kiss"
}, {
    title: "Athena Mattei",
    autor: "Евфранор",
    year: "Unknown",
    anchor: "https://ru.wikipedia.org/wiki/%D0%90%D1%84%D0%B8%D0%BD%D0%B0_%D0%9C%D0%B0%D1%82%D1%82%D0%B5%D0%B8"
}, {
    title: "Dying Slave",
    autor: "Michelangelo",
    year: "between 1513 and 1516",
    anchor: "https://en.wikipedia.org/wiki/Dying_Slave"
}, {
    title: "Victoire de Samothrace",
    autor: "Unknown",
    year: "c. 200–190 BC",
    anchor: "https://en.wikipedia.org/wiki/Winged_Victory_of_Samothrace"
}, {
    title: "Venus de Milo",
    autor: "Alexandros of Antioch",
    year: "Between 150 and 125 BC",
    anchor: "https://en.wikipedia.org/wiki/Venus_de_Milo"
}, {
    title: "The Virgin and Child with Saint Anne",
    autor: "Leonardo da Vinci",
    year: "c. 1503",
    anchor: "https://en.wikipedia.org/wiki/The_Virgin_and_Child_with_Saint_Anne_(Leonardo)"
}, {
    title: "Mona Lisa",
    autor: "Leonardo da Vinci",
    year: "c. 1503–1506",
    anchor: "https://en.wikipedia.org/wiki/Mona_Lisa"
}, {
    title: "Louvre Museum",
    autor: "Unknown",
    year: "1793",
    anchor: "https://en.wikipedia.org/wiki/Louvre"
}, {
    title: "Venus de Milo",
    autor: "Alexandros of Antioch",
    year: "Between 150 and 125 BC",
    anchor: "https://en.wikipedia.org/wiki/Venus_de_Milo"
}, {
    title: "Louvre Museum Islamic Art",
    autor: "Unknown",
    year: "2012",
    anchor: "https://fr.wikipedia.org/wiki/D%C3%A9partement_des_arts_de_l%27Islam_du_mus%C3%A9e_du_Louvre"
}, {
    title: "Liberty Leading the People",
    autor: "Eugène Delacroix",
    year: "1830",
    anchor: "https://en.wikipedia.org/wiki/Liberty_Leading_the_People"
}, {
    title: "The Cour Marly Louvre",
    autor: "Unknown",
    year: "Unknown",
    anchor: "https://www.louvre.fr/en/explore/the-palace/shining-new-light-on-sculpture"
}, {
    title: "Sleeping Hermaphroditus",
    autor: "Gian Lorenzo Bernini",
    year: "1620",
    anchor: "https://en.wikipedia.org/wiki/Sleeping_Hermaphroditus"
}, {
    title: "La Belle Ferronnière",
    autor: "Leonardo da Vinci",
    year: "1490–1496",
    anchor: "https://en.wikipedia.org/wiki/La_Belle_Ferronni%C3%A8re"
}, {
    title: "Louvre Pyramid",
    autor: "I. M. Pei",
    year: "1988",
    anchor: "https://en.wikipedia.org/wiki/Louvre_Pyramid"
}]