export function loadSettings() {
    const pomodoroTime = parseInt(localStorage.getItem("pomodoroTime"));
    const breakTime = parseInt(localStorage.getItem("breakTime"));

    return {
        pomodoro: isNaN(pomodoroTime) ? 25 : pomodoroTime,
        breakTime: isNaN(breakTime) ? 5 : breakTime,
    };
}

export function saveSettings(pomodoro, breakTime) {
    localStorage.setItem("pomodoroTime", pomodoro);
    localStorage.setItem("breakTime", breakTime);
}
