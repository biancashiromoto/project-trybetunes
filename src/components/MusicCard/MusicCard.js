import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
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
    const { trackId, toggleCheckbox } = this.props;
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
        toggleCheckbox(trackId);
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
        <div className="player-container">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            Your browser does not support the element.
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            data-testid={ `checkbox-music-${trackId}` }
          >
            <span>Favorite</span>
            <input
              type="checkbox"
              checked={ checked }
              onChange={ () => {
                this.handleCheckboxChange();
              } }
            />
          </label>
        </div>
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
  toggleCheckbox: PropTypes.func,
};

MusicCard.defaultProps = {
  checked: null,
  toggleCheckbox: null,
};

export default MusicCard;
