let minuses = document.querySelectorAll(".minus")
let pluses = document.querySelectorAll(".plus")
let totalSum = document.querySelector(".total-sum")
let ticketType = document.querySelector(".ticket-type")
let basicValue = document.querySelector(" .basic input[type='number']")
let seniorValue = document.querySelector(" .senior input[type='number']")


myStorage = window.localStorage;
myStorage.setItem('basicValue', +basicValue.value);
myStorage.setItem('seniorValue', +seniorValue.value);
myStorage.setItem('ticketTypeAcive', ticketType.querySelector("input[type='radio']:checked").id);


window.onload = function () {
    let inputs = document.querySelectorAll(".counter input[type='number']")
    inputs[0].value = myStorage.basicValue
    inputs[1].value = myStorage.seniorValue
    if (myStorage.totalSum) {
        totalSum.innerText = myStorage.totalSum
    } else {
        myStorage.totalSum = totalSum.innerText;
    }



}
for (const item of pluses) {
    item.addEventListener("click", function () {
        let input = (item.parentNode).querySelector("input")
        input.value++;
        if (item.parentNode.className == "counter basic") {
            myStorage.totalSum = Number(totalSum.innerText) + getCost()
            myStorage.basicValue++;
            totalSum.innerText = myStorage.totalSum;
            totalSumOverwiew.innerText = myStorage.totalSum;
        } else {
            myStorage.totalSum = Number(totalSum.innerText) + (getCost() / 2)
            myStorage.seniorValue++;
            totalSum.innerText = myStorage.totalSum;
            totalSumOverwiew.innerText = myStorage.totalSum

        }
    })
}

for (const item of minuses) {
    item.addEventListener("click", function () {
        let input = (item.parentNode).querySelector("input")
        if (input.value >= 1) {
            input.value--;
            if (item.parentNode.className == "counter basic") {
                myStorage.totalSum = Number(totalSum.innerText) - getCost()
                myStorage.basicValue--;
                totalSum.innerText = myStorage.totalSum;
                totalSumOverwiew.innerText = myStorage.totalSum;

            } else {
                myStorage.totalSum = Number(totalSum.innerText) - (getCost() / 2)
                myStorage.seniorValue--;
                totalSum.innerText = myStorage.totalSum
                totalSumOverwiew.innerText = myStorage.totalSum;

            }
        }
    })
}

let ticketTypeInputs = ticketType.querySelectorAll("input[type='radio']")
for (const item of ticketTypeInputs) {
    item.onchange = function () {
        recalculation()
        myStorage.ticketTypeAcive = ticketType.querySelector("input[type='radio']:checked").id;

    }
}


function recalculation() {
    myStorage.totalSum = basicValue.value * getCost() + seniorValue.value * (getCost() / 2)
    totalSum.innerText = myStorage.totalSum
    totalSumOverwiew.innerText = myStorage.totalSum;
}

function getCost() {
    let ticketTypeAcive = ticketType.querySelector("input[type='radio']:checked")
    let cost;
    switch (ticketTypeAcive.id) {
        case "Permanent":
            cost = 20
            break;
        case "Temporary":
            cost = 25
            break;
        case "Combined":
            cost = 40
            break;
    }
    return cost
}

//выезжающая форма
let ticketsAmountPopup = document.querySelectorAll(".ticketsAmount input[type='number']")
let totalSumOverwiew = document.querySelector(".total-sum-overwiew")
let totalBasic = document.querySelector(".total-basic")
let totalSenior = document.querySelector(".total-senior")

let costBasic = document.querySelectorAll(".basic-cost")
let costSenior = document.querySelectorAll(".senior-cost")

let numSummarys = document.querySelectorAll(".num-summary")

let selectType = document.querySelector(".selectType select")
let choosenType = document.querySelector(".choosen-type")
buyButton.addEventListener("click", function () {
    ticketsAmountPopup[0].value = myStorage.basicValue
    ticketsAmountPopup[1].value = myStorage.seniorValue

    totalSumOverwiew.innerText = myStorage.totalSum
    totalBasic.innerText = myStorage.basicValue * getCost()
    totalSenior.innerText = myStorage.seniorValue * (getCost() / 2)

    costBasic[0].innerText = getCost()
    costBasic[1].innerText = getCost()
    costSenior[0].innerText = getCost() / 2
    costSenior[1].innerText = getCost() / 2

    numSummarys[0].innerText = myStorage.basicValue
    numSummarys[1].innerText = myStorage.seniorValue


    choosenType.innerText = document.getElementById(myStorage.ticketTypeAcive).nextSibling.innerText;



    for (const item of selectType.options) {
        item.removeAttribute("selected")
        if (choosenType.innerText == item.innerText) {
            item.selected = "true"

        }
    }

})

let buttons = document.querySelectorAll(".ticketsAmount button")

for (const item of buttons) {

    item.addEventListener("click", function () {

        myStorage.basicValue = ticketsAmountPopup[0].value
        myStorage.seniorValue = ticketsAmountPopup[1].value

        basicValue.value = myStorage.basicValue
        seniorValue.value = myStorage.seniorValue

        numSummarys[0].innerText = myStorage.basicValue
        numSummarys[1].innerText = myStorage.seniorValue

        totalBasic.innerText = myStorage.basicValue * getCost()
        totalSenior.innerText = myStorage.seniorValue * (getCost() / 2)


    })
}

selectType.addEventListener("change", function () {
    for (const item of selectType.options) {
        if (item.selected) {
            myStorage.ticketTypeAcive = item.value;
            choosenType.innerText = item.innerText

        }

    }
})



//дата
function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}
let dateControl = document.querySelector('#booking-tickets input[type="date"]');
let nowDate = new Date();
let minStr = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
dateControl.addEventListener("", function () {})
dateControl.min = minStr
dateControl.value = minStr


function printChoosenDayWeek(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = days[date.getDay()]
    let choosenDayWeek = document.querySelector(".choosen-day-week")
    choosenDayWeek.innerText = weekDay
}

function printChoosenDay(date) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let chooseMonth = months[date.getMonth()]
    let choosenDay = document.querySelector(".choosen-date-month-day")
    choosenDay.innerText = chooseMonth + " " + date.getDate()
}

printChoosenDayWeek(nowDate)
printChoosenDay(nowDate)


dateControl.addEventListener("change", function () {
    let dateChoosen = parseDate(dateControl.value)
    printChoosenDayWeek(dateChoosen)
    printChoosenDay(dateChoosen)

})

//время
let timeControl = document.querySelector('#booking-tickets input[type="time"]');
let choosenTime = document.querySelector(".choosen-time")
choosenTime.innerText = "09:00";
timeControl.addEventListener("input", function () {
    choosenTime.innerText = timeControl.value;
})

//валидация
let writeName = document.querySelector(".writeName input")
let writeEmail = document.querySelector(".writeEmail input")
let writePhone = document.querySelector(".writePhone input")

function makeWarning(item) {
    item.style.border = "2px solid red"
    alert("Wrong!")

    setTimeout(() => {
        item.style.border = "1px solid black"
    }, 600);

}
writeName.addEventListener("blur", function () {
    if (!/^[а-яА-Яa-zA-Z\s]{3,15}$/gi.test(writeName.value)) {
        makeWarning(writeName.parentNode)
    }
})
writeEmail.addEventListener("blur", function () {
    if (!/^[\w_-]{3,15}@[a-zA-Z-]{4,}\.[a-zA-Z-]{2,}$/gi.test(writeEmail.value)) {
        makeWarning(writeEmail.parentNode)
    }

})

writePhone.addEventListener("blur", function () {
    const result = Array.from(writePhone.value).filter(num => !/[a-zA-Z-]/gi.test(num));
    if (result.length <= 10) {
        if (!/^(\d{2,3}[-\s]?)?(\d{2,3}[-\s]?)?(\d{2,3}[-\s]?)?(\d{2,3}[-\s]?)?$/gi.test(writePhone.value)) {
            makeWarning(writePhone.parentNode)
        }
    } else {
        makeWarning(writePhone.parentNode)
    }



})