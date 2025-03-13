let countdownMinutes,
    countdownSeconds,
    countdownInterval,
    isRunning = false;

window.onload = function () {
    document.querySelector("#pomodoroTime").value =
        localStorage.getItem("pomodoroTime") || 25;
    document.querySelector("#breakTime").value =
        localStorage.getItem("breakTime") || 5;
};

function SaveSettings() {
    let pomodoro = document.querySelector("#pomodoroTime").value;
    let breakTime = document.querySelector("#breakTime").value;

    localStorage.setItem("pomodoroTime", pomodoro);
    localStorage.setItem("breakTime", breakTime);

    return { pomodoro: parseInt(pomodoro), breakTime: parseInt(breakTime) };
}

let btnSave = document.querySelector("#btnSave");
btnSave.addEventListener("click", () => {
    let values = SaveSettings();
    document.querySelector("#settings").style.display = "none";
    document.querySelector("#hiddenDiv").style.display = "flex";

    countdownMinutes = values.pomodoro;
    countdownSeconds = 0;

    updateDisplay();
});

let startBtn = document.querySelector("#start");
let pauseBtn = document.querySelector("#pause");
let resetBtn = document.querySelector("#reset");

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        countdownInterval = setInterval(Countdown, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    isRunning = false;
    clearInterval(countdownInterval);
});

resetBtn.addEventListener("click", () => {
    isRunning = false;
    clearInterval(countdownInterval);

    let values = SaveSettings();
    countdownMinutes = values.pomodoro;
    countdownSeconds = 0;

    updateDisplay();
});

function Countdown() {
    if (countdownMinutes === 0 && countdownSeconds === 0) {
        clearInterval(countdownInterval);
        alert("Vreme isteklo!");
        isRunning = false;
        return;
    }

    if (countdownSeconds === 0) {
        countdownMinutes--;
        countdownSeconds = 59;
    } else {
        countdownSeconds--;
    }

    updateDisplay();
}

function updateDisplay() {
    document.querySelector("#time").innerHTML = `${countdownMinutes}:${
        countdownSeconds < 10 ? "0" : ""
    }${countdownSeconds}`;
}
