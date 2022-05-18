import React, { useState } from 'react';

const SearchForm = (props) => {
    //this is a hook
    //useState creates state variable called inputText
    //returns setInputText
  const [inputText, setInputText] = useState("");

  const handleChangeInput = (event) => {
    setInputText(event.target.value);
    console.log(inputText);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(inputText);
  };

  return (
      //<input> control called onChange
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label htmlFor='search-term'>Search for</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter search term here'
            onChange={handleChangeInput}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
