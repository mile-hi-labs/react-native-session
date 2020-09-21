# Overview
React Data is a state management solution for React applications. The library is lightweight, configurable, and scalable so you can get right into building your application rather than configuring your data layer.


# How it Works
React Data uses the [Context Hooks](https://reactjs.org/docs/context.html) to construct a global data store that consists of 4 main components that work in the following manner:

![React Data Store](./src/assets/react-data.jpg)

Per the image above, the Store acts as a central data hub that interconnects your Adapters, Serializers, and Models to communicate with your API, retrieve your data, and then store that data locally so it's ready to use. 
React Data currently assumes your using a [JSON API](https://jsonapi.org/) with REST patterns. For now, we think this approach offers a well-documented and efficient way to get up and running quickly.

To learn more about React Data, checkout the **Advanced Usage** section or visit our [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-data/) online. 


# Quick Start
`npm install react-data`

Add the following to your `app.jsx` file or near the top of your application. This will import the store and make it available to any route / component downstream. 

```
# app.jsx

import React from 'react';
import Routes from 'router';
import { storeContext } from 'react-data';


const App = (props) => {
  
  return (
    <div id='application' className='application'>
      <StoreContext apiDomain='http://api.yourdomain.com'>
      	<Routes />
    	</StoreContext>
  	</div>
	)
}

export default App;
```

Then, you can access the store from any route or component like so:

```
# routes/mkt/index.jsx

import React, { useEffect } from 'react';
import { withStore } from 'react-data';
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

export default withStore(MktIndex);

```


# Advanced Usage
While React Data is designed to work right out-the-box with minimal configuration it's also highly configurable so you can extend any adapter, serializer, or model to match your needs. 


### The Store
In React Data, the store acts as the central hub connecting your adapters, serializers, and models together to communciate with your API and store that data locally. 
The store uses the React Context API to make itself available from any component using the `withStore` wrapper. Then, you can access the store via the props on the component. 


### Adapters
In React Data, adapters handle URL configuration when communicating with your API. This way, we're able to construct the base URL, endpoint, and any parameters you're looking to 
pass into the server seamlessly. To declare an adapter, simply do the following:

```
# adapters/user.jsx

import { AppAdapter } from 'react-data';


class BlogAdapter extends AppAdapter {
	
	// Overrides
	static apiDomain = 'https://api.blogdomain.com';

	// Overrides
	static urlForFindRecord(modelName, id) {
		return `${this.apiDomain}/posts/{id}`
	}
}

export default BlogAdapter;
```


### Models
In React Data, models declare the data going to and from the server for every model and then how those models are interconnected making it easy to access, manipulate, and display that information from anywhere in your application. 
To declare a model, simply do the following:

```
# models/user.jsx

import { AppModel } from 'react-data';


class UserModel extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);
	}

	// Declare your properties here
	this.firstName = props.firstName;
	this.lasttName = props.lastName;


	// Computed
	get fullName() {
		return this.firstName + ' ' + this.lastName;
	}
}

export default UserModel;
```


### Serializers
In React Data, serializers handle data serialization and normalization when passing data to and from your server. 
This way, we're able to format your requests appropriately while giving you the opportunity to customize your data as it comes in (or goes out) as you see fit. 
To declare a serializer, simply do the following:

```
# serializers/user.jsx

import { AppSerializer } from 'react-data';


class UserSerializer extends AppSerializer {
	constructor(type, store, props = {}) {
		super(type, store, props);
	}


	// Overrides
	get serializeAttrs() {
		fullName: false
	}

	
	get serializeRelationships() {
		location: { id: true },
		cards: true,
	}

}

export default UserSerializer;
```


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


