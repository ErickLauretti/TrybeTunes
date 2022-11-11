import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Loguin extends Component {
  state = {
    name: '',
    disableButton: true,
    loading: false,
    link: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.areDisable(value);
    });
  };

  handleClick = () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name }).then(() => {
      this.setState({
        loading: false,
        link: true,
      });
    });
  };

  areDisable = (name) => {
    const numero = 3;
    this.setState({
      disableButton: (name.length < numero),
    });
  };

  render() {
    const { state: {
      name,
      disableButton,
      loading,
      link }, handleChange, handleClick } = this;

    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : (
            <div>
              <form>
                <label htmlFor="Nome">
                  <input
                    type="text"
                    data-testid="login-name-input"
                    name="name"
                    value={ name }
                    placeholder="Nome"
                    onChange={ handleChange }
                  />
                </label>
              </form>

              <button
                disabled={ disableButton }
                data-testid="login-submit-button"
                type="button"
                onClick={ handleClick }
              >
                Entrar
              </button>
              { link && <Redirect to="/search" />}
            </div>
          )}
      </div>
    );
  }
}
