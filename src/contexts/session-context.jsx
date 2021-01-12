import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelName: this.props.modelName || 'user',
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
    this.init();
  }


  // Methods
  async init() {
    let store = this.props.store;
    let userId = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    userId && token ? await this.loadUser(store, this.state.modelName, userId, token, this.props.params) : this.setState({ loaded: true });
  }

  async loadUser(store, modelName, modelId, token, params) {
    try {
      store.adapterFor('').set('token', token);
      let user = await this.props.store.queryRecord(modelName, modelId, params);
      await this.setState({ token: token, user: user }, () => logger('React Native Session: ', this.state));
    } catch(e) {
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async authenticate(modelName, data) {
    let store = this.props.store;
    await AsyncStorage.setItem('userId', data.id.toString());
    await AsyncStorage.setItem('token', data.token);
    return await this.loadUser(store, modelName, data.id, data.token, {});
  }

  async logout() {
    await AsyncStorage.multiRemove(['userId', 'token']);
    await this.setState({ token: '', user: {} }, () => () => logger('React Native Session: ', this.state));
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
    )
  }
};

const withSession = function(WrappedFunction) {
  return class extends Component {
    render() {
      return (
        <SessionContext.Consumer>
          {context => <WrappedFunction session={context} {...this.props} />}
        </SessionContext.Consumer>
      );
    }
  }
};

export { SessionContext, SessionProvider, withSession };
