import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.areDisable(value);
    });
  };

  areDisable = (name) => {
    const numero = 2;
    this.setState({
      disabled: (name.length < numero),
    });
  };

  render() {
    const { state: {
      disabled }, handleChange,
    } = this;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ handleChange }
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
