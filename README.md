## Overview
React Native Session is a session management library for React native applications. The library is a lightweight abstraction built on local-storage and is designed to work alongside [React Data](https://github.com/Mile-Hi-Labs/react-data).

## Why RNS?
State management libraries are often complex, opinionated, and require quite a bit of configuration. RNS makes it fast and easy to manage your session and access it from anywhere.

## How it Works
RNS uses the [Context Hook](https://reactjs.org/docs/context.html) api to provide a global session where you can authenticate and persist the current user across multiple browser windows or sessions. Once authenticated, React-Session will also automatically add a JWT token to all API requests sent using React Data.

## Quick Start
```
npm install @mile-hi-labs/react-native-session
npm install @react-native-community/async-storage
npx pod-install
```

Next, add the following to your `app.jsx` file or near the top of your application.

```
# app.jsx

import React from 'react';
import Navigator from 'navigator';
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

Next, authenticate your user against your API and pass the user's credentials to the session for safe and secure storage like so:

```
import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';
import AuthApi from 'apis/auth-api';
import { Button } from 'components/basics/buttons';

const LoginForm = (props) => {
  const { navigation. route, session, nextAction } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Tasks
  const login = async () => {
    try {
      setTaskRunning(true);
      let model = await AuthApi.login({email: email, password: password});
      await session.authenticate('user', model);
      console.log('Login Succeeded!');
      nextAction();
    } catch(e) {
      console.log(e);
    } finally {
      setTaskRunning(false);
    }
  }


  // Methods
  const handleSubmit = (e) => {
    login();
    e.preventDefault();
  }


  // Render
  return (
    <SafeAreaView>
      <View style={{marginBottom: 15}}>
        <Text>Email Address</Text>
        <TextInput
          type='email'
          placeholder='redford@hollywood.com'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </View>

      <View style={{marginBottom: 15}}>
        <Text>Password</Text>
        <TextInput
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </View>

      <View style={{marginBottom: 15}}>
        <Button
          title='Login'
          icon='chevron-right'
          taskRunning={taskRunning}
          onClick={() => login()}
        />
      </View>
    </SafeAreaView>
  )
}

export default withSession(LoginForm);
```


Then, you can access the session from any route or component like so:

```
# scenes/main/home-scene.jsx

import React, { useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';

const HomeScene = (props) => {
  const { session } = props;

  return null;
}

export default withSession(HomeScene);

```

## Demo
Coming soon...


## Development
if you'd like to get this project up and running
- Clone the repository
- Run `npm install`
- Run `npm link` from this library
- Open up a project where you'd like to use this library
- Run `npm link react-native-session` from the project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from this library to your project.


## Links
- [Github](https://github.com/MileHiLabs/react-session)
- [Mile Hi Labs](https://milehilabs.io)
