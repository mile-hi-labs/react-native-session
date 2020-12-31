import React, { useEffect } from 'react';
import { StoreContext, StoreProvider } from '@mile-hi-labs/react-data';
import { SessionProvider } from '@mile-hi-labs/react-native-session';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Adapters from 'adapters';
import * as Models from 'models';
import * as Serializers from 'serializers';
import Navigator from 'navigator';

const App = (props) => {
	const apiDomain = 'http://127.0.0.1:8080';


  // Render
  return (
    <SafeAreaProvider>
      <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={apiDomain}>
      	<StoreContext.Consumer>
      		{store => (
    				<SessionProvider model='user' store={store}>
    					<Navigator />
  					</SessionProvider>
    			)}
        </StoreContext.Consumer>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
