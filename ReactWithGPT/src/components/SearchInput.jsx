import React from 'react';
import api from '../api';

const SearchInput = ({ inputValue, 
                      setInputValue, 
                      setKeywordLength, 
                      searchMemberData, 
                      setLoading, 
                      setError, 
                      setResponseData }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = searchMemberData();

    try {
      const res = await api.post('/member/search', data);
      setResponseData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Member Search</h1>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={(e) => {
          setInputValue(e.target.value);
          setKeywordLength(e.target.value.length);
        }} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};
export default SearchInput;