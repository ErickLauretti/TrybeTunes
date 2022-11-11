import React, { Component } from 'react';
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
      </header>
    );
  }
}
