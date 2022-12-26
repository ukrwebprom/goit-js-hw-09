const isStarted = false;
let intervalID = null;

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
changeBtnState(startBtn, true);
changeBtnState(stopBtn, false);

function onStart() {
  changeBtnState(startBtn, false);
  changeBtnState(stopBtn, true);
  document.body.style.backgroundColor = getRandomHexColor();
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  changeBtnState(startBtn, true);
  changeBtnState(stopBtn, false);
  clearInterval(intervalID);
}

function changeBtnState(btn, isEnabled) {
  btn.disabled = !isEnabled;
  btn.style.cursor = isEnabled ? 'pointer' : 'default';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
