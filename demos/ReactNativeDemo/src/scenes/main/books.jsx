import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { withSession } from '@mile-hi-labs/react-native-session';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';

const BooksScene = (props) => {
	const { navigation, route, session, store } = props;
  const [ books, setBooks ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );


  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.query('book', {});
      setBooks(model);
    } catch(e) {
      console.log('error: ', e);
    } finally {
      setLoading(false);
    }
  }


  // Render
  return (
    <BasicScene>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, width: '100%', minHeight: '100%'}}>
          {loading ? <Text>Loading...</Text> : (
            <Fragment>
              {books.map(book => (
                <View key={book.id} style={{padding: 15, marginBottom: 15, width: '100%'}}>
                  <Text>{book.title}</Text>
                  <Text>{book.printType}</Text>
                </View>
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </BasicScene>
  );
};

export default withSession(withStore(BooksScene));
