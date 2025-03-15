export const SOUNDS = {
    pomodoro_end: "./sounds/alert_one.wav",
    break_end: "./sounds/alert_one.wav",
};

export function playSound(event) {
    let soundUrl = SOUNDS[event];
    if (!soundUrl) {
        console.error("Invalid event name");
        return;
    }

    let audio = new Audio(soundUrl);
    audio.play();
}
