# Overview
React Session is a session management library for React web applications. The library is a lightweight absraction built on the local-storage package and is designed to work independently or in partnership with the React Data library also authored by Mile Hi Labs.


# How it Works
React Data uses the [Context Hooks](https://reactjs.org/docs/context.html) to construct a global data store that consists of 4 main components that work in the following manner:

![React Data Store](./src/assets/react-data.jpg)

Per the image above, the Store acts as a central data hub that interconnects your Adapters, Serializers, and Models to communicate with your API, retrieve your data, and then store that data locally so it's ready to use. 
React Data currently assumes your using a [JSON API](https://jsonapi.org/) with REST patterns. For now, we think this approach offers a well-documented and efficient way to get up and running quickly.

To learn more about React Data, checkout the **Advanced Usage** section or visit our [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/) online. 


# Quick Start
`npm install @mile-hi-labs/react-session`

Add the following to your `app.jsx` file or near the top of your application. This will import the store and make it available to any route / component downstream. 

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
Coming soon...r
```


Then, you can access the session from any route or component like so:

```
# routes/mkt/index.jsx

import React, { useEffect } from 'react';
import { withSession } from '@mile-hi-labs/react-session';
import UserList from 'components/user/user-list';

const MktIndex = (props) => {
	const { store } = props;
	const [ users, setUsers ] = useState([]);
	const [ loading, setLoading ] = useState([]);

	// Hooks
	useEffect(() => {
		fetchData()
	}, []);


	// Async
	async fetchData = () => {
		try {
			setLoading(true);
			let users = this.props.store.query('user', {});
			this.setState({ users: users });
		} catch(e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	// Render
	render() {
		const { store } = this.props;
		const { users, isLoading } = this.state;
		
		return (
			<div className='container'>
				{loading ? (
					<h6>...loading...</h6>
				) : (
					<UserList users={users}/>
				)}
			</div>
		)
	}
}

export default withSession(MktIndex);

```



# Advanced Usage
While React Session is designed to work right out-the-box with minimal configuration, you can also link the library with @mile-hi-labs/react-data library to automatically detect, load, and configure the store with their credentials in a single network call. 
To do, simply modify the `app.jsx` file shown above with the following:



# API
Coming soon...



# FAQ

### Why React Data?
State management libraries are often complex, opinionated, and require quite a bit of configuration. We love React for it's simplicity and configuration so we wanted 
to build a state management library to match. 


### What inspired React Data? 
React Data is heavily inspired by the core elements of [Ember-Data](https://emberjs.com) in a much smaller and, dare we say universal, package.


### Tell me more about React Data's size?
At 84KB (22.5KB gzipped), React Data is tiny compared to it's utility as a data layer playing a pivotal role in your application development. 


### Tell me more about performance?
React Data uses dynamic imports to lazy load and cache any Adapters, Serializers, or Models that you've added to your project. 
That way, React Data maintains a small footprint during the initial page load and then loads more when it's requested. 


### Tell me more about configuration?
React Data uses on a base adapter, serializer, and model to provide the foundation for those  functionality that'll become second-nature as you get going.


### Why should I use React Data
React Data takes a conventional approach to app development while still allowing plenty of configuration for advanced developers. 


### Are there any best-practices I should be aware of?
You shouldn't overload the store with data that isn't being used or is no longer needed. We suggest keeping an eye on the data being loaded into the store and clearing any unused data
regularly to keep performance at it's best.


### Development vs Production Mode
React Data comes pre-bundled for production however it does read your `NODE_ENV` variable to provide some logging and time stamps for performance.


### Who's using React Data?
React Data is currently being being used by [Beauty Broker](https://beautybroker.io), [Blush](https://blushednow.com), and [Chartz](https://chartz.io). 
If you're using React Data in your application, we'd love to hear / see what you have going on!

### Does React Data support SSR?
React Data currently does not support SSR as it relies on [Axios](https://github.com/axios/axios) for server communication which is an HTTP client. We're going to switch to a Fetch polyfill in an upcoming release that'll support SSR. 


# Development
- Clone this repository
- Run `npm link` from this library
- Open up a project where you'd like to use this library
- Run `npm link react-data` from your project
- You can now develop both projects simultaneously
- Run `npm run build` to push code from the library to your project


# Links
- [Github](https://github.com/MileHiLabs/react-data)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/)
- [Mile Hi Labs](https://milehilabs.io)


