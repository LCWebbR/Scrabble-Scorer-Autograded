// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const numberCompare = /\d/;
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// function oldScrabbleScorer(word) {
//    word = word.toUpperCase();
//    let letterPoints = "";

//    for (let i = 0; i < word.length; i++) {

//       for (const pointValue in oldPointStructure) {

//          if (oldPointStructure[pointValue].includes(word[i])) {
//             letterPoints += `Points for '${word[i]}': ${pointValue}\n`
//          }

//       }
//    }
//    return letterPoints;
// }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!")
   let wordQ = input.question("Enter a word to score:")
   //    wordQ = wordQ.split("")
   //   for (let i = 0; i < wordQ.length; i++)
   //    if (wordQ[i] === typeof(Number))
   //    {
   //       wordQ = input.question("Enter a word to score:");
   //    }
   //    else{
   return wordQ;
   // }
};


let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   let score = 0
   score = word.length
   return score;
};

let vowelBonusScorer = function (word) {
   let score = 0
   let wordArr = word.split("")
   let i = 0
   while (i < wordArr.length) {
      if (wordArr[i].includes('a') || wordArr[i].includes('e') || wordArr[i].includes('i') || wordArr[i].includes('o') || wordArr[i].includes('u') || wordArr[i].includes('y')) {
         score += 3;
         i++
      }

      else {
         score += 1;
         i++
      }
   }
   return score;
}

let scrabbleScorer = function (word) {
   let points = 0;

   for (let letters of word) {
      points += transform(oldPointStructure)[letters]

   }
   return points
};
let simpleScore = { name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer };
let bonusVowelsScore = { name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer };
let scrabbleScore = { name: "Scrabble", description: "	The new traditional scoring algorithm.", scorerFunction: scrabbleScorer };
const scoringAlgorithms = [simpleScore, bonusVowelsScore, scrabbleScore];

function scorerPrompt(word, scoringAlgorithm = -1) {

   while (scoringAlgorithm < 0 || scoringAlgorithm > 2) {
      scoringAlgorithm = input.question(`Which scoring algorithm would you like to use?\n\n    
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `)
   }
   return console.log(`algorithm name: ${scoringAlgorithms[scoringAlgorithm].name} \nscore for ${word}: ${scoringAlgorithms[scoringAlgorithm].scorerFunction(word)}`);
}

function transform(oldPointStructure) {

   let newPointStructureObject = {}
   for (let points in oldPointStructure) {

      for (let letter of oldPointStructure[points]) {
         newPointStructureObject[letter.toLowerCase()] = Number(points)

      }
   }
   
   return newPointStructureObject;
};

function runProgram() {

   scorerPrompt(initialPrompt())

//console.log(newPointStructure)

}




// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
