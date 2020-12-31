import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { withStore } from '@mile-hi-labs/react-data';

const BooksScene = (props) => {
	const { navigation, route, store } = props;
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
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%'}}>
          {loading ? <Text>Loading...</Text> : (
            <Fragment>
              {books.length > 0 ? (
                <Fragment>
                  {books.map(book => (
                    <View key={book.id}>
                      <Text>{book.title}</Text>
                      <Text>{book.printType}</Text>
                    </View>
                  ))}
                </Fragment>
              ) : (
                <Text>Sorry, we don't have any books...</Text>
              )}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withStore(BooksScene);
