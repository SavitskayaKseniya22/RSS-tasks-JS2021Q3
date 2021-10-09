let minuses = document.querySelectorAll(".minus")
let pluses = document.querySelectorAll(".plus")
let totalSum = document.querySelector(".total-sum")
let ticketType = document.querySelector(".ticket-type")

let basicValue = document.querySelector(".amount .basic input[type='number']")
let seniorValue = document.querySelector(".amount .senior input[type='number']")


myStorage = window.localStorage;
myStorage.setItem('basicValue', +basicValue.value);
myStorage.setItem('seniorValue', +seniorValue.value);
myStorage.setItem('ticketTypeAcive', ticketType.querySelector("input[type='radio']:checked").id);


window.onload = function () {
    let inputs = document.querySelectorAll(".counter input[type='number']")
    inputs[0].value = myStorage.basicValue
    inputs[1].value = myStorage.seniorValue
    totalSum.innerText = myStorage.totalSum

}
for (const item of pluses) {
    item.addEventListener("click", function () {
        let input = (item.parentNode).querySelector("input")
        input.value++;
        if (item.parentNode.className == "counter basic") {
            totalSum.innerText = Number(totalSum.innerText) + getCost()
            myStorage.basicValue++;
            myStorage.totalSum = totalSum.innerText;
        } else {
            totalSum.innerText = Number(totalSum.innerText) + (getCost() / 2)
            myStorage.seniorValue++;
            myStorage.totalSum = totalSum.innerText;
        }
    })
}

for (const item of minuses) {
    item.addEventListener("click", function () {
        let input = (item.parentNode).querySelector("input")
        if (input.value >= 1) {
            input.value--;
            if (item.parentNode.className == "counter basic") {
                totalSum.innerText = Number(totalSum.innerText) - getCost()
                myStorage.basicValue--;
                myStorage.totalSum = totalSum.innerText;
            } else {
                totalSum.innerText = Number(totalSum.innerText) - (getCost() / 2);
                myStorage.seniorValue--;
                myStorage.totalSum = totalSum.innerText;
            }
        }
    })
}

let ticketTypeInputs = ticketType.querySelectorAll("input[type='radio']")
for (const item of ticketTypeInputs) {
    item.onchange = function () {
        recalculation()
        myStorage.ticketTypeAcive = ticketType.querySelector("input[type='radio']:checked").id;
        myStorage.totalSum = totalSum.innerText;
    }
}


function recalculation() {
    totalSum.innerText = basicValue.value * getCost() + seniorValue.value * (getCost() / 2)
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
buyButton.addEventListener("click", function () {
    ticketsAmountPopup[0].value = myStorage.basicValue
    ticketsAmountPopup[1].value = myStorage.seniorValue
})