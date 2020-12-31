import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';

const BooksScene = (props) => {
	const { navigation, route, store } = props;
  const [ books, setBooks ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useEffect(() => {
    // fetchData();
  }, [])


  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.query('book', {});
      setBooks(model);
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
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%'}}>
          {loading ? <Text>Loading...</Text> : (
            <Fragment>
              {books.length > 0 && books.map(book => (
                <View key={book.id}>
                  <Text>{book.title}</Text>
                  <Text>{book.printType}</Text>
                </View>
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BooksScene;
