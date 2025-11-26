// JavaScript Levels Data
function getJsLevels() {
    return [
        // Levels 1-10: Basic JavaScript Syntax
        {
            title: "Variables and Console",
            instructions: "Declare variables using let and const, then log them to the console.",
            starterCode: `// Declare a variable using let
let name = '';

// Declare a constant
const PI = ;

// Log both to console
console.log();`,
            xp: 10,
            requiredPatterns: ['let', 'const', 'console.log']
        },
        {
            title: "Basic Arithmetic",
            instructions: "Perform arithmetic operations: addition, subtraction, multiplication, and division.",
            starterCode: `let a = 10;
let b = 5;

// Calculate sum
let sum = ;

// Calculate difference
let difference = ;

// Calculate product
let product = ;

// Calculate quotient
let quotient = ;

console.log('Sum:', sum);
console.log('Difference:', difference);
console.log('Product:', product);
console.log('Quotient:', quotient);`,
            xp: 15,
            requiredPatterns: ['+', '-', '*', '/']
        },
        {
            title: "String Manipulation",
            instructions: "Work with strings: concatenation, length, and template literals.",
            starterCode: `let firstName = 'John';
let lastName = 'Doe';

// Concatenate strings
let fullName = ;

// Use template literal
let greeting = ;

// Get string length
let nameLength = ;

console.log(fullName);
console.log(greeting);
console.log('Name length:', nameLength);`,
            xp: 15,
            requiredPatterns: ['+', '${', '.length']
        },
        {
            title: "Arrays Basics",
            instructions: "Create an array, add/remove elements, and access array properties.",
            starterCode: `// Create an array of fruits
let fruits = ;

// Add an element to the end

// Remove the last element

// Access first element
let firstFruit = ;

// Get array length
let fruitCount = ;

console.log(fruits);
console.log('First fruit:', firstFruit);
console.log('Total fruits:', fruitCount);`,
            xp: 20,
            requiredPatterns: ['[]', 'push', 'pop', '[0]', '.length']
        },
        {
            title: "Objects and Properties",
            instructions: "Create an object representing a person with properties and methods.",
            starterCode: `// Create a person object
let person = {
    // Add properties
};

// Add a method
person.greet = function() {
    
};

// Access properties
console.log(person.name);
person.greet();`,
            xp: 20,
            requiredPatterns: ['{}', 'function()']
        },
        {
            title: "Conditional Statements",
            instructions: "Use if/else statements to check conditions and execute different code blocks.",
            starterCode: `let age = 20;
let hasLicense = true;

// Check if person can drive
if () {
    console.log('You can drive!');
} else if () {
    console.log('You need a license.');
} else {
    console.log('You cannot drive yet.');
}`,
            xp: 25,
            requiredPatterns: ['if', 'else if', 'else']
        },
        {
            title: "For Loops",
            instructions: "Use a for loop to iterate through an array and perform operations on each element.",
            starterCode: `let numbers = [1, 2, 3, 4, 5];
let sum = 0;

// Calculate sum using for loop
for () {
    
}

console.log('Sum:', sum);`,
            xp: 25,
            requiredPatterns: ['for', 'let i=0', 'i<', 'i++']
        },
        {
            title: "Functions",
            instructions: "Create functions that take parameters and return values.",
            starterCode: `// Create a function that adds two numbers
function add(a, b) {
    
}

// Create a function that multiplies two numbers
const multiply = function(a, b) {
    
};

let result1 = add(5, 3);
let result2 = multiply(4, 7);

console.log('Addition:', result1);
console.log('Multiplication:', result2);`,
            xp: 30,
            requiredPatterns: ['function', 'return']
        },
        {
            title: "Array Methods",
            instructions: "Use array methods like forEach, map, and filter to manipulate arrays.",
            starterCode: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Use forEach to log each number


// Use map to create new array of squares
let squares = ;

// Use filter to get even numbers
let evens = ;

console.log('Squares:', squares);
console.log('Evens:', evens);`,
            xp: 35,
            requiredPatterns: ['forEach', 'map', 'filter']
        },
        {
            title: "DOM Manipulation",
            instructions: "Select DOM elements and modify their content and styles.",
            starterCode: `// Select an element by ID
let title = ;

// Change text content
title.textContent = ;

// Change style
title.style.color = ;

// Create new element
let newParagraph = ;
newParagraph.textContent = 'This is a new paragraph!';

// Append to body
document.body.;`,
            xp: 40,
            requiredPatterns: ['document.getElementById', 'textContent', 'style.', 'createElement', 'appendChild']
        },

        // Levels 11-20: Intermediate JavaScript
        {
            title: "Event Listeners",
            instructions: "Add event listeners to handle user interactions like clicks and input.",
            starterCode: `// Get button element
let button = document.getElementById('myButton');

// Add click event listener
button.('click', function() {
    
});

// Handle input events
let input = document.getElementById('myInput');
input.addEventListener('input', function(event) {
    
});`,
            htmlStructure: `<button id="myButton">Click Me</button>
<input id="myInput" placeholder="Type something...">
<div id="output"></div>`,
            xp: 35,
            requiredPatterns: ['addEventListener', 'event']
        },
        {
            title: "Arrow Functions",
            instructions: "Convert regular functions to arrow functions and understand 'this' binding.",
            starterCode: `// Convert to arrow function
const add = (a, b) => {
    
};

// Single line arrow function
const square = x => ;

// Arrow function in array method
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map();

console.log(doubled);`,
            xp: 30,
            requiredPatterns: ['=>', '() =>']
        },
        {
            title: "Promises and Async",
            instructions: "Create and handle promises, and use async/await for asynchronous operations.",
            starterCode: `// Create a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        
    });
};

// Use async/await
async function getData() {
    try {
        
    } catch (error) {
        
    }
}

getData();`,
            xp: 45,
            requiredPatterns: ['Promise', 'async', 'await']
        },
        {
            title: "API Fetch",
            instructions: "Use the Fetch API to get data from a public API and display it.",
            starterCode: `// Fetch data from API
async function fetchUser() {
    try {
        const response = await fetch('');
        const user = await response.();
        console.log(user);
        
        // Display user data
        document.getElementById('userData').textContent = ;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchUser();`,
            htmlStructure: `<div id="userData">Loading user data...</div>`,
            xp: 50,
            requiredPatterns: ['fetch', 'await', 'json()']
        },
        {
            title: "Local Storage",
            instructions: "Store and retrieve data from the browser's local storage.",
            starterCode: `// Store data
const user = { name: 'John', age: 30 };
localStorage.('user', JSON.stringify());

// Retrieve data
const storedUser = JSON.parse(localStorage.('user'));

// Update data
storedUser.age = 31;
localStorage.('user', JSON.stringify(storedUser));

console.log('Stored user:', storedUser);`,
            xp: 35,
            requiredPatterns: ['localStorage.setItem', 'localStorage.getItem', 'JSON.stringify', 'JSON.parse']
        },

        // Note: Continue this pattern for all 100 levels
    ];
}

function generateJsLevels() {
    const levels = getJsLevels();
    
    for (let i = 21; i <= 100; i++) {
        levels.push({
            title: `JavaScript Mastery Level ${i}`,
            instructions: `Advanced JavaScript challenge focusing on modern ES6+ features, design patterns, and complex problem-solving.`,
            starterCode: `// JavaScript Challenge Level ${i}
// Implement the solution according to instructions

function solveChallenge() {
    
}

solveChallenge();`,
            xp: Math.min(100, 40 + Math.floor(i / 3)),
            requiredPatterns: ['function', 'const']
        });
    }
    
    return levels;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getJsLevels: generateJsLevels };
}