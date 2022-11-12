import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    singer: '',
    disableButton: true,
    loading: false,
    album: [],
    search: false,
    artist: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.areDisable);
  };

  areDisable = () => {
    const { singer } = this.state;
    this.setState({
      disableButton: (singer.length < 2),
    });
  };

  handleClick = () => {
    const { singer } = this.state;
    this.setState((prevState) => ({
      singer: '',
      artist: prevState.singer,
      loading: true,
    }));
    searchAlbumsAPI(singer).then((info) => {
      this.setState({
        loading: false,
        search: true,
        album: info,
      });
    });
  };

  render() {
    const {
      singer,
      disableButton,
      loading,
      album,
      search,
      artist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <input
                type="text"
                data-testid="search-artist-input"
                value={ singer }
                name="singer"
                placeholder="Artista"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disableButton }
                onClick={ this.handleClick }
              >
                Pequisar
              </button>
            </div>
          )}
        { search && (album.length ? (
          <div>
            <p>{ `Resultado de álbuns de: ${artist}` }</p>
            { album.map((data) => (
              <section key={ data.collectionId }>
                <img src={ data.artworkUrl100 } alt={ data.collectionName } />
                <Link
                  to={ `/album/${data.collectionId}` }
                  data-testid={ `link-to-album-${data.collectionId}` }
                >
                  { data.collectionName }
                </Link>
                <p>{ data.artistName }</p>
              </section>
            )) }
          </div>
        )
          : <p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}
