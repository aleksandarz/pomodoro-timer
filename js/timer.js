import { playSound } from "./sounds.js";
import { saveSettings, loadSettings } from "./settings.js";

let countdownMinutes,
    countdownSeconds,
    countdownInterval,
    isRunning = false,
    onBreak = false;

window.onload = function () {
    let settings = loadSettings();
    document.querySelector("#pomodoroTime").value = settings.pomodoro;
    document.querySelector("#breakTime").value = settings.breakTime;

    countdownMinutes = settings.pomodoro;
    countdownSeconds = 0;
    onBreak = false;

    updateDisplay();
};

document.querySelector("#btnSave").addEventListener("click", () => {
    let values = saveSettings(
        document.querySelector("#pomodoroTime").value,
        document.querySelector("#breakTime").value
    );

    document.querySelector("#settings").style.display = "none";
    document.querySelector("#hiddenDiv").style.display = "flex";

    countdownMinutes = values.pomodoro;
    countdownSeconds = 0;
    onBreak = false;

    updateDisplay();
});

document.querySelector("#start").addEventListener("click", startTimer);
document.querySelector("#pause").addEventListener("click", pauseTimer);
document.querySelector("#reset").addEventListener("click", resetTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        countdownInterval = setInterval(countdown, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(countdownInterval);
}

function resetTimer() {
    isRunning = false;
    clearInterval(countdownInterval);

    let settings = loadSettings();
    countdownMinutes = settings.pomodoro;
    countdownSeconds = 0;
    onBreak = false;

    updateDisplay();
}

function countdown() {
    if (countdownMinutes === 0 && countdownSeconds === 0) {
        clearInterval(countdownInterval);

        if (!onBreak) {
            let breakTime = parseInt(localStorage.getItem("breakTime")) || 5;
            countdownMinutes = breakTime;
            countdownSeconds = 0;
            onBreak = true;

            playSound("pomodoro_end");
            alert("Time for a break!");

            startTimer();
        } else {
            let pomodoroTime =
                parseInt(localStorage.getItem("pomodoroTime")) || 25;
            countdownMinutes = pomodoroTime;
            countdownSeconds = 0;
            onBreak = false;

            playSound("break_end");
            alert("It's time for a new Pomodoro!");

            startTimer();
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
