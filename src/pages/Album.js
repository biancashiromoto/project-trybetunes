import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    songsArray: [],
    collectionInfo: '',
    favSongs: null,
    isLoading: true,
  };

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const splittedAlbum = pathname.split('/');
    const splittedAlbumLength = splittedAlbum.length - 1;
    const albumId = splittedAlbum[splittedAlbumLength];
    const fetchedAlbum = await getMusics(albumId);
    const songsArray = fetchedAlbum.slice(1, fetchedAlbum.length);
    this.setState({
      songsArray,
      collectionInfo: fetchedAlbum[0],
      favSongs: await getFavoriteSongs(),
      isLoading: false,
    });
  }

  render() {
    const { songsArray, collectionInfo, favSongs, isLoading } = this.state;
    const { artistName, collectionName, artworkUrl100 } = collectionInfo;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-info-container">
          <img
            className="album-img"
            src={ artworkUrl100 }
            alt={ `Álbum ${collectionName} de ${artistName}` }
          />
          <div className="album-text-info">
            <span>Album</span>
            <h3 data-testid="artist-name">{artistName}</h3>
            <h4 data-testid="album-name">{collectionName}</h4>
          </div>
        </div>
        <div className="albums-container">
          {songsArray.map((song) => {
            const { trackName, previewUrl, trackId } = song;
            return (<MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              checked={ favSongs.some((favSong) => favSong.trackId === trackId) }
              favSongs={ favSongs }
            />);
          })}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
