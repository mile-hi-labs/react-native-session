import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const WelcomeScene = (props) => {
	const { navigation, route, store } = props;


  // Render
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
          <View>
            <Text>React Session Demo</Text>
            <Text>Welcome.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScene;
