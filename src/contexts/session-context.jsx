import React, { Component } from 'react';
import LocalStorage from 'local-storage';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
      loadUser: this.loadUser.bind(this),
      authenticated: this.authenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
      loaded: false,
    };
  }


  // Hooks
  componentDidMount() {
    let userId = LocalStorage.get('userId');
    let token = LocalStorage.get('token');
    userId && token ? this.loadUser(this.props.model, userId, token, this.props.params) : this.setState({ loaded: true });
  }


  // Tasks
  async loadUser(modelName, modelId, token, params = {}) {
    try {
      if (!this.props.store) {  return };
      await this.props.store.adapterFor('app').set('token', token);
      let model = await this.props.store.queryRecord(modelName, modelId, params);
      await this.setState({ token: token, user: model });
      logger('Session authenticated: ', this.state);
    } catch(e) {
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async authenticate(model, data) {
    try {
      LocalStorage.set('userId', data.id);
      LocalStorage.set('token', data.token);
      await this.loadUser(model, data.id, data.token, {});
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
  authenticated() {
    return this.state.user.id ? true : false;
  }


  // Render
  render() {
    const { loaded } = this.state;
    const { children } = this.props;

    return (
      <SessionContext.Provider value={this.state}>
        {children}
      </SessionContext.Provider>
    )
  }
};

const withSession = function(WrappedFunction) {
  return (props) => (
    <SessionContext.Consumer>
      {context => <WrappedFunction session={context} {...props} />}
    </SessionContext.Consumer>
  );
};

export { SessionProvider, withSession };
