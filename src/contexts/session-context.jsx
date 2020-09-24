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
      loading: true,
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
    userId && token ? this.loadUser(this.props.model, userId, token, this.props.params) : this.setState({ loading: false });
  }

  
  // Tasks
  async loadUser(model, modelId, token, params = {}, silent = false) {
    try {
      if(!this.props.store) {  return };
      this.setState({ loading: true });
      await this.props.store.adapterFor('app').then(adapter => adapter.set('token', token));
      let storeModel = await this.props.store.queryRecord(model, modelId, params);
      await this.setState({ token: token, user: storeModel });
      logger('Session authenticated: ', this.state);
    } catch(e) {
      await this.logout();
    } finally {
      this.setState({ loading: false });
    }
  }

  async authenticate(model, data) {
    try {
      LocalStorage.set('userId', data.id);
      LocalStorage.set('token', data.token);
      logger('session started: ', model, data);
      await this.loadUser(model, data.id, data.token, {}, true);
    } catch(e) {
      throw e;
    }
  }

  async logout() {
    try {
      localStorage.clear();
      await this.setState({ userId: '', token: '', user: {} });
      logger('Session terminated: ', this.state);
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
    const { loading } = this.state;

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
