setInterval(updateClock, 1000)

const hours = document.querySelector('[data-hour-hand]')
const minutes = document.querySelector('[data-minute-hand]')
const seconds = document.querySelector('[data-second-hand]')
const realAnalogicEffect = true;
if (realAnalogicEffect) {
    seconds.style.transition = "1000ms linear";
}
function rotateNumbers() {
    const numbers = document.querySelectorAll('.number')
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        let rotationNumberDeg = ((i + 1) * 30);
        number.style.setProperty('--rotation', rotationNumberDeg)
    }

    const minutesLines = document.querySelector('.minutes-lines')
    for (let i = 0; i < 60; i++) {
        const minuteLine = document.createElement("span")
        minuteLine.classList.add("minute-line")
        minuteLine.textContent = "";
        let rotationNumberDeg = (((i + 1) / 60) * 360);
        minuteLine.style.setProperty('--rotation', rotationNumberDeg)
        minutesLines.append(minuteLine)
    }
}

let secondLoops = 0;
let minutesLoops = 0;
let hoursLoops = 0;
function updateClock() {
    const startDate = new Date()
    const secondsRatio = startDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + startDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + startDate.getHours()) / 12

    //Fix to work with transition because from 359 to 0 it reverses the animation
    if (realAnalogicEffect) {
        if (secondsRatio === 0) { secondLoops += 1; }
        if (minutesRatio === 0) { minutesLoops += 1; }
        if (hoursRatio === 0) { hoursLoops += 1; }
    }
    setRotation(seconds, secondLoops + secondsRatio)
    setRotation(minutes, minutesLoops + minutesRatio)
    setRotation(hours, hoursLoops + hoursRatio)
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}
updateClock()
rotateNumbers();