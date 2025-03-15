let countdownMinutes,
    countdownSeconds,
    countdownInterval,
    isRunning = false,
    onBreak = false;

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
    onBreak = false;

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
    onBreak = false;

    updateDisplay();
});

function Countdown() {
    if (countdownMinutes === 0 && countdownSeconds === 0) {
        clearInterval(countdownInterval);

        if (!onBreak) {
            let breakTime = parseInt(localStorage.getItem("breakTime")) || 5;
            countdownMinutes = breakTime;
            countdownSeconds = 0;
            onBreak = true;
            alert("Time for a break!");
            isRunning = true;
            countdownInterval = setInterval(Countdown, 1000);
        } else {
            let pomodoroTime =
                parseInt(localStorage.getItem("pomodoroTime")) || 25;
            countdownMinutes = pomodoroTime;
            countdownSeconds = 0;
            onBreak = false;
            alert("It's time for a new Pomodoro!");
            isRunning = true;
            countdownInterval = setInterval(Countdown, 1000);
        }
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
