## Overview
React Native Session is a session management library for React native applications. The library is a close repliacation [React Session](https://github.com/mile-hi-labs/react-session) built on async-storage to manage React Native sessions.


## How it Works
React Native Session uses the [Context Hook](https://reactjs.org/docs/context.html) api to provide a global session where you can authenticate and persist the current user across app closures. Once authenticated, React Native Session will automatically add the JWT token to all API requests sent using React Data. To learn more about React Native Session, please visit the [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-native-session/).


## Quick Start


### Install
```
npm install @mile-hi-labs/react-native-session
npm install @react-native-community/async-storage
cd ios && pod install
```

### Session Provider
Next, add the following to your `app.jsx` file or near the top of your application.

```
# app.jsx

import React from 'react';
import Navigator from 'navigator';
import { StoreProvider, StoreContext } from '@mile-hi-labs/react-data';
import { SessionProvider } from '@mile-hi-labs/react-native-session';


const App = (props) => {

  return (
    <SessionProvider>
      <Navigator />
    </SessionProvider>
  )
}

export default App;
```

### Session Consumer
Then, you can access the session from any component like so:

```
// scenes/welcome.jsx

import React, { useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';

const WelcomeScene = (props) => {
  const { session } = props;

  return null;
}

export default withSession(WelcomeScene);

```

### Session Authentication
Then, login or register your user and pass the user's credentials to the session like so:

```
import React, { useEffect, useState } from 'react';
import { withSession } from '@mile-hi-labs/react-native-session';
import Axios from 'axios';
import { ScrollView, View, Text } from 'react-native';
import { Button, ButtonText } from 'components/basics/buttons';
import { Form, FormGroup, FormLabel } from 'components/basics/forms';
import { TextInputWrapper } from 'components/basics/inputs';
import { BasicScene } from 'components/basics/scenes';

const LOGIN_URL = 'http://localhost:8080/auth/login';

const LoginScene = (props) => {
  const { navigation, route, session } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Methods
  const submitForm = async () => {
    try {
      setTaskRunning(true);
      let response = await Axios.post(LOGIN_URL, { email: email, password: password });
      await session.authenticate('user', user);
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setTaskRunning(false);
    }
  }


  // Render
  return (
    <BasicScene>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, width: '100%', padding: 15, backgroundColor: '#FFFFFF'}}>
          <Form>
            <FormGroup label='Email'>
              <TextInputWrapper
                value={email}
                placeholder='robert@hollywood.com'
                onChangeText={value => setEmail(value)}
              />
            </FormGroup>

            <FormGroup label='Password'>
              <TextInputWrapper
                value={password}
                secureTextEntry={true}
                placeholder='••••••••'
                onChangeText={value => setPassword(value)}
              />
            </FormGroup>

            <FormGroup style={{paddingTop: 15}}>
              <Button taskRunning={taskRunning} onPress={() => submitForm()}>Login</Button>
            </FormGroup>

            <FormGroup>
              <View style={{paddingTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{marginRight: 5}}>Don't have an account?</Text>
                <ButtonText onPress={() => navigation.navigate('Register')}>Register</ButtonText>
              </View>
            </FormGroup>

          </Form>
        </View>
      </ScrollView>
    </BasicScene>
  );
};

export default withSession(LoginScene);

```

## Demo
This project comes with a built-in React Native demo.


## Development
This projects uses Webpack to build the project. Please see `package.json` for available scripts.
- Clone the repository
- Run `npm install`
- Run `npm link` from this library
- Open up a project where you'd like to use this library
- Run `npm link react-native-session` from the project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from this library to your project.


## Links
- [Github](https://github.com/mile-hi-labs/react-native-session)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-native-session/)
- [Mile Hi Labs](https://milehilabs.io)
