import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';

const AuthorsScene = (props) => {
	const { navigation, route, session, store } = props;
  const [ authors, setAuthors ] = useState([]);
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
      let model = await store.query('author', {});
      setAuthors(model);
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setLoading(false);
    }
  }

  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }


  // Render
  return (
    <BasicScene>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%'}}>
          {loading ? <Text>Loading...</Text> : (
            <Fragment>
              {authors.length > 0 && authors.map(author => (
                <View key={author.id} style={{padding: 15, marginBottom: 15, width: '100%'}}>
                  <Text>{author.name}</Text>
                </View>
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </BasicScene>
  );
};

export default withSession(withStore(AuthorsScene));
