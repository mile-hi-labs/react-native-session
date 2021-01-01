import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'components/basics/buttons';
import { BasicScene } from 'components/basics/scenes';

const ProfileScene = (props) => {
	const { navigation, route, session, store } = props;
  const [ user, setUser ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  )


  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.findRecord('user', session.user.id);
      setUser(model);
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    await session.logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }


  // Render
  return (
    <BasicScene>
      <View style={{flex: 1, justifyContent: 'center', width: '100%', height: '100%', padding: 15}}>
        <Text style={{fontSize: 24, marginBottom: 10}}>Hi, {user.name}</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>This is your profile.</Text>
        <Button onPress={() => logout()}>Logout</Button>
      </View>
    </BasicScene>
  );
};

export default withSession(withStore(ProfileScene));
