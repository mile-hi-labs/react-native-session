import React, { Fragment, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Scenes
import BooksScene from 'scenes/main/books';
import AuthorsScene from 'scenes/main/authors';
import CategoriesScene from 'scenes/main/categories';
import PublishersScene from 'scenes/main/publishers';
import ProfileScene from 'scenes/main/profile';

const Tab = createBottomTabNavigator();

const MainNav = (props) => {
  const { navigation, route, session, store } = props;

  // Render
  return (
    <Tab.Navigator initialRouteName='MainProfile'>

      <Tab.Screen
        name='MainProfile'
        component={ProfileScene}
        options={{
          title: 'Profile',
        }}
      />

    </Tab.Navigator>
  );
};

export default MainNav;
