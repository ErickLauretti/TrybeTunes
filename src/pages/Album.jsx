import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    album: '',
    songs: [],
    singer: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      songs: music,
      album: music[0].collectionName,
      singer: music[0].artistName,
    });
  }

  render() {
    const {
      album,
      songs,
      singer,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ singer }</h3>
        <h4 data-testid="album-name">{ album }</h4>
        {songs.slice(1).map((info) => (
          <MusicCard
            key={ info.trackId }
            music={ info }
            trackName={ info.trackName }
            trackId={ info.trackId }
            previewUrl={ info.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
