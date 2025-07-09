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
- CORS protection is complementary to JWT tokens: the former protects request *sources*, the latter protects request *identities*.



##  React &  JSX

###  What is React?

- React is a **JavaScript library** for building user interfaces, especially for **component-based UIs**.
- It focuses on **declarative rendering** — you describe *what* the UI should look like based on *state*, and React handles the updates.

---

###  Key Concepts

- **Component-based**: UI is broken into small reusable pieces.
- **Declarative**: You describe the UI with code; React updates the DOM for you.
- React works with a **virtual DOM** and updates only what’s changed.

---

###  What is JSX?

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
