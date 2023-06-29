import {  useState } from 'react';
import { ButtonInput, ButtonSearch, DivSearch, FormSearch, InputSearch } from './Searchbar.styled';

import { BsSearch } from 'react-icons/bs';


export const SearchBar = ({handelTextContext})=>{
  const [value, setValue]=useState('');

 const handelChange = (event) => {
  setValue(event.target.value);
  };

  const handelSubmit = (event) => {
   event.preventDefault();
  handelTextContext(value);
  };

  return (<DivSearch>

    <FormSearch onSubmit={handelSubmit}>
      <ButtonSearch type="submit">
        <ButtonInput >Search</ButtonInput>
        <BsSearch />
      </ButtonSearch>
    
      <InputSearch
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handelChange} value={value}
      />
    </FormSearch>

    </DivSearch>)
  
}

