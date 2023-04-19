import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends Component {
  state = {
    headerUsername: null,
    isLoading: true,
  };

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        headerUsername: user.name,
        isLoading: false,
      });
    });
  }

  render() {
    const { headerUsername, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        <span data-testid="header-user-name">
          { headerUsername }
        </span>
      </header>
    );
  }
}

export default Header;
