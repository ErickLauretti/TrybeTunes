import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  favSong = async ({ target }) => {
    this.setState({
      loading: true,
      checked: true,
    });
    const { checked } = target;
    const { music } = this.props;
    if (checked) {
      await addSong(music);
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const {
      loading,
      checked,
    } = this.state;

    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          <code>audio</code>
          .
        </audio>
        <label htmlFor="check">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="check"
            id="check"
            onChange={ this.favSong }
          />
        </label>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  previewUrl: PropTypes.string,
  music: PropTypes.object,
}.isRequired;
