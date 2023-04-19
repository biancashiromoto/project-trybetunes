import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import MusicCard from '../../components/MusicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading/Loading';
import '../../App.css';
import '../Album/Album.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favSongsList: [],
    checked: true,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const recoveredFavSongs = await getFavoriteSongs();
    const favSongsInfo = await Promise.all(recoveredFavSongs
      .flatMap(async (favSong) => getMusics(favSong)));
    this.setState({
      isLoading: false,
      favSongsList: favSongsInfo.flat(),
    }, console.log(this.state));
  }

  toggleCheckbox = (trackId) => {
    const { favSongsList, checked } = this.state;
    const songIndex = favSongsList.findIndex((song) => song.trackId === trackId);
    favSongsList.splice(songIndex, 1);
    const songsIds = favSongsList.map((favSong) => favSong.trackId);
    localStorage.setItem('favorite_songs', JSON.stringify(songsIds));
    this.setState({
      favSongsList: [...favSongsList],
      checked: !checked,
      isLoading: false,
    });
    console.log(favSongsList);
  };

  render() {
    const { favSongsList, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="main-container">
          <h2>Favorites</h2>
          <div className="list-container">
            {favSongsList.map(({ trackId, trackName, previewUrl }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                checked
                favSongs={ favSongsList }
                toggleCheckbox={ this.toggleCheckbox }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
