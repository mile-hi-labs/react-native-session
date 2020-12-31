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
  const { navigation, route } = props;

  // Render
  return (
    <Tab.Navigator initialRouteName='MainBooks'>
      <Tab.Screen
        name='MainBooks'
        component={BooksScene}
        options={{
          title: 'Books',
        }}
      />

      <Tab.Screen
        name='MainAuthors'
        component={AuthorsScene}
        options={{
          title: 'Authors',
        }}
      />

      <Tab.Screen
        name='MainCategories'
        component={CategoriesScene}
        options={{
          title: 'Categories',
        }}
      />

      <Tab.Screen
        name='MainPublishers'
        component={PublishersScene}
        options={{
          title: 'Publishers',
        }}
      />

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
