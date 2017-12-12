const hero = document.querySelector('.hero'),
  text = hero.querySelector('h1'),
  walk = 50; // 50px

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
  	x = x + e.target.offsetLeft;
  	y = y + e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2)),
    yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
      ${xWalk * -1}px ${yWalk * -1}px 15px rgba(0,0,0,0.2)
      `;
}

hero.addEventListener('mousemove', shadow);