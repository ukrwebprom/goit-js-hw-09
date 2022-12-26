import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const inputField = document.querySelector('#datetime-picker');
const Refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};
startBtn.disabled = true;
let intervalId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    selectedDate = selectedDates[0];
  },
};
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  inputField.disabled = true;
  intervalId = setInterval(() => {
    const timeLeft = selectedDate - Date.now();
    if (timeLeft < 0) {
      clearInterval(intervalId);
      inputField.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    Refs.days.textContent = addLeadingZero(days);
    Refs.hours.textContent = addLeadingZero(hours);
    Refs.mins.textContent = addLeadingZero(minutes);
    Refs.secs.textContent = addLeadingZero(seconds);
  }, 1000);
  startBtn.disabled = true;
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
