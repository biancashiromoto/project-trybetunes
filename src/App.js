import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Album from './pages/Album/Album';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import Search from './pages/Search/Search';
import './App.css';

class App extends React.Component {
  state = {
    artistInputValue: '',
    albumId: '',
  };

  render() {
    const { albumId, artistInputValue } = this.state;
    return (
      <div>
        <Switch>
          <Route
            path="/search"
            component={ Search }
            value={ artistInputValue }
          />
          <Route
            path="/album"
            component={ Album }
            albumId={ albumId }
          />
          <Route
            path="/favorites"
            component={ Favorites }
          />
          {/* <Route
            path="/profile/edit"
            component={ ProfileEdit }
          />
          <Route
            exact
            path="/profile"
            component={ Profile }
          /> */}
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            component={ NotFound }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
