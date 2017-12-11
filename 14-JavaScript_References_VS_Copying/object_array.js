// start with strings, numbers and booleans
console.log("%c==strings, numbers and booleans==", "background-color:#d0996b;color:white");
let age = 100;
let age2 = age;
console.log(`age: ${age}, age2: ${age2}`);
age2 = 200;
console.log("---age2 changes to 200");
console.log(`age: ${age}, age2: ${age2}`);
let name = 'Gonçalo';
let name2 = name;
console.log(`name: ${name}, name2: ${name2}`);
name2 = 'Novo';
console.log("---name2 changes to Chad");
console.log(`name: ${name}, name2: ${name2}`);

// Let's say we have an array
console.log("%c==array reference==", "background-color:#d0996b;color:white");
let players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players;
// console.log(players, team);


// You might think we can just do something like this:
// team[3] = 'Lux';

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!
console.log('team');
console.log(team);
console.log('players');
console.log(players);


// if you update an array, it will always reference back, so the original one will be updated

// So, how do we fix this? We take a copy instead!

// console.log("%c---do real copy for Arrays", "background-color:#d0996b;color:white");
const team2 = players.slice();
team2[3] = "Lux"
console.log("team2");
console.log(team2);
// console.log("players");
// console.log(players);
// one day
// or create a new array and concat the old one in
// same way as team2
// console.log("%c---same way as team2", "background-color:#d0996b;color:white");
const team3 = [].concat(players);  //just like take a copy
team3[3] = "Lux";
console.log("team3");
console.log(team3);
// or use the new ES6 Spread
console.log("%c---use ES6 spread syntax", "background-color:#d0996b;color:white");
const team4 = [...players];   // just like take a copy
team4[3] = "Todd";
console.log("team4");
console.log(team4);
// console.log("players");
// console.log(players);
const team5 = Array.from(players);  // same as team4
team5[3] = "Todd";
// console.log("↓↓ team5 use Array.from() same as team4")
console.log("team5");
console.log(team5);
console.log("players");
console.log(players);
// now when we update it, the original one isn't changed
// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
name: "Zach",
age: 25
};
// and think we make a copy:
const man = person;
// man.number = 100;
console.log("%c==Objects==", "background-color:#d0996b;color:white");
console.log("man");
console.log(man);
console.log("person");
console.log(person);
// how do we take a copy instead?
const man2 = Object.assign({}, person, { number: 100 });
console.log("%c---do real copy for Objects", "background-color:#d0996b;color:white");
console.log("man2");
console.log(man2);
console.log("person");
console.log(person);
// We will hopefully soon see the object ...spread
// const man3 = {...person};  // not in javascript yet
// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const zach = {
name: 'Zach',
age: 25,
social: {
twitter: '@zach25',
facebook: 'zach25.coolman'
}
};
// const zach2 = Object.assign({}, zach);
console.log("%c==More deep==", "background-color:#d0996b;color:white");
// zach2.social.twitter = '@zach2_nobody';
// console.log("zach2.social");
// console.log(zach2.social);
// console.log("zach.social");
// console.log(zach.social);
// use object.assign only copy one level deep
// ↓↓ cheating way
const zach3 = JSON.parse(JSON.stringify(zach));
zach3.social.twitter = '@zach3_nobody';
console.log("%c--- cheating way for clone deep in Object", "background-color:#d0996b;color:white");
console.log("zach3.social");
console.log(zach3.social);
console.log("zach.social");
console.log(zach.social);