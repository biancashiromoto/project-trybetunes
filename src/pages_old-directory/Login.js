import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends Component {
  state = {
    isLoginBtnDisabled: true,
    nameInputValue: '',
    isLoading: false,
  };

  handleUsernameInputChange = ({ target }) => {
    const minUsernameLength = 3;
    const username = target.value;
    this.setState({
      nameInputValue: username,
      isLoginBtnDisabled: username.length < minUsernameLength,
    });
  };

  showLoadingComponent = () => {
    this.setState({
      isLoading: true,
    });
  };

  render() {
    const { isLoginBtnDisabled, nameInputValue, isLoading } = this.state;
    const { history } = this.props;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <Header />
        <h2>Login</h2>
        <form>
          <label htmlFor="login-username">
            Username:
            <input
              id="login-username"
              placeholder="Digite seu nome de usuário"
              data-testid="login-name-input"
              onChange={ this.handleUsernameInputChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ isLoginBtnDisabled }
            onClick={ async (event) => {
              event.preventDefault();
              this.showLoadingComponent();
              await createUser({
                name: nameInputValue,
              });
              history.push('/search', this.state);
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
