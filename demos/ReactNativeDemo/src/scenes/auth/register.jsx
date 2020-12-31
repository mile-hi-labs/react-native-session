import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { withStore } from '@mile-hi-labs/react-data';

const RegisterScene = (props) => {
  const { navigation, route, store } = props;
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Methods
  const submitForm = async () => {
    try {
      setTaskRunning(true);
      // Serialize
      // Login
      // Normalize
      // nextAction
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setTaskRunning(false);
    }
  }


  // Render
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%'}}>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withStore(RegisterScene);
