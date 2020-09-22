import React, { Component } from 'react';
import LocalStorage from 'local-storage';
import { logger } from 'utils/helpers';

const Session = React.createContext();

class SessionContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
      isLoading: true,
      loadUser: this.loadUser.bind(this),
      isAuthenticated: this.isAuthenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
    };
  }

  
  // Hooks
  componentDidMount() {
    let userId = LocalStorage.get('userId');
    let token = LocalStorage.get('token');
    userId && token ? this.loadUser(userId, token) : this.setState({ isLoading: false });
  }

  
  // Tasks
  async loadUser(userId, token, params = {}, silent = false) {
    try {
      if(!this.props.store) {  return };
      this.setState({ isLoading: true });
      await this.props.store.adapterFor('app').then(adapter => adapter.set('token', token));
      let user = await this.props.store.queryRecord('user', userId, this.props.params);
      await this.setState({ token: token, user: user });
    } catch(e) {
      throw e;
    } finally {
      this.setState({ isLoading: false });
      logger(`Session ${this.state.isAuthenticated() ? 'authenticated!' : 'n/a'}`);
    }
  }

  async authenticate(user) {
    try {
      LocalStorage.set('userId', user.id);
      LocalStorage.set('token', user.token);
      user = await this.context.createRecord('user', user);
      await this.loadUser(user.id, user.token, {}, true);
      logger('New Session: ', this.state);
    } catch(e) {
      throw e;
    }
  }

  async logout() {
    try {
      localStorage.clear();
      await this.setState({ userId: '', token: '', user: {} });
      logger('Session: ', this.state);
    } catch(e) {
      throw e;
    }
  }


  // Methods
  isAuthenticated() {
    return this.state.user.id ? true : false;
  }


  // Render
  render() {
    return (
      <Session.Provider value={this.state}>
        {this.props.children}
      </Session.Provider>
    )
  }
};

const withSession = function(WrappedComponent) {
  return class extends React.Component {

    render() {
      return (
        <Session.Consumer>
          {state => <WrappedComponent session={state} {...this.props} />}
        </Session.Consumer>
      );
    }
  };
};

export { SessionContext, withSession };
