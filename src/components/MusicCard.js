import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      checked,
    };
  }

  state = {
    isLoading: false,
  };

  componentDidMount() {
    const { trackId, favSongs } = this.props;
    const isFavorite = favSongs.includes(trackId);
    if (isFavorite) {
      this.setState({
        checked: true,
      });
    }
  }

  handleCheckboxChange = async () => {
    const { checked } = this.state;
    const { trackId } = this.props;
    this.setState({
      checked: !checked,
      isLoading: true,
    });
    if (!checked) {
      addSong(trackId).then(() => {
        this.setState({
          isLoading: false,
          checked: true,
        });
      });
    }
    if (checked) {
      removeSong(trackId).then(() => {
        this.setState({
          isLoading: false,
          checked: false,
        });
      });
    }
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const {
      checked,
      isLoading,
    } = this.state;

    if (isLoading) return <Loading />;
    return (
      <div className="music-card">
        <h4>{trackName}</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            checked={ checked }
            onChange={ () => {
              this.handleCheckboxChange();
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  favSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool,
};

MusicCard.defaultProps = {
  checked: null,
};

export default MusicCard;
