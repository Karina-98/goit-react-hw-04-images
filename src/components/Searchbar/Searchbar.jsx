import { Component } from 'react';
import { ButtonInput, ButtonSearch, DivSearch, FormSearch, InputSearch } from './Searchbar.styled';

import { BsSearch } from 'react-icons/bs';


export class Searchbar extends Component {
  state = {
    value: '',
  };


  handelChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handelSubmit = (e) => {
   e.preventDefault();
  this.props.handelTextContext(this.state.value)
  
  };

  render(){
    return (<DivSearch>

    <FormSearch onSubmit={this.handelSubmit}>
      <ButtonSearch type="submit">
        <ButtonInput >Search</ButtonInput>
        <BsSearch />
      </ButtonSearch>
    
      <InputSearch
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={this.handelChange} value={this.state.value}
      />
    </FormSearch>

    </DivSearch>)
  };
}
