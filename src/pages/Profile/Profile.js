import React, { Component } from 'react';
import Header from '../../components/Header/Header';

class Profile extends Component {
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const fetchedUser = await fetch('https://randomuser.me/api/');
    const response = await fetchedUser.json();
    const { results } = response;
    const data = results[0];
    console.log(data);
  };

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="main-container">
          <h2>Profile</h2>
          <span>Name:</span>
          <span>E-mail:</span>
          <img
            src=""
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Profile;
