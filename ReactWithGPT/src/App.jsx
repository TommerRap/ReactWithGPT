import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/index.js'

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.post("member/search", { NamePiece: "jessica" });
        setResponseData(result.data);
        // console.log(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && (
          <ul>
            {responseData.map(member => (
              <li key={member.id}>
                {member.firstName} {member.lastName} - {member.phoneNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <Form /> */}
    </>
  )
}

function ScoreBoard({ score }) {
  const name = "Tommer";

  return (
    <div>
      {
        score >= 90 ? (
          <p style={{ color: 'gold' }}>High Pass!</p>
        ) : score >= 80 ? (
          <p style={{ color: 'green' }}>Good Pass!</p>
        ) : score >= 60 ? (
          <p style={{ color: 'grey' }}>Pass</p>
        ) : (
          <p style={{ color: 'red' }}>Failed.</p>
        )
      }
    </div>
  );
}

function Greetings({ name }) {
  return (
    <div>
      <h2>Greetings!</h2>
      <h2>Hi there, {name}</h2>
    </div>
  )
}

function NameInput() {
  const [val, setVal] = useState("");
  return (
    <div>
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <p>Your Name is :{val ? val : "stranger"}</p>
    </div>
  );
}

// function Form() {
//   const [inputValue, setInputValue] = useState('');
//   const [formData, setFormData] = useState({});

//   const typeCast = () => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^02\d{7,8}$/;

//     if (emailPattern.test(inputValue)) {
//       //console.log("Email!")
//       return {
//         ...formData,
//         Email: inputValue
//       }
//     } else if (phonePattern.test(inputValue)) {
//       //console.log("Phone Number!")
//       return {
//         ...formData,
//         PhoneNumber: inputValue
//       }
//     } else {
//       //console.log("Name Piece!")
//       return{
//         ...formData,
//         NamePiece: inputValue
//       }
//     }
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = typeCast();
//     console.log("Submit:",data);
//     const result = await api.post("/member/search", data);
//      console.log(result);
//   }

//   return(
//   <form onSubmit={handleSubmit}>
//     <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
//     <button>Submit</button>
//   </form>
//   )
// }



export default App;
