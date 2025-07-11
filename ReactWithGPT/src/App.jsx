import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keywordLength, setKeywordLength] = useState(0);

  const searchMemberData = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^02\d{7,8}$/;

    if (emailPattern.test(inputValue)) {
      return { Email: inputValue };
    } else if (phonePattern.test(inputValue)) {
      return { PhoneNumber: inputValue };
    } else {
      return { NamePiece: inputValue };
    }
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/members">Members</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={
          <Members 
            inputValue={inputValue}
            setInputValue={setInputValue}
            setKeywordLength={setKeywordLength}
            setLoading={setLoading}
            setError={setError}
            setResponseData={setResponseData}
            searchMemberData={searchMemberData}
            loading={loading}
            error={error}
            responseData={responseData}
            keywordLength={keywordLength}
          />
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;