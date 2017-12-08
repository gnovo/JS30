// ## Array Cardio Day 2
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];
console.log('People Table:');
console.table(people);

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];
console.log('Comments Table:');
console.table(comments);

// Some and Every Checks
// Array.prototype.some()
console.log('1. IS AT LEAST ONE PERSON 19?');
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
console.log({isAdult});


// Array.prototype.every()
console.log('2. IS EVERYONE 19?');
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
console.log({allAdults});


// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
console.log('3. FIND THE COMMENT WITH THE ID OF 823423');
const comment = comments.find(comment => comment.id === 823423);
console.log(comment);


// Array.prototype.findIndex()
console.log('4. FIND THE COMMENT WITH THIS ID. DELETE THE COMMENT WITH THE ID OF 823423');
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index);
const newComments = [
   ...comments.slice(0, index),
   ...comments.slice(index + 1)
   ];