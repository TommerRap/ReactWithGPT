[TOC]



# JavaScript

## Variables

### Variable Declaration

Javascript uses these three ways to declare variable.	

```javascript
var a;
let b;
const c;
```



- ```Var``` is function-scoped, and sometimes global. Nowadays we should avoid using var to declare a variable due to the confusing scope behaviour.
- ```let``` is block scoped.
- ```const```, self-explanatory, is a constant. Variables declared by ```const``` cannot be modified or reassigned. ```const``` is block-scoped.



---



### Hoisting

In JavaScript, variables and functions are **hoisted**, meaning their declarations are moved to the top of their scope during the creation phase.

```javascript
console.log(a);
var a = 10;
//This code would actually output "undefined",rather than throwing errors.
```

**What does Javascript really do in the code above?**

```java
var a;   // Creation Phase, var a hoisted.
console.log(a);//✅ a exists, but hasn't been assigned, hence Undefined.
a = 10;//Assignments happens accroding to the order of the code. Assignments will not be hoisted.
```

#### Different Hoisting Behaviours

| Declaration Type      | Hoisted Status | Behaviour After Hoisting                                     |
| --------------------- | -------------- | ------------------------------------------------------------ |
| var                   | ✅              | Hoisted, as undefined                                        |
| let/const             | ✅              | Hoisted, but in [TDZ](#How-JavaScript-Engine-Runs-:-Two Phases). Engine pretends doesn't know them, throw an error upon access. |
| function(declarative) | ✅              | Entire function hoisted, can call anytime.                   |
| function(expression)  | ❌              | Treated as variable, not hoisted.                            |



---



### How JavaScript Engine Runs : Two Phases

1. Creation Phase
   - JS Scans the scope.
   - Finds all variables -> Declaration now all exists.
   - For ```let``` and ```const``` declaration, they are marked as being in the **Temporal Dead Zone**(TDZ). The Engine knew that they're there, but you just can't access them until they've been actually declared in your code.
2. Execution Phase
   - Attempts to ```console.log(abc)```
   - JS realised that abc is not declared by ```var```, and also not yet declared in the codes. Despite the Engine knows that ```abc``` will be declared somewhere, they still be like **Nope. You are not supposed to be born yet.**
   - Throws a **ReferenceError**



---



## Functions

### Declaration of functions

| Declaration Type     | Example                            | Hoist | Feature                                                |
| -------------------- | ---------------------------------- | ----- | ------------------------------------------------------ |
| Function Declaration | ```function add() { ....}```       | ✅     | Callable before declaration                            |
| Function Expression  | ```const add = function() {...}``` | ❌     | Nice to use as [callback function](#callback-function) |
| Arrow Function       | ```const add = () => {...}```      | ❌     | Inherit ```this``` from outside                        |



### Arrow Function vs. Regular Function

> A **regular function** is a function defined using the function keyword,
>
> An **arrow function** is a concise way to write functions using the => syntax.

| Feature                    | Regular Function                                      | Arrow Function                                 |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| ```this``` binding         | Dynamic (depends on the object invoking the function) | Static, inherit ```this``` from defining scope |
| ```arguments``` Object     | Own [arguments](#Argument-Object)                     | Does **NOT** have its own                      |
| Can be used with ```new``` | ✅  new-able                                           | ❌ non-new-able                                 |
| Best Used Case             | Complex Logic, needs ```this```                       | Simple callbacks, no ```this``` needed         |
| Usage Style                | Can be declaration or expression                      | Only used as expression                        |



---



### Argument Object

In [Regular Function](#arrow-function-VS.-regular-function) you can access all passed-in arguments using a special **pseudo-array object**(伪数组) called arguments (it's an object), **even if no parameters are explicitly defined**.

```javascript
function showArgs() { // No parameters defined in ()
  console.log(arguments); // still can get arguments.
}

showArgs(1, 2, 3); 
// Output: [1, 2, 3] (array-like object)
```

#### Regular Function Arguments

Regular functions have their "own" arguments. That means when you reference arguments, they get **the actual argument** passed into that specific function.

```javascript
function foo() {
  console.log(arguments);
}
foo(10, 20); // ✅ Outputs: [10, 20]
```

#### Arrow Function Arguments

Arrow functions **do not have their own `arguments` object**.  However, they **can still receive parameters** when invoked — as long as those parameters are explicitly declared in the function’s parameter list.

In the case of [callback functions](#callback-function), the caller (e.g. `.map()` or `setTimeout()`) passes values **positionally** into the arrow function. These values are **not stored in an `arguments` object**, but instead must be captured through explicitly declared parameters, like `(x, i)`.

Arrow functions **can also access the `arguments` object from an outer (non-arrow) function scope**, due to lexical scoping, but they do not generate one themselves.

```javascript
const foo = () => {
  console.log(arguments); // ❌ ReferenceError: arguments is not defined
}
foo(10, 20); // passing in
```

ArrowFunctions inherit arguments from the outer scope.

```javascript
function outer() { // < ------------
  const inner = () => { 			//    |  Refers back to the parameter in outter scope.
    console.log(arguments);// ------|
  };
  inner(1, 2); // ❌ This doesn't work
}
outer(10, 20); // ✅ inner prints outer's arguments
```



---



### Callback Function

#### Core Definition

A **callback** function is a function you write and pass into another function or API, to be executed later.
You don’t call it directly – someone else will call it for you at the right time, depending on the logic for specific functions. 

**Example**:

```javascript
function runLater(callback, delay) {
  console.log("Task scheduled...");

  setTimeout(() => {

    callback(); // 👈 This is where the passed-in function gets "called back"!
  }, delay);
}
```

**Usage:**

```javascript
runLater(() => {
  //Pass in the function as a parameter. In this case, defined as "callback" in 	    		 	 //runLater(callback,delay)
  console.log("I'm the function you passed in, now being called!"); 
}, 2000);
```





---



#### Callback Protocol

In JavaScript, many higher-order functions (like `.map()`, `.filter()`, `setTimeout()`, etc.) accept a **callback function** as an argument.

As defined in [Core Definition](#Core-Definition),These functions **do not expect you to call the callback yourself**. Instead, they internally invoke the callback and automatically **pass specific values** into it.

This automatic value-passing behaviour is what we refer to as the **callback protocol** — the set of arguments that the host function will supply to your callback each time it calls it.

##### Key Characteristics of a Callback Protocol

- You write a function definition (usually anonymous, often an arrow function)
- The host function (e.g. `.map()`) will call that function multiple times
- Each time, it will pass in a defined set of arguments — this is the **protocol**
- You can choose to declare as many or as few parameters as you need
- Values are matched by **position**, not by name

```js
someArray.map((a, b, c) => {
  // a = current element
  // b = index
  // c = original array
});
```



**Example : map() Callback Protocol**

```array.map((element, index, array) => { ... });```

This does **not mean** that you should pass in element, index, or array yourself. Instead, this means that .map() will provide them for you automatically for you to use in the arrow-function you pass in — you just need to declare how many you want to receive.

When you're calling ```.map((n)=>{})```You can choose to declare as many or as few parameters as you need. 
Values are passed **by position** — not by name.  E.g., in the case of```.map((n)=>{})``` , n represents the ```element``` that map supplies when calling the arrow-function you passed in. The first argument receives the first value, the second receives the second, and so on.



##### Skipping Parameters in Callback Functions

In callback protocols like `.map((element, index, array) => {...})`, as discussed in the previous section, arguments are passed **by position**, not by name. This means:  **If you skip declaring an earlier parameter, later values will "shift left" into the wrong position.**



**Example: using `index` without `element`**

If you want to use only the `index` but not the `element`, you still need to declare a first parameter to “hold the place”.

> ✅Correct:

```js
array.map((_, index) => {
//	_ is a common convention for an unused parameter.
//  If you omit it entirely, index will incorrectly receive the element value.
 return index * 2;
});
```



> ❌Incorrect:

```js
array.map((index) => {
  return index * 2;
});
// This treats `index` as the 'element' in the protocol, not the actual index!
```



---



##  Array

This section summarizes commonly used array transformation methods in JavaScript.



###  Arrays Are Objects (See also [Strings , Arrays as Object](#Strings-,-Arrays-as-Object))

In JavaScript, arrays are actually a special kind of iterable object.

```js
typeof [] === "object"; // true
```

- The keys of an array are **stringified numbers**, like `"0"`, `"1"`, etc, not actual ```number``` type numbers.

```js
const arr = ['Tom','Jerry'];
//Can be considered as 
// const arr ={
//    "0" : 'Tom'
//    "1" : 'Jerry'
//}
```

- Arrays can have custom properties (e.g. `arr.custom = "x"`) just like objects

This means:

```js
arr[0] === arr["0"]; // ✅ true
```



###  `.concat()`

`.concat()` is used to **merge arrays**.  
It returns a **new array** without modifying the original ones.



**Syntax**

```js
array1.concat(array2, array3, ...)
```

- Accepts one or more arrays or values.
- Does not mutate `array1`.



**Examples**

```js
let result =[1, 2].concat([3, 4]);         
// result = [1, 2, 3, 4]

["a"].concat(["b"], ["c", "d"]);
// ["a", "b", "c", "d"]

[1, 2].concat(3, 4);           
// [1, 2, 3, 4]
```



---



###  `.slice()`

`.slice()` creates a shallow copy of a portion of an array and returns it as a new array.  
It does **not** modify the original array.



 **Syntax**

```js
array.slice(start, end)
```

- `start`: Starting index (inclusive)
- `end`: Ending index (exclusive)
- If `end` is omitted → slice to the end
- If `start` is negative → counted from the end

 

**Examples**

```js
const arr = ["a", "b", "c", "d", "e"];

arr.slice(1, 4);    // ["b", "c", "d"]
arr.slice(2);       // ["c", "d", "e"]
arr.slice(-3);      // ["c", "d", "e"]
arr.slice(-4, -1);  // ["b", "c", "d"]
```



**Notes**

- Negative indices count from the end.
- When using a single negative value like `slice(-3)`, the result starts from that position and continues to the end.
- The original array is not modified.



---

###  `.splice()`

`.splice()` is used to **insert**, **delete**, or **replace** elements in an array.  
Unlike `.slice()`, it **modifies the original array** (destructive).



 **Syntax**

```js
array.splice(start, deleteCount, item1?, item2?, ...)
```

- `start`: Index where the change begins
- `deleteCount`: Number of elements to remove (starting at `start`)
- `item1...`: Optional elements to insert at `start`



**Examples**

```js
// Delete
["a", "b", "c"].splice(1, 1);       
// → deletes "b" → ["a", "c"]

// Insert
["a", "b", "c"].splice(1, 0, "X", "Y"); 
// → ["a", "X", "Y", "b", "c"]

// Replace
["a", "b", "c"].splice(1, 1, "Z");  
// → replaces "b" with "Z" → ["a", "Z", "c"]
```



**Notes**

- Returns an array of deleted elements
- A deleteCount of `0` means "just insert"
- You can use it for complex edits like:
  - Replace multiple elements with new ones
  - Delete and insert in one step
  - Reorder with splice + index



**Tip**

> `.splice(start, deleteCount, ...)`  
> = From `start`, delete `deleteCount`, then insert your new elements right there.



---

###  `.indexOf()`

`.indexOf()` searches an array for a specific value and returns its **first index**.



 **Syntax**

```js
array.indexOf(searchElement, fromIndex?)
```

- `searchElement`: The value to search for
- `fromIndex`: (Optional) Start searching from this index



**Examples**

```js
const arr = ["a", "b", "c", "b"];

arr.indexOf("b");      // 1
arr.indexOf("c");      // 2
arr.indexOf("b", 2);   // 3
arr.indexOf("x");      // -1  ← not found
```



**Notes**

- Returns the index of the **first match**
- Returns `-1` if the value is **not found**
- Strict equality (`===`) is used for matching
- Often combined with `.splice()` for safe deletions:

```js
const idx = arr.indexOf("c");
if (idx !== -1) arr.splice(idx, 1);
```



---



###  `.map()`

`.map()` is used to **transform an array**. It creates a **new array** by applying a transformation function to each element in the original array.

```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// [2, 4, 6]
```



**Callback Protocol**

```array.map((element, index, array) => { ... })`

- element: current item

- index: index of current item

- array: the original array

  

**Key Points**

- Returns a new array.
- Does not modify the original array.

- The callback receives `(element, index, array)` — use only what you need.

- Parameters are **position-based**, not name-based.



**Example: add numbering**

```js
const names = ["Tommer", "Li", "Anna"];
const greetings = names.map((name, index) => {
 return \`\${index + 1}. Hello, \${name}\`;
});

// ["1. Hello, Tommer", "2. Hello, Li", "3. Hello, Anna"]

```



**Example: use index only**

```js
const result = names.map((_, index) => index * 2);
// [0, 2, 4]
```



---



###  `.filter()`

`.filter()` is used to **remove elements** that do not meet a condition. It returns a new array of elements that pass the test.

```js
const nums = [1, 2, 3, 4];

const evens = nums.filter(n => n % 2 === 0);

// [2, 4]
```



**Callback Protocol**

```array.filter((element, index, array) => { ... })```

- element: current item
- index: index of current item
- array: the original array



**Key Points**

- Returns a new array.

- Does not modify the original array.

- Keep elements by returning `true`; exclude by returning `false`.

 

**Example: filter by string length**

```js
const people = ["Tommer", "Li", "Anna", "Jonathan"];
const filtered = people.filter(name => name.length >= 5);
// ["Tommer", "Anna", "Jonathan"]
```



 **Example: filter by index**

```js
const result = people.filter((_, index) => index % 2 === 0);
// ["Tommer", "Anna"]
```



---



## Object

### Accessing Object Properties

There are two main ways to access values inside a JavaScript object:



#### Dot Notation

```js
const obj = { name: "Tommer" };
obj.name; // "Tommer"
```

- Used when the property name is a fixed string
- Cannot use variables or dynamic keys



#### Bracket Notation

```js
const obj = { name: "Tommer" };
const key = "name";
obj["name"];   // "Tommer"
obj[key];      // "Tommer"
```

- Required when using **variables as keys**
- The value inside brackets is evaluated first
- Works for dynamic lookups



#### Common Pitfalls

```js
const obj = { tomato: "red" };
const fruit = "tomato";

obj["tomato"];   // "red" ✅
obj[fruit];      // equals to obj["tomato"], because variable fruit = "tomato" ✅
obj["fruit"];    // undefined ❌
obj.fruit;       // undefined ❌
```



---



###  `Object.entries()`

> See this section together with [Object Traversal: `for...in` vs `for...of`](#Object-Traversal:-`for...in`-vs-`for...of`) below together.

Returns an array of a given object's own enumerable property `[key, value]` pairs.

**Syntax**

```js
Object.entries(obj)
```

- Input: a plain object (`{ a: 1, b: 2 }`)
- Output: a 2D array like `[["a", 1], ["b", 2]]`



 **Example**

```js
const user = {
  name: "Tommer",
  age: 25
};

const entries = Object.entries(user);
// → [ ["name", "Tommer"], ["age", 25] ]

for (const [key, value] of entries) {
  console.log(`${key}: ${value}`);
}
// Output:
// name: Tommer
// age: 25
```



**Typical Use Cases**

- Loop through both keys and values at once
- Convert object to iterable (for `for...of` )
- Easily destructure key-value pairs



 **Related:**

| Method                | Description                  |
| --------------------- | ---------------------------- |
| `Object.keys(obj)`    | Returns keys only            |
| `Object.values(obj)`  | Returns values only          |
| `Object.entries(obj)` | Returns `[key, value]` pairs |

---



---



### Object Traversal: `for...in` vs `for...of`

> When reading this section, consider all strings and arrays as Objects, and have their own key and value. Although those are not 100% equal to plain objects, doing it this way can help you better the difference between ```for...in``` and ```for...of```



#### Strings , Arrays as Object

Strings are considered special arrays, and arrays are considered special objects in JavaScript. Hence they are iterable using their key (also index).

```js
const str = "hi";
//const str {
//  "0" : 'h',
//	"1" : 'i'
//}

for (const i in str) {
  console.log(i); // "0", "1" (indices)
}

for (const ch of str) {
  console.log(ch); // "h", "i" (characters)
}
```



---



#### `for...in` - Enumerates keys 

```js
const arr = ["a", "b"];
arr.custom = "Tommer";

for (const key in arr) {
  console.log(key); // "0", "1", "custom"
}
```

- Keys enumerated by `for...in` includes custom ones, but not the non-iterable ones, e.g. `.length`
- Used on plain objects or arrays when you want to see all **enumerable property names**
- Returns keys as strings: `"0"`, `"1"`, `"custom"`



---



#### `for...of` - Iterates iterable values

```js
const arr = ["a", "b"];
for (const val of arr) {
  console.log(val); // "a", "b"
}
```

- Works only on iterable objects (`Array`, `String`, `Map`, `Set`, etc.)
- Requires internal `[Symbol.iterator]` method



---



#### Plain Objects

Plain Objects  are **not iterable**.

```js
const obj = { a: 1, b: 2 };
for (const val of obj) {} // ❌ TypeError
```

Fix it by:

```js
for (const [k, v] of Object.entries(obj)) {
  console.log(k, v);
}
```

Or convert to array:

```js
const arr = Array.from({ 0: "x", 1: "y", length: 2 });
```



---



#### Key Concepts - Object Traversal

| Feature       | `for...in`                      | `for...of`                     |
| ------------- | ------------------------------- | ------------------------------ |
| Works on      | Any object                      | Only iterable objects          |
| Iterates      | Keys (as strings)               | Values                         |
| Use case      | Objects, arrays (as keys)       | Arrays, strings, entries, etc. |
| Hidden props? | Skips non-enumerable properties | Skips anything not in iterator |
| Custom props? | ✅ Yes                           | ❌ No                           |



### Destructuring Assignment

Destructuring assignment is a JavaScript syntactic sugar that allows unpacking values from arrays or properties from objects into distinct variables. It improves readability and reduces boilerplate when extracting structured data.

---

#### Object Destructuring

    const user = {
      name: "Tommer",
      age: 26
    };
    
    const { name, age } = user;
    // name -> "Tommer"
    // age  -> 26

- **Default Value**: Used when a property does not exist in the object.

    `const { nickname = "NoName" } = {};`

- **Renaming Variable (Alias)**: Rename the key to a new local variable name.

    `const { name: username } = user;`

- **Nested Destructuring**: Access nested objects.

    ```javascript
    const user = {  
    	address: {
        city: "Auckland",
        postcode: "1010"
      }
    };
    const {
      address: { city, postcode }
    } = user;
    ```

    

- **Nested + Alias + Default Value**

    ```javascript
    const {
      address: { city: town, postcode: zip = "0000" }
    } = user;
    ```
    
    
    
    

---

#### Array Destructuring

>Array destructuring assigns values based on **position**, not property names.
>
>Even though arrays are technically objects with string keys like "0", "1", and "2", destructuring with [] uses the **order of elements** rather than the keys themselves.



    const arr = ["Tommer", "Teacher"];
    const [student, instructor] = arr;
    // student -> "Tommer"
    // instructor -> "Teacher"

- **Skip Elements**:

    ```javascript
      const [first, , third] = ["a", "b", "c"];
      // first -> "a"
      // third -> "c"
    ```

---

#### Object vs Array Destructuring

- Object destructuring matches by **key name**
- Array destructuring matches by **position**
- Arrays are objects internally, so you *can* destructure an array using object syntax:

``` javascript
const arr = ["a", "b", "c"];
const { 0: first, 2: third } = arr;
// first -> "a"
// third -> "c"
```

---

#### Quote Rules

- In object destructuring, you don't need to quote keys if they are valid identifiers.
- Keys like `"0"`, ` "some-key"` or ` "with space"` **must be quoted**.

```javascript
const { name } = obj;          // valid
const { "0": first } = arr;    // must quote
```

In JavaScript, all object keys are internally stored as **strings** (unless they are Symbols).



## JSON

### What is JSON?

**JSON** (JavaScript Object Notation) is a lightweight data-interchange format. It is widely used to exchange data between clients and servers due to its simplicity and language-independent structure.

Key Characteristics:
- Text-based format derived from JavaScript object syntax
- Language-agnostic: supported by nearly all programming languages
- Human-readable and easy to parse by machines
- Commonly used in API payloads, configuration files, and local storage

Basic structure:
- Uses **key-value pairs**
- Keys must be strings in double quotes (`"..."`)
- Values can be:
  - string
  - number
  - boolean
  - null
  - object
  - array

Example:

~~~json
{
  "name": "Tommer",
  "age": 26,
  "skills": ["JavaScript", "React"],
  "active": true,
  "address": {
    "city": "Auckland",
    "zip": "1010"
  }
}
~~~

> Note: JSON does **not** support functions, `undefined`, or comments.



---



### JSON.stringify() and JSON.parse()

These two methods are essential for converting between JavaScript objects and JSON strings, which are commonly used in frontend-backend data communication, local storage, and API payloads.

#### `JSON.stringify()`

Converts a JavaScript object into a JSON string.

~~~js
const obj = { name: "Tommer", age: 26 };
const json = JSON.stringify(obj);
// json => '{"name":"Tommer","age":26}'
~~~

Notes:
- Only serializes data that is valid in JSON (objects, arrays, strings, numbers, booleans, null).
- Functions, `undefined`, and `Symbol` values are ignored during serialization.
- Nested structures are preserved.
- Used when sending data to a server or saving it as a string (e.g., localStorage).

---

#### `JSON.parse()`

Converts a JSON string into a JavaScript object.

~~~js
const json = '{"name":"Tommer","age":26}';
const obj = JSON.parse(json);
// obj => { name: "Tommer", age: 26 }
~~~

Notes:
- The input must be a valid JSON string.
- All keys and string values must use double quotes (`"`), not single quotes (`'`).
- Common use cases: parsing API responses, reading from localStorage.

---

#### Examples

~~~js
// Example 1: Ignored properties
const obj = {
  name: "Tommer",
  sayHi: () => "hello",
  value: undefined
};
console.log(JSON.stringify(obj)); // '{"name":"Tommer"}'

// Example 2: Restoring an object from JSON
const raw = '{ "theme": "dark", "fontSize": 16 }';
const settings = JSON.parse(raw);
console.log(settings.theme); // "dark"
~~~

---

#### Tip

When writing JSON strings in JavaScript, use single quotes `'...'` around the full string so that double quotes `"` inside the JSON body do not need to be escaped:

~~~js
const validJSON = '{ "name": "Tommer" }'; // ✅ clean and valid
const brokenJSON = "{\"name\": \"Tommer\"}"; // valid but harder to read
~~~



## Modularisation

The goal for modularisation is to split the code into small and clean pieces.  You can choose which ones to include only when needed.

> E.g:
>
> ​	Math.js is for mathematical methods only.
>
> ​	logger.js is used for logging
>
> ​	Main.js is the main programme.



**This could : **

- Improve readability and reusability
- Supports collaborative development
- Reduce naming conflicts



### Exporting Module

We're exporting our modules from `utils.js`

``` js
export const add = (a, b) => a+b
export const multiply = (a, b) => a * b
```

Or:

``` js
const add = (a, b) => a+b
const multiply = (a, b) => a * b
export {add, multiply}
```



### Importing Module

We're importing the modules that we just exported from `utils.js`

```js
import {add, multiply} form './utils.js';
console.log(add(2,3)) //Output 5
```



### Default Export

We're creating a default export `logger.js`

```js
//logger.js
export default function log(msg){
  console.log('LOG:,msg);
}
```

Then importing it in `main.js`

```js
//main.js
import log from './logger.js';
log('Hello'); //LOG: Hello
```



### Default export/import and named export/import

**Default export**, self-explanatory, is what the JS file would export to others by default if **no named import** is used. A named import should only look like `import { abc } from 'xx.js'`. If the `{}` does not exist, that's actually a **default import**

```js
//maths.js

export default log = ()=>{
  console.log('This is the Log function');
}
export const add = (a,b)=> a + b;
```

When `main.js` is importing  `import add from 'maths.js'`, the nature of the code is to import the **default** exportation from `maths.js`, instead of importing the `add` export from `maths.js. ` . The `import add` basically declares a variable `add`, rather than referring to the export `add` from `maths.js`.

This is what it actually does (pseudocode):

```js
const add;
add = default export of 'maths.js'
```

To specifically import a **named export** (in this case, `add`)from `maths.js`, we need to use **named import**

```js
import {add} from from 'maths.js'
```

| Concept        | Example Code                          |
| -------------- | ------------------------------------- |
| Named Export   | `export const log = () => {}`         |
| Named Import   | `import { log } from 'xx.js' `        |
| Default Export | `export default  const add = () =>{}` |
| Default Import | `import abcdef from 'xx.js'`          |

## Promises

A **Promise** is a built-in JavaScript object used to handle asynchronous operations. It acts as a container for a future result — success or failure — and provides a consistent way to attach logic to that result.

---

### Core Concepts

- A Promise represents a **future value**, like an async task you’ve started but not yet finished.
- It is commonly used with `fetch`, `axios`, timeouts, and all async code.
- It helps avoid callback hell and improves error handling.

---

### Promise States

| State       | Description                          |
| ----------- | ------------------------------------ |
| `pending`   | The async task has not completed yet |
| `fulfilled` | The task completed successfully      |
| `rejected`  | The task failed (threw an error)     |

---

### Creating a Promise

~~~js
const promise = new Promise((resolve, reject) => {
  // Do something async
  if (everythingOk) {
    resolve("✅ All good!");
  } else {
    reject("❌ Something went wrong.");
  }
});
~~~

- `resolve(value)` → transitions to **fulfilled**
- `reject(error)` → transitions to **rejected**

---

### Using `.then()` and `.catch()`

~~~js
promise
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
~~~

---

### Example: Delayed Promise

~~~js
function waitTwoSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("⏱️ Done after 2 seconds");
    }, 2000);
  });
}

waitTwoSeconds().then(msg => console.log(msg));
~~~

---

### Example: Conditional Milk Tea

~~~js
function orderMilkTea(available) {
  return new Promise((resolve, reject) => {
    if (available) {
      resolve("🧋 Milk tea is ready!");
    } else {
      reject("❌ No ingredients!");
    }
  });
}

orderMilkTea(true)
  .then(msg => console.log("✅", msg))
  .catch(err => console.log("💥", err));
~~~

---

### Summary

- Promises help manage async logic in a clean, chainable way.
- `resolve()` is for success, `reject()` for failure.
- `.then()` handles success, `.catch()` handles errors.
- Tools like Axios return Promises, which is why `.then()` and `.catch()` are used with them.
