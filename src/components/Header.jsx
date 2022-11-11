import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = () => {
    getUser().then((e) => {
      this.setState({
        name: e.name,
        loading: false,
      });
    });
  };

  render() {
    const {
      name,
      loading,
    } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : <h2 data-testid="header-user-name">{ name }</h2>}
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Página de pesquisa
        </Link>
        <br />
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Músicas Favoritas
        </Link>
        <br />
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}
