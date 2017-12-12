const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const strip = (bandName) => bandName.replace(/^(a\s|the\s|an\s)/i, '').trim(); //remove 'a', 'the' and 'an'.
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1); //sort alphabetically comparing the bands without articles
const render = sortedBands.map(band => `<li>${band}</li>`).join("");

document.querySelector("#bands").insertAdjacentHTML("beforeend", render);