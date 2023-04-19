import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumCard from '../AlbumCard/AlbumCard';
import Loading from '../../components/Loading/Loading';
import './Search.css';

class Search extends Component {
  state = {
    artistInputValue: '',
    isSearchBtnDisabled: true,
    showArtistAlbums: false,
    displayedAlbums: [],
    isLoading: false,
    searchResult: '',
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleSearchArtistClick = async () => {
    const { artistInputValue } = this.state;
    const foundAlbums = await searchAlbumsAPI(artistInputValue);
    this.setState(({ artistInputValue: artistResult }) => ({
      showArtistAlbums: true,
      artistInputValue: '',
      displayedAlbums: foundAlbums,
      isLoading: false,
      isSearchBtnDisabled: true,
      searchResult: (
        <span>
          Album search results:
          {' '}
          {artistResult
            .charAt(0)
            .toUpperCase()
            + artistResult.slice(1)}
        </span>),
    }));
    if (foundAlbums.length === 0) {
      this.setState({
        searchResult: <span>No album was found</span>,
      });
    }
  };

  handleArtistInputChange = ({ target }) => {
    const artistName = target.value;
    this.setState({
      artistInputValue: artistName,
      isSearchBtnDisabled: artistName.length < 2,
    });
  };

  render() {
    const {
      artistInputValue,
      isSearchBtnDisabled,
      showArtistAlbums,
      displayedAlbums,
      isLoading,
      searchResult,
    } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="main-container search-container">
          <h2>Search</h2>
          <form>
            <label htmlFor="artist-search">
              <input
                id="artist-search"
                data-testid="search-artist-input"
                placeholder="Type the artist/band name"
                onChange={ this.handleArtistInputChange }
                value={ artistInputValue }
              />
            </label>
            <button
              className="search-btn"
              data-testid="search-artist-button"
              disabled={ isSearchBtnDisabled }
              onClick={ async (event) => {
                event.preventDefault();
                await searchAlbumsAPI(artistInputValue);
                this.handleSearchArtistClick();
              } }
            >
              <span>Search</span>
            </button>
          </form>
          <div className="search-result">{searchResult}</div>
          {(showArtistAlbums) ? (
            <div className="list-container">
              {displayedAlbums
                .map((album) => {
                  const {
                    collectionId,
                    artworkUrl100,
                    collectionName,
                    artistName,
                  } = album;
                  return (
                    <Link
                      to={ `/album/${collectionId}` }
                      key={ collectionId }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <AlbumCard
                        key={ collectionId }
                        imgSrc={ artworkUrl100 }
                        albumTitle={ collectionName }
                        albumArtist={ artistName }
                      />
                    </Link>
                  );
                })}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Search;
