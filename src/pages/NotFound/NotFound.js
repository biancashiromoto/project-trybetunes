import React, { Component } from 'react';
import './NotFound.css';
import '../../App.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="main-container not-found-container">
        <h2>Page not found</h2>
        <p>The page you&apos;re looking for couldn&apos;t be found.</p>
        <p>It&apos;s possible that the URL you entered was mistyped or outdated</p>
        <p>Please try again.</p>
      </div>
    );
  }
}

export default NotFound;
