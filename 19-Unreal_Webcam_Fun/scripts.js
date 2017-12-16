const video = document.querySelector('.player'),
  canvas = document.querySelector('.photo'),
  ctx = canvas.getContext('2d'),
  strip = document.querySelector('.strip'),
  snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`Allow camera in your browser!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth,
    height = video.videoHeight;
  console.log(width, height);
  
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // mess with them
    let effect = document.getElementById("effect").value;
    function selectEffect() {
      let controlsGreenScreen = document.querySelector('.controls-greenscreen');
      controlsGreenScreen.style.display = 'none';

      let controlsGhosting = document.querySelector('.controls-ghosting');
      controlsGhosting.style.display = 'none';

      if (effect === "Normal") {
      	ghosting();
        controlsGhosting.style.display = 'inline';
      } else if (effect === "Grayscale") {
      	pixels = grayScale(pixels);
      	ghosting();
        controlsGhosting.style.display = 'inline';
      } else if (effect === "Red Effect") {
      	pixels = redEffect(pixels);
      	ctx.globalAlpha = 1;
      } else if (effect === "Green Effect") {
      	pixels = greenEffect(pixels);
      	ctx.globalAlpha = 1;
      } else if (effect === "Blue Effect") {
      	pixels = blueEffect(pixels);
      	ctx.globalAlpha = 1; 
      } else if (effect === "RGB Split") {
      	pixels = rgbSplit(pixels);
      	ctx.globalAlpha = 1;
      } else if (effect === "Green Screen") {
      	pixels = greenScreen(pixels);
      	ctx.globalAlpha = 1;
        controlsGreenScreen.style.display = 'inline';
      }
    // put them back
    ctx.putImageData(pixels, 0, 0);
    };
    selectEffect();
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'unreal_photo');
  link.innerHTML = `<img src="${data}" alt="Unreal Photo" />`;
  strip.insertBefore(link, strip.firsChild);
}

// Effects
function ghosting() {
  const levels = {};

  document.querySelectorAll('.ghosting input').forEach((input) => {
    levels[input.name] = input.value;
  });

  ctx.globalAlpha = levels.ghostinglevel / 10;
}

function grayScale(pixels) {
  for (let i = 0, n = pixels.data.length; i < n; i += 4) {
  	let grayscale = pixels.data[i] * .3 + pixels.data[i+1] * .59 + pixels.data[i+2] * .11; // luminance algorithm
  	pixels.data[i + 0] = grayscale; // RED
  	pixels.data[i + 1] = grayscale; // GREEN
  	pixels.data[i + 2] = grayscale; // BLUE
  	// pixels.data[i + 3] = grayscale; // ALPHA
  }
  return pixels;
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
  }
  return pixels;
}

function greenEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.8; // BLUE
  }
  return pixels;
}

function blueEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.8; // BLUE
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for(i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);