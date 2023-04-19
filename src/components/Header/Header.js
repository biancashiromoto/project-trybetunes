import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';

class Header extends Component {
  state = {
    isLoading: true,
    welcomeMessage: '',
  };

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        welcomeMessage: (
          (!user.name) ? (
            'Hello!'
          ) : (
            (
              (user.name
                .charAt(0)
                .toUpperCase() + user.name
                .slice(1))
            )
          )),
        isLoading: false,
      });
    });
  }

  render() {
    const { welcomeMessage, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header
        data-testid="header-component"
        className="header-container"
      >
        <div className="links-container">
          <Link
            data-testid="link-to-search"
            to="/search"
            className="search link"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="favorites link"
          >
            Favorites
          </Link>
        </div>
        <h1>TrybeTunes</h1>
        <span
          data-testid="header-user-name"
          className="header-username"
        >
          { welcomeMessage }
        </span>
      </header>
    );
  }
}

export default Header;
