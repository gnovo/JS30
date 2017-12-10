 const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('[== log Regular ==]');


// Interpolated
console.log('[== log Insertions, those variables are like C programing language ==]');
console.log("-- %s for string --");
console.log("Hi %s!", "girl");

console.log("-- %d for integer --");
console.log("I am %d years old!", 25);

console.log("-- %f for float --");
console.log("It's %f euros.", 23.5);

console.log("-- %o for object --");
console.log("This is an object:  %o", {firstName: 'Amber', lastName: 'Simpson', age: 20});


// Styled
console.log("[== log with Styles ==]");
console.log("-- %c for styles --");
console.log("I am not just a log, I am %c CONSOLE DOT LOG!!", "font-size: 18px;color: blue;background-color: yellow");


// warning!
console.log("[== log Warning message ==]");
console.log("-- console.warn() with some styling --");
console.warn("← a warning sign %c Watch out! ", "background-color: #eeaf1e;color: #fff");

// Error :|
console.log("[== log Error message ==]");
console.log("-- console.error() with some styling --");
console.error("← an error sign %c Oh Darn! ", "background-color: red;color: #fff");

// Info
console.log("[== log Info message ==]");
console.log("-- console.info() with some styling --");
console.info("← an info sign %c Practice makes perfect! ", "background-color: #274ed0;color: #fff");

// Testing
console.log("[== log Testing ==]");
console.log("-- console.assert(), only false will return --");
console.log("1. it'll return nothing if true");
console.assert(1 === 1, "Hey it\'s true"); // nothing returns
console.log("2. it'll return the message if false");
console.assert(1 === 0, "Hey you\'re wrong!"); // Hey your're wrong!
const p = document.querySelector('p');
console.log("3. you can also check the DOM or something");
console.assert(p.innerHTML.match('Break'), "There is no \'Break\' in <p> here, try \'BREAK\'");


// Viewing DOM Elements
console.log("[== log DOM Elements ==]");
console.log("-- querySelector the element you want and console.log() it out --");
console.log("---- and it will log out only tag of the element ----");
console.log(p);  // only log out tag of the element
console.log("-- or you can console.dir() -- to view the properties of the element");
console.dir(p);


// console.table() is much better to log out like an array or something tidy
console.log("[== console.table() is a good trick ==]");
console.log("-- simply console.table() all out --");
console.table(dogs);
console.log("-- only console.table() 'age' out --");
console.table(dogs, ['age']);


// Grouping together
console.log("[== console.group() to grouping things ==]");
dogs.forEach(dog => {
  console.group();             // open up the group
  // console.groupCollapsed();    // collapsed up the group
  console.log(`${dog.name}`);
  console.log(`${dog.age}`);
  console.log(`${dog.name} is ${dog.age} years old.`);
  console.groupEnd();
});


// counting
console.log("[== console.count() to counting things ==]");
console.log("-- counts only contents inside of console.count() --");
console.count("chocolate");
console.count("candy");
console.count("chocolate");
console.count("candy");
console.count("chocolate");
console.count("potato chips");
console.count("chocolate");


// timing
console.log("[== console.time() to see the processing times ==]");
console.time('fetching data');
fetch('http://api.github.com/users/gnovo')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
   });


// clearing
console.log("[== log Clearing ==]");
console.log("-- console.clear() --");
// console.clear();  // Console was cleared
// there are 2 ways to clear console panel, one is `console.clear();`, the other is just `Ctrl + L` (in Chrome)