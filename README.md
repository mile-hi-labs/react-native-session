## Overview
React Session is a session management library for React web applications. The library is a lightweight abstraction built on local-storage and is designed to work independently or in partnership with [React Data](https://github.com/Mile-Hi-Labs/react-data).


## How it Works
React Session uses the [Context Hook](https://reactjs.org/docs/context.html) api to provide a global session where you can authenticate and persist the current user across multiple browser windows or sessions. Once authenticated, React-Session will also automatically add a JWT token to all API requests sent using React Data. To learn more about React Session, visit the [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-session/). 


## Quick Start
`npm install @mile-hi-labs/react-session`

Add the following to your `app.jsx` file or near the top of your application.

```
# app.jsx

import React from 'react';
import Routes from 'router';
import { storeContext } from 'react-data';


const App = (props) => {
  
  return (
    <div id='application' className='application'>
      <SessionContext>
      	<Routes />
    	</SessionContext>
  	</div>
	)
}

export default App;
```

Then, login  or register your user using whatever method you prefer (ie email or facebook) and then pass the user's credentials to the session for safe and secure storage like so:

```
import React, { useState } from 'react';
import { withSession } from '@mile-hi-labs/react-session';
import Auth from 'apis/auth';
import Form from 'react-bootstrap/Form';

const LoginForm = (props) => {  
  const { session, nextAction } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);

  
  // Tasks
  const login = async () => {
    try { 
    	setTaskRunning(true);
      let model = await Auth.login({email: email, password: password});
      await session.authenticate('admin', model);
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
          type='email' 
          placeholder='redford@hollywood.com' 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type='password' 
          placeholder='••••••••' 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <BasicButton
          title='Login'
          icon='chevron-right'
          taskRunning={taskRunning}
          onClick={() => login()}
        />
      </Form.Group>
    </Form>
  )
}

export default withSession(LoginForm);
```


Then, you can access the session from any route or component like so:

```
# components/bootstrap/navbar-wrapper.jsx

import React, { useEffect } from 'react';
import { withSession } from '@mile-hi-labs/react-session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBarWrapper = (props) => {
	const { session } = props;
		
	return (
			<Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
			<Navbar.Brand href='/' className='mr-15'>Company Name</Navbar.Brand>
			<Nav className='ml-auto'>
				{session.isAuthenticated() ? (
					<Nav.Link className='nav-user'>
						<img src={session.user.photo} className='mr-15'/>
						<h6>{session.user.name}</h6>
					</Nav.Link>
				) : (
					<Fragment>
						<Nav.Link as={Link} to='/login'>Login</Nav.Link>
						<Nav.Link as={Link} to='/register'>Register</Nav.Link>
					</Fragment>
				)}
			</Nav>
		</Navbar>
	)
}

export default withSession(NavBarWrapper);

```


## FAQ

#### Why React Session?
State management libraries are often complex, opinionated, and require quite a bit of configuration. We love React for it's simplicity and configuration so we wanted 
to build a state management library to match. 


#### What inspired React Session? 
React Session was heavily inspired by [Ember-Simple-Auth](https://emberjs.com).


#### Why should I use React Session
React Sesison is a fast, easy, and lightweight tool to manage the current user for your application. 


#### Development vs Production Mode
React Session comes pre-bundled for production however you can pass in the `debug` option set to `true` if you'd like additional logging.


#### Who's using React Session?
React Session is currently being being used by [Blush](https://blushednow.com). 
If you're using React Session in your application, send us a message!

#### Does React Session support SSR?
React Session won't block SSR however it does rely on browser-side cookies to authenticate the session meaning the current user will not be available on the initial page load.


## Development
This project uses Webpack and comes with both a development and production environment. See `package.json` for more details. 
- Clone this repository
- Run `npm link` from this library
- Open up a project where you'd like to use this library
- Run `npm link react-session` from your project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from the library to your project and debug via developer tools.


## Links
- [Github](https://github.com/MileHiLabs/react-session)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-session/)
- [Mile Hi Labs](https://milehilabs.io)


