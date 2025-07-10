[TOC]

# Vite

Vite is a modern frontend build tool created by Evan You (author of Vue). Its name means "fast" in French, and its core goal is to provide a lightning-fast development experience through native ESM and on-demand compilation.

---

## What can Vite do?

- Instantly spin up a local dev server
- Provide lightning-fast hot module replacement (HMR)
- Support modern frontend frameworks (React, Vue, Svelte, etc.)
- Load `.env` configuration files
- Build and optimise production bundles

##  Why Vite instead of CRA/Webpack?

| Problem          | CRA / Webpack                   | Vite Solution                             |
| ---------------- | ------------------------------- | ----------------------------------------- |
| Slow startup     | Full bundling before dev starts | Native ESM + on-demand compilation        |
| Complex config   | Needs eject to customise        | Minimal config, extendable only if needed |
| Slow hot updates | Rebuild entire bundle           | Recompile only the module you touched     |

---

## How to create a React project with Vite

~~~bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
~~~

---

## Default Vite Project Structure

~~~text
my-app/
├── index.html
├── package.json
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
├── .env.local
├── vite.config.js
~~~

---

##  `.env` File

 `.env` File, or **environment variable file** , self-explanatory, is used to 

- All public environment variables must be prefixed with `VITE_`

- Use `import.meta.env.VITE_XXX` to access them in code

  ~~~env
  # .env.local
  VITE_API_BASE_URL=https://localhost:7070/api
  ~~~

  ~~~js
  console.log(import.meta.env.VITE_API_BASE_URL);
  ~~~

### Multiple `.env` files

~~~js
console.log(import.meta.env.VITE_API_BASE_URL);
~~~

📌 Vite supports layered env files: You can have multiple `.env` files in your project. E.g. `.env.local`, `.env.development`, `.env.development.local`. 

| File Name                | Loaded in       | Priority        |
| ------------------------ | --------------- | --------------- |
| `.env`                   | All modes       | low             |
| `.env.development`       | `npm run dev`   | medium          |
| `.env.production`        | `npm run build` | medium          |
| `.env.local`             | All modes       | ✅ highest       |
| `.env.development.local` | Dev only        | ✅ highest (dev) |



# Axios

> Axios is a HTTP client based on **Promise** object. It's specifically used for interacting with the back-end.\



## Axios vs. fetch

The advantages of Axios over fetch are:	

- Default JSON encoding and decoding (fetch has to manually res.json())
- automatic handling of request failures, status codes, etc.
- Interceptor mechanism, can be unified to add token / logging
- support for request cancelation, upload progress and other advanced features

##  Encapsulating Axios Requests

We can encapsulate  `axios` to create a reusable API module. This allows us to centralise base URL configuration, error handling, and request logic.



### Creating the Axios Instance

We created a new file `src/api/index.js`:

~~~js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
});

export default api;
~~~

- `axios.create()` returns a custom instance with predefined configuration
- The instance behaves like normal Axios: `.get()`, `.post()`, `.interceptors`, etc.
- `baseURL` comes from `.env.local`, defined as:
  ~~~env
  VITE_API_BASE_URL=https://localhost:7070/api
  ~~~
- Using this pattern avoids hardcoding URLs throughout the codebase

---

### Usage in Components

Inside a React component:

~~~js
import api from './api';

api.get('/Programmes')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
~~~

- Requests automatically prepend the configured `baseURL`
- Responses are handled using Promises via `.then()` / `.catch()`
- Axios handles JSON decoding automatically

---

### Key Takeaways

- Encapsulation promotes **separation of concerns**
- Base URL, timeouts, and interceptors are centralised
- This structure is compatible with future improvements like:
  - Auth token injection
  - Retry strategies
  - Central error logging

## CORS

In this section, we examined what CORS is, how it works, and how to handle it both from the backend (.NET) and via frontend proxy (Vite).

---

### What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security policy that restricts JavaScript code from making requests to a different origin (domain + port + protocol) than the one from which the page was loaded.

- It is enforced by the **browser**, not by the server or network.
- Tools like Postman or `curl` are not affected by CORS.

---

### Why does it happen?

If your frontend runs on `http://localhost:5173` and your .NET backend on `https://localhost:7070`, then the **ports and protocols differ**, triggering CORS.

The browser sends the request, but **will block the response** unless the server replies with the proper headers.

---

### Backend solution – UseCors in .NET

To explicitly allow your React frontend to call the backend, you must configure CORS policy in `Program.cs`:

~~~csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()       // 👈 temporary, not for production
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

app.UseCors();
~~~

- In production, replace `.AllowAnyOrigin()` with `.WithOrigins("https://your-frontend.com")`.
- CORS is often your **first line of defence**, not your only one.



###  Frontend alternative – Vite proxy

When backend access is restricted, Vite can forward API calls during development.

Example `vite.config.js`:

~~~js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7070',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
~~~

This avoids CORS by **pretending** the request is local to the browser, while Vite forwards it to the true target.

---

### Key Learnings

- CORS is triggered **by the browser**, not by the server.
- The server must respond with headers like `Access-Control-Allow-Origin` to permit access.
- `.AllowAnyOrigin()` is acceptable during development but unsafe for production.
- CORS protection is complementary to JWT tokens: the former protects request *sources*, the latter protects request *identities*

# React &  JSX

## React

### What is React?

- React is a **JavaScript library** for building user interfaces, especially for **component-based UIs**.
- It focuses on **declarative rendering** — you describe *what* the UI should look like based on *state*, and React handles the updates.

### Key Concepts

- **Component-based**: UI is broken into small reusable pieces.
- **Declarative**: You describe the UI with code; React updates the DOM for you.
- React works with a **virtual DOM** and updates only what’s changed.

## JSX

### What is JSX?

JSX (JavaScript XML) is a **syntax extension** to JavaScript that looks like HTML but is actually compiled to `React.createElement(...)` calls.

Example:

~~~js
const name = "Tommer";
const element = <h1>Hello, {name}!</h1>;
~~~

---

###  JSX vs HTML – Key Differences

| Feature            | HTML                 | JSX                        |
| ------------------ | -------------------- | -------------------------- |
| Class attribute    | `class="..."`        | `className="..."`          |
| Event binding      | `onclick="..."`      | `onClick={handler}`        |
| Self-closing tags  | `<input>`            | `<input />`                |
| Inline styles      | `style="color: red"` | `style={{ color: "red" }}` |
| Expression support | No                   | Yes, inside `{}`           |

---

###  Example – Score Display

~~~js
const score = 95;
const element = <h2>Tommer's score is {score}.</h2>;

const status = score >= 60
  ? <p style={{ color: "green" }}>Passed</p>
  : <p style={{ color: "red" }}>Failed</p>;
~~~

- `{}` is used to inject any JS expression (but not statements).
- Styles must be provided as JavaScript objects.

---

### ✅ Summary

- React components are written using JSX, which compiles to JS.
- JSX is not HTML – it has differences in naming, event syntax, and structure.
- Conditional rendering and variable interpolation are key JSX patterns.

## Functional Components

### Component

A component is a **function that returns JSX**.  
React uses these components as the building blocks of the UI.

~~~js
function Welcome() {
  return <h1>Hello, Tommer!</h1>;
}
~~~

---

### Core rules

| Concept           | Explanation                                       |
| ----------------- | ------------------------------------------------- |
| Function syntax   | Components are written as `function Name() {...}` |
| Capitalised names | Component names must start with a capital letter  |
| Return JSX        | Must return a single JSX root element             |
| Usage             | Use as `<ComponentName />` in other JSX           |

---

###  Example: ScoreBoard Component

~~~js
function ScoreBoard() {
  const score = 92;
  const name = "Tommer";
  return (
    <div>
      <h2>Score Board</h2>
      <p>{name}'s score is: {score}</p>
    </div>
  );
}
~~~

This component was used inside `App` like so:

~~~js
<ScoreBoard />
~~~

React renders the `ScoreBoard` component inline where it is called.

---

### Summary

- Functional components are pure JavaScript functions returning JSX
- Must follow capitalisation and return rules
- Custom components can be reused anywhere in JSX
- This is the foundation of scalable, modular React UI

Next: we will learn how to make components **dynamic** using `props`

## Props: Passing Data Between Components

###  What are props?

- Props (short for "properties") are parameters passed **from parent to child components**
- In JSX, they are written like HTML attributes:
  ~~~jsx
  <Greeting name="Tommer" />
  ~~~

- Inside the component, they can be accessed via:
  ~~~js
  function Greeting(props) {
    return <p>Hello, {props.name}</p>;
  }
  ~~~

Or destructured for better readability:

~~~js
function Greeting({ name }) {
  return <p>Hello, {name}</p>;
}
~~~

---

### Key Learnings

- Props are read-only and one-way: parent → child
- JSX supports both strings (`name="Tommer"`) and expressions (`score={92}`)
- Missing props do not crash the app – React renders them as empty
- Capitalised component names receive props; lowercase tags (e.g. `<div>`) don’t
- Props help make components **reusable and dynamic**



## Hooks

Hooks are **special functions provided by React** that allow you to “hook into” React features from within function components.

---

### Why Hooks?

Before Hooks, only **class components** could use features like `state`, `lifecycle`, or `context`.

Hooks enable those features in **function components**, which are now the standard in React development.

---

###  Common Built-in Hooks

| Hook          | Purpose                                   |
| ------------- | ----------------------------------------- |
| `useState`    | Store and update state in components      |
| `useEffect`   | Run side-effects (e.g. fetch data)        |
| `useRef`      | Persist values without causing re-renders |
| `useContext`  | Access global context data                |
| `useMemo`     | Cache expensive computed values           |
| `useCallback` | Memoise function references               |

---

### Example: `useState`

~~~js
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Count: {count}
    </button>
  );
}
~~~

- `useState(0)` returns a tuple `[count, setCount]`
- `count` is the current value
- `setCount` is the function to update it
- Updating state triggers **automatic re-render**

---

### Hook Naming Rules

- ✅ Must start with `use` (e.g. `useState`, `useMyHook`)
- ❌ Cannot be used in loops, conditionals, or nested functions
- ✅ Must be called at the **top level of the component**

These are enforced by React’s linter to maintain reliable state order.

---

### Mental model

> **Hooks give function components memory, side-effects, and interactivity.**

Without Hooks → components = static  
With Hooks → components = interactive, alive, dynamic

---

### Summary

- Hooks are how function components access “stateful features” of React

- `useState` is the first and most important Hook

- Others like `useEffect`, `useRef`, etc. build on this foundation

- Mastering Hooks = mastering modern React

  

## `useState` and Reactive Updates

This subsection introduces `useState`, React's most fundamental Hook, which allows components to maintain and update internal state.

---

### What is useState?

- `useState()` is a React Hook that enables components to **store and update values across renders**
- It returns a tuple `[value, setValue]`
- Updating the state via `setValue()` will **trigger a re-render** of the component

~~~js
const [count, setCount] = useState(0);
~~~

- `count`: current value
- `setCount`: function to update the value

---

### State does not update immediately

React state is **asynchronous** — calling `setCount(count + 1)` does **not** update `count` immediately.

~~~js
setCount(count + 1);
console.log(count); // Still old value!
~~~

React will schedule a re-render, and `count` will have the new value **in the next render cycle**.

---

### Functional update form

To avoid stale closure issues, especially in rapid/multiple updates, use the functional form:

~~~js
setCount(prev => prev + 1);
~~~

This form ensures React uses the **latest** value regardless of batching.

---

### What's in setCount?

The `setCount` function accepts either:

1. A **value**: `setCount(5)`
2. A **function**: `setCount(prev => prev + 1)` ← preferred in async/multiple updates

---

### ❗ Common mistake

❌ This is wrong:

~~~js
onClick={setCount(count + 1)}
~~~

It **executes immediately** and passes the return value (usually `undefined`) into `onClick`.

✅ Correct:

~~~js
onClick={() => setCount(count + 1)}  // runs on click
~~~

Or the safer version:

~~~js
onClick={() => setCount(prev => prev + 1)}
~~~

---

### Naming confusion: scope vs callback

~~~js
const [count, setCount] = useState(0);
setCount((count) => count + 1); // This 'count' is not the outer count
~~~

- The parameter `count` here is a **callback argument** passed in by React
- It shadows the outer `count` — better to use `prev` or `x` to avoid confusion

---

### Type-specific examples

| Type    | Example initial value            | Use case              |
| ------- | -------------------------------- | --------------------- |
| Number  | `useState(0)`                    | Counters              |
| String  | `useState("")`                   | Input fields          |
| Boolean | `useState(true)`                 | Toggle visibility     |
| Array   | `useState([])`                   | Lists, todos          |
| Object  | `useState({ name: "", age: 0 })` | Forms, grouped fields |

---

### Summary

- `useState` gives function components memory
- State is updated via `setX()`, triggering re-render
- Functional form (`prev => next`) is safest and most predictable
- React always re-executes the entire component function when state changes

## Conditional Rendering in React

This section covers three ways to render content conditionally in JSX.

---

###  Ternary expression

Use `condition ? A : B` when you have two (or more) output branches.

~~~js
{ score >= 60
  ? <p style={{ color: 'green' }}>Passed</p>
  : <p style={{ color: 'red' }}>Failed</p>
}
~~~

You can also nest ternaries to emulate if / else if / else logic, though it's less readable:

~~~js
{ score >= 90 ? (
    <p style={{ color: 'gold' }}>Excellent</p>
  ) : score >= 75 ? (
    <p style={{ color: 'green' }}>Good</p>
  ) : score >= 60 ? (
    <p style={{ color: 'orange' }}>Pass</p>
  ) : (
    <p style={{ color: 'red' }}>Fail</p>
  )
}
~~~

Use this only when readability remains acceptable.

---

### Short-circuit rendering with `&&`

When you only need to render something **if a condition is true**, use `&&`.

~~~js
{ isAdmin && <button>Go to Admin Panel</button> }
~~~

- If `isAdmin` is true → button is shown
- If false → React renders nothing

Note: falsy values like `0`, `false`, `undefined`, `null` are ignored in render output.

---

### `return null` – component-level conditional skip

Inside a component, you can terminate rendering early by returning `null`.

~~~js
function SecretBanner({ loggedIn }) {
  if (!loggedIn) return null;
  return <p>Welcome back!</p>;
}
~~~

This is useful when **the whole component should not render at all**.

---

###  `null` works anywhere

In JSX, if you return `null`, React will simply skip that block/component.

~~~js
{ score < 0 && null } // nothing is rendered
{ score >= 60 ? <p>Passed</p> : null } // fallback
~~~

---

### Summary

| Method        | Use case                           |
| ------------- | ---------------------------------- |
| Ternary       | Choose between A and B (or more)   |
| `&&`          | If true, render A; else nothing    |
| `return null` | Skip rendering the whole component |

## Rendering Lists with `.map()`

React supports rendering lists by mapping over arrays and producing JSX elements.

---

### Basic usage

Use the JavaScript `.map()` method to transform an array into a list of JSX nodes.

~~~js
const fruits = ["🍎 Apple", "🍌 Banana", "🍇 Grape"];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
);
~~~

Each list element **must have a `key`** prop to help React identify which items changed.

---

### `key`: Identity vs Order

In React, the `key` prop is used to help the virtual DOM diff algorithm recognise **which items changed, added, or removed** during re-rendering.

~~~js
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
~~~

#### Why is `key` required?

- React doesn't re-render the entire list
- It compares **new list keys with old list keys**
- `key` helps React:
  - Identify which items can be reused
  - Know which items were removed or added
- Without a stable `key`, React will fall back to **position-based diff**, which can break DOM state

#### Why `index` is dangerous

~~~js
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
~~~

Using `index` means the key will change if the array changes order, length, or gets filtered.

This can cause:

- ❌ DOM nodes reused incorrectly
- ❌ Input fields losing cursor/focus
- ❌ Unexpected bugs in animations or transitions

#### Use `item.id` (or any stable identity)

Prefer using a unique ID from your data:

~~~js
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
~~~

Even if an item is deleted, its ID should **never be reused**. This ensures correct identity tracking during diffing.

Think of:

- `item.id`: Who you are (identity)
- `index`: Where you're sitting (position)

####  Summary

| Key Type  | Meaning          | Stability  | Use Case                                     |
| --------- | ---------------- | ---------- | -------------------------------------------- |
| `index`   | Visual position  | ❌ Unstable | Static lists only                            |
| `item.id` | Logical identity | ✅ Stable   | ✅ Dynamic lists (filtering, reordering, etc) |

### Updating `useState` triggers re-render

React function components **re-run every time their state changes**.

~~~js
const [items, setItems] = useState(undefined);

return (
  <ul>
    {items?.map(item => <li key={item}>{item}</li>)}
  </ul>
);
~~~

When `setItems(...)` is called:

1. React queues the state update
2. In the next render cycle, it **re-executes the whole component function**
3. The `return` expression runs again using the **updated `items`**
4. The new JSX is diffed and rendered accordingly

This is why:

- `return (...)` isn't a one-time template, it's a re-evaluated expression
- JSX will always reflect the latest state/props
- `items?.map(...)` only runs once `items` is a real array

🧠 Think of `useState` as triggering a **re-invocation of your component function**, not just mutating data.



## Controlled vs Uncontrolled Components

In React, there are two ways to manage form inputs: **controlled** and **uncontrolled** components.

---

### Controlled Components

- A controlled component's input value is driven by **React state**
- You must bind `value={state}` and update it with `onChange`
- This ensures that the component always reflects the current state

~~~js
const [name, setName] = useState("");

return (
  <input
    value={name}
    onChange={e => setName(e.target.value)}
  />
);
~~~

Key characteristics:

| Aspect           | Controlled Component            |
| ---------------- | ------------------------------- |
| Value source     | React state                     |
| Updates via      | `setState()`                    |
| Real-time access | ✅ Always available              |
| React control    | ✅ Fully controlled by React     |
| Use cases        | Standard pattern for most forms |

---

### Uncontrolled Components

- An uncontrolled component's value is managed by the **DOM itself**
- Use `ref` to access the value when needed

~~~js
const inputRef = useRef();

return (
  <>
    <input ref={inputRef} />
    <button onClick={() => alert(inputRef.current.value)}>Show</button>
  </>
);
~~~

Key characteristics:

| Aspect           | Uncontrolled Component              |
| ---------------- | ----------------------------------- |
| Value source     | DOM input element                   |
| Updates via      | User typing                         |
| Real-time access | ❌ Must read via `ref.current.value` |
| React control    | ❌ Not controlled by React           |
| Use cases        | File uploads, legacy integrations   |

---

### Summary

| Type         | React State | Needs `ref` | Real-time Binding | Typical Use             |
| ------------ | ----------- | ----------- | ----------------- | ----------------------- |
| Controlled   | ✅ Yes       | ❌ No        | ✅ Yes             | ✅ Recommended default   |
| Uncontrolled | ❌ No        | ✅ Yes       | ❌ No              | File inputs, edge cases |

## Controlled Form: Multiple Fields + Validation

This section introduces how to build a basic form with **multiple fields**, a **shared change handler**, and **simple validation logic**.

---

### Managing multiple fields in one state

Instead of creating separate `useState` for each field, we use a single object to store all values:

~~~js
const [formData, setFormData] = useState({
  name: "",
  password: ""
});
~~~

Each input is identified using its `name` attribute. The shared `onChange` handler uses dynamic property assignment:

~~~js
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,  //use ...formData to keep the old form data
    [name]: value //only adjusting new inputs
  });
};
~~~

---

### Handling submission and validation

The form is submitted via `onSubmit`, not the button’s `onClick`. We also block the default browser refresh:

~~~js
const [error, setError] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.name || !formData.password) {
    setError("All fields are required!");
    return;
  }

  alert(JSON.stringify(formData));
  setError("");
};
~~~

---

### Error display via conditional rendering

~~~js
{error && <p style={{ color: "red" }}>{error}</p>}
~~~

If the `error` string is non-empty, it is shown in red above the form.

---

### Key Takeaways

- Store grouped form fields in an object via `useState`
- Use `<input name="xxx" />` to identify each field
- Use `...formData` + `[name]: value` to update only the changed field
- Always bind `onSubmit` on `<form>` to enable keyboard-triggered submission
- Show validation errors via conditional rendering



## Submitting Form Data to Backend

This section covers how to send controlled form data to a real backend (e.g. .NET API) using Axios.

---

### Scenario: Flexible Member Search

We connected to a backend endpoint that accepts any combination of:

- `PhoneNumber`
- `Email`
- `NamePiece`

The goal was to allow a single input field to detect the intent and dynamically populate the correct field.

```js
function Form() {
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({});
  const typeCast = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^02\d{7,8}$/;

    if (emailPattern.test(inputValue)) {
      //console.log("Email!")
      return {
        ...formData,
        Email: inputValue
      }
    } else if (phonePattern.test(inputValue)) {
      //console.log("Phone Number!")
      return {
        ...formData,
        PhoneNumber: inputValue
      }
    } else {
      //console.log("Name Piece!")
      return{
        ...formData,
        NamePiece: inputValue
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = typeCast();
    console.log("Submit:",data);
    const result = await api.post("/member/search", data,{
      headers: {
    "Content-Type": "application/json"
      }
    });
     console.log(result);
  }
  return(
  <form onSubmit={handleSubmit}>
    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
    <button>Submit</button>
  </form>
  )
}
```

---

### Step-by-step Workflow

1. **Single Input Field**: User enters a value into a generic `<input />`
2. **Pattern Matching (`typeCast`)**:
   - If input matches email pattern → `Email`
   - If input matches NZ phone pattern (e.g. `02xxxxxxxx`) → `PhoneNumber`
   - Otherwise → `NamePiece`
3. **Form submission (`onSubmit`)**:
   - Use `e.preventDefault()` to block page refresh
   - Dynamically build the payload
   - Send via `axios.post(...)` to the backend

---

### Key Lessons

| Challenge                                  | Solution                                                     |
| ------------------------------------------ | ------------------------------------------------------------ |
| `formData` not updated before request      | React state updates are async – used `typeCast()` result directly instead of relying on `formData` |
| `console.log(obj)` not showing real values | Used `console.log("X:", obj)` or `JSON.stringify(obj)` to debug |
| `ERR_SSL_PROTOCOL_ERROR`                   | Backend was HTTP, but Axios tried HTTPS – fixed by using `http://localhost:7070` |
| `400 BadRequest`                           | Field casing mismatch – used PascalCase keys to match .NET DTOs (`PhoneNumber`, not `phoneNumber`) |
| Missing response data                      | Axios responses are wrapped – used `response.data` to access real payload |

---

### Example: Clean Axios POST flow

~~~js
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = typeCast();

  try {
    const response = await api.post("/member/search", data);
    console.log("Result:", response.data);
  } catch (err) {
    console.error("Request failed:", err);
  }
};
~~~

---

### Summary

- Always treat `setState()` as async → don’t expect it to update immediately
- Use `axios.post(url, payload)` with correct casing and Content-Type
- Await responses and access `response.data`
- Check protocol and match your backend setup (`http vs https`)



## useEffect: Handling Side Effects in Components

`useEffect` is a React Hook for handling **side effects** — logic that is not part of rendering.

---

### What is a side effect?

Side effects include:

- Network requests
- `document.title` updates
- Timers (`setTimeout`)
- Subscriptions (`addEventListener`)
- Logging, focus changes, manual DOM access

These actions should not be executed **during rendering** because:

- They can cause repeated executions
- They may introduce bugs (e.g. infinite loops)
- They do not belong in pure UI logic

---

### Why `useEffect`?

React re-executes the **entire function body** every time the component renders.  
If you put side-effect code directly in the function, it will run **on every render**.

`useEffect` schedules the effect to run **after** rendering, based on a dependency list.

---

### Syntax

~~~js
useEffect(() => {
  // Run after render
});
~~~

You can add a second argument:

~~~js
useEffect(() => {
  console.log("input changed");
}, [inputValue]); // Only run when inputValue changes
~~~

---

### Execution rules

| Dependency    | When `useEffect` runs    |
| ------------- | ------------------------ |
| `[]` (empty)  | Once after initial mount |
| `[x, y]`      | When x or y changes      |
| no dependency | Every render             |

---

### Summary

- `useEffect` runs **after render**
- It should contain all **non-render** logic
- You can control when it runs with the dependency array
- Do **not** use `async` directly in `useEffect`; define an async function inside if needed
- 

## useEffect with async data fetching and status management

This section covers how to handle **async side effects** in React using `useEffect`, including:

- Fetching data from an API
- Tracking loading / error state
- Displaying results dynamically

---

### Goal

Auto-fetch data (e.g. members list) once the component loads, and display:

- A loading indicator while fetching
- The data if successful
- An error message if the request fails

---

### The 3-state model

~~~js
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState([]);
~~~

- `loading`: true when fetch starts; set to false on completion
- `error`: null if no error; contains string if fetch fails
- `data`: holds the successful response (default to empty array for safe `.map()`)

---

### Correct useEffect with async request

You can't write `useEffect(async () => { ... })`  
Instead, define an async function inside:

~~~js
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/members");
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  fetchData();
}, []);
~~~

---

### Rendering logic based on state

~~~js
if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;

return (
  <ul>
    {data.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
~~~

---

### What counts as a side effect?

| Triggered by       | Logic                  | Side Effect? | Reason                  |
| ------------------ | ---------------------- | ------------ | ----------------------- |
| Component mount    | Fetching data          | ✅ Yes        | External interaction    |
| User input         | Updating state/UI only | ❌ No         | Internal render update  |
| User input         | Triggers fetch         | ✅ Yes        | Invokes outside logic   |
| setTimeout         | Delay logic            | ✅ Yes        | Involves external timer |
| localStorage.write | Storing values         | ✅ Yes        | DOM API access          |

---

### Mental Model

- `useEffect` is not like writing sequential code — it’s a “hook registration”
- It tells React: **“After render, do this effect when X changes”**
- React will run your effect:
  - After initial render (if `[]`)
  - Whenever dependency values change (if `[x, y]`)
  - On every render (if no second argument)

---

### Summary

- Use `useEffect(() => {...}, [])` for “on load” logic
- Never directly put async inside `useEffect` — wrap it in a function
- Use safe default state values (`[]`, `null`) to avoid runtime errors
- Distinguish “user input = UI update” from “user input = async business logic”
