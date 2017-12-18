class KonamiCharacter {
  constructor(){
    this.position = {
      y: Math.floor(Math.random() * 90),
      x: Math.floor(Math.random() * 90)
    };
    this.randomY = Math.random() >= 0.5 ? `bottom:${this.position.y}%;` : `top:${this.position.y}%;`;
    this.randomX = Math.random() >= 0.5 ? `left:${this.position.x}%;` : `right:${this.position.x}%;`;
    this.flip = Math.random() >= 0.5 ? 1 : -1;
    this.rotate = Math.floor(Math.random() * 360);
    this.url = {
      0: "images/konami_bomberman.gif",
      1: "images/konami_castlevania.png",
      2: "images/konami_contra.png",
      3: "images/konami_gradius.gif",
      4: "images/konami_silenthill.png",
      5: "images/konami_snake.png",
      6: "images/konami_zombies.gif"
    };
    this.img = this.url[Math.floor(Math.random() * 7)];
  }
  render(){
    const body = document.querySelector('body');
    const render = `<img class="konami-character"
                      style="${this.randomY} ${this.randomX}
                      transform: rotate(${this.rotate}deg) scaleX(${this.flip});"
                      src=${this.img}>`;

    body.insertAdjacentHTML("beforeend", render);
  }
}

//Konami code
const pressed = [],
  secretCode = "konami";
  // superSecretCode = "38384040373937396665";
let decode = document.querySelector('.decode');

window.addEventListener('keyup', (e) => {
  // `console.log()` the `e.key` out will get the name of the key that we pressed
  console.log(e.key);
  // console.log(e.keyCode)
    // `array.push` to store the keys into an array (TO DETECT A SECRET CODE INCLUDING KEYBOARD KEYS, LIKE 'CAPS LOCK OR 'SHIF' (e.g ↑↑↓↓←→←→), CONVERT SECRET CODE TO NUMBERS FIRST AND THEN USE 'e.keyCode')
  pressed.push(e.key);
  // pressed.push(e.keyCode);
  // check if pressed keys matches the secretCode, and then add cornify effect if matched
  pressed.splice(- secretCode.length - 1, pressed.length - secretCode.length);
  // Use this splice instead if secret code includes keyboard keys:
  // pressed.splice(- secretCode.length - 1, pressed.length -  (secretCode.length/2));

  if (pressed.join("").includes(secretCode)) {
    (new KonamiCharacter().render());
    console.log("%c Congratulations, you found the secret code!", "font-size: 18px; color: red;")
    decode.innerHTML= '';
    decode.insertAdjacentHTML('afterbegin', secretCode);
  }
});