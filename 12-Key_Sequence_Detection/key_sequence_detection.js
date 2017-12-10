const pressed = [];
const secretCode = 'konami';
let decode = document.querySelector('.decode');

window.addEventListener('keyup', (e) => {
  // `console.log()` the `e.key` out will get the name of the key that we pressed
  console.log(e.key);
  // `array.push` to store the keys into an array
  pressed.push(e.key);
  // check if pressed keys matches the secretCode, and then add cornify effect if matched
  pressed.splice(- secretCode.length - 1, pressed.length - secretCode.length);
  
  if(pressed.join('').includes(secretCode)) {
    decode.innerHTML= '';
    decode.insertAdjacentHTML('afterbegin', secretCode);
    // console.log('Congratulations, you found the secret code!', "font-size: 18px;color: blue;background-color: yellow");
    console.log("%c Congratulations, you found the secret code!", "font-size: 18px; color: red;");

    cornify_add();
  }

console.log(pressed);
});