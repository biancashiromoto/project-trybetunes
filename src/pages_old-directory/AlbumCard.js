import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { imgSrc, albumTitle, albumArtist } = this.props;
    return (
      <div className="album-card">
        <img src={ imgSrc } alt={ `Capa do álbum ${albumTitle} de ${albumArtist}` } />
        <h3>{albumTitle}</h3>
        <span>{albumArtist}</span>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  albumTitle: PropTypes.string.isRequired,
  albumArtist: PropTypes.string.isRequired,
};

export default AlbumCard;
