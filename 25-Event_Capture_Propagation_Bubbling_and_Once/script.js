const divs = document.querySelectorAll('div'),
  button = document.querySelector('button');

function logText(e) {
  console.log(this.classList.value);
  // e.stopPropagation(); // stop bubbling!
  // console.log(this);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  once: true
}));

// button will only run once
button.addEventListener('click', () => {
  console.log('Click!!!');
}, {
  once: true
});