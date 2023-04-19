import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from './AlbumCard';
import Loading from '../components/Loading';
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
          Resultado de álbuns de:
          {' '}
          {artistResult}
        </span>),
    }));
    if (foundAlbums.length === 0) {
      this.setState({
        searchResult: <span>Nenhum álbum foi encontrado</span>,
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
        <h2>Search</h2>
        <form>
          <label htmlFor="artist-search">
            <input
              id="artist-search"
              data-testid="search-artist-input"
              placeholder="Digite o nome do artista"
              onChange={ this.handleArtistInputChange }
              value={ artistInputValue }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ isSearchBtnDisabled }
            onClick={ async (event) => {
              event.preventDefault();
              await searchAlbumsAPI(artistInputValue);
              this.handleSearchArtistClick();
            } }
          >
            Pesquisar
          </button>
        </form>
        {searchResult}
        {(showArtistAlbums) ? (
          <div className="albums-container">
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
    );
  }
}

export default Search;
