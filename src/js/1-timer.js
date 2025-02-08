import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const refs = {
  DateInput: document.querySelector('#datetime-picker'),
  StartBtn: document.querySelector('[data-start]'),
  ClockFace: document.querySelector('.timer'),
};

refs.StartBtn.disabled = true;
const timer = {
  intervalId: null,
  userSelectedDate: null,
  selectData() {
    const options = {
      enableTime: true,
      time_24hr: true,
      minuteIncrement: 1,
      onClose(selectedDates) {
        if (selectedDates.length === 0) return;
        if (selectedDates[0] <= Date.now()) {
          iziToast.error({
            title: 'Hey',
            message: 'Please choose a date in the future',
            position: 'topRight',
          });
          refs.StartBtn.disabled = true;
        } else {
          timer.userSelectedDate = selectedDates[0];
          console.log('Selected date:', this.userSelectedDate);
          refs.StartBtn.disabled = false;
        }
      },
    };
    const fp = flatpickr(refs.DateInput, options);
  },

  start() {
    console.log('Start');
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
    refs.StartBtn.disabled = true;
    // refs.DateInput._flatpickr.destroy();
    refs.DateInput.disabled = true;
  },

  tick() {
    const currentTime = Date.now();
    // console.log(currentTime);
    // console.log(this.userSelectedDate.getTime());
    const diff = this.userSelectedDate.getTime() - currentTime;
    if (diff <= 0) {
      this.stop();
      return;
    }
    const time = convertMs(diff);
    const objInFormat = timeToFormat(time);
    console.log(objInFormat);
    Object.entries(objInFormat).forEach(([key, value]) => {
      const element = refs.ClockFace.querySelector(`[data-${key}]`);
      if (element) {
        element.textContent = value;
      }
    });
  },
  stop() {
    clearInterval(this.intervalId);
    refs.StartBtn.disabled = false;
    refs.DateInput.disabled = false;
  },
};

timer.selectData();

refs.StartBtn.addEventListener('click', () => {
  timer.start();
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

function timeToFormat({ days, hours, minutes, seconds }) {
  days =
    days > 99
      ? days.toString().padStart(3, '0')
      : days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}
