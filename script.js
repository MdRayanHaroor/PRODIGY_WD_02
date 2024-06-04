let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
let laps = [];

function updateDisplay() {
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

function start() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
}

function pause() {
    if (!paused) {
        paused = true;
        clearInterval(timer);
    }
}

function reset() {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    document.getElementById('laps-list').innerHTML = '';
}

function lap() {
    if (!paused) {
        laps.push(elapsedTime);
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        document.getElementById('laps-list').appendChild(lapTime);
    }
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

updateDisplay();