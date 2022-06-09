import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Login } from './screens/Login' ;
import { Register } from './screens/Register';


export default UserNavigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}
