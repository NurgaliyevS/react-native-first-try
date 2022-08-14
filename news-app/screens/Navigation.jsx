import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FullPostScreen from './FullPost';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();

// Stack.Navigator === Routes

function Navigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'News' }}
        />
        <Stack.Screen
          name='FullPost'
          component={FullPostScreen}
          options={{ title: 'Article' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
