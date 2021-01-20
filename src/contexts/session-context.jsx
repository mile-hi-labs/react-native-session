import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
      params: this.props.params || {},
      modelName: this.props.modelName || 'user',
      loadSession: this.loadSession.bind(this),
      authenticated: this.authenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
      loaded: false,
    };
  }

  // Hooks
  componentDidMount() {
    this.init();
  }

  // Methods
  async init() {
    let store = this.props.store;
    let modelName = this.state.modelName;
    let userId = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    let params = this.state.params;
    if (userId && token) {
      await this.loadSession(store, modelName, userId, token, params)
    } else {
      this.setState({ loaded: true });
    }
  }

  async loadUser(store, modelName, modelId, token, params) {
    try {
      store.adapterFor('').set('token', token);
      let model = await store.queryRecord(modelName, modelId, params);
      this.setState({ user: model, token: token }, () => logger('RN Session: ', this.state));
    } catch (e) {
      logger(e);
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async updateSession() {
    try {
      let store = this.props.store;
      let modelName = this.state.modelName;
      let userId = LocalStorage.get('userId');
      let token = LocalStorage.get('token');
      let params = this.state.params;
      return await this.loadSession(store, modelName, userId, token, params);
    } catch (e) {
      logger(e);
    }
  }

  async authenticate(modelName, data) {
    let store = this.props.store;
    await AsyncStorage.setItem('userId', data.id.toString());
    await AsyncStorage.setItem('token', data.token);
    let params = this.state.params;
    return await this.loadUser(store, modelName, data.id, data.token, params);
  }

  async logout() {
    await AsyncStorage.multiRemove(['userId', 'token']);
    await this.setState({ token: null, user: {}}, () => logger('RN Session: ', this.state));
  }

  authenticated() {
    return this.state.user.id ? true : false;
  }

  // Render
  render() {
    const { loaded } = this.state;
    const { store, children } = this.props;

    return (
      <SessionContext.Provider value={this.state}>
        {loaded ? children : null}
      </SessionContext.Provider>
    );
  }
}

const withSession = function (WrappedFunction) {
  return class extends Component {
    render() {
      return (
        <SessionContext.Consumer>
          {context => <WrappedFunction session={context} {...this.props} />}
        </SessionContext.Consumer>
      );
    }
  };
};

export { SessionContext, SessionProvider, withSession };
