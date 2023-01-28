import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json'
import Login from './screens/Login';
import DashboardNavigator from './screens/DashboardNavigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [loggedIn, setloggedIn] = useState(true)
  AsyncStorage.getItem('token', (err, result)=>{
    if (err) throw err;
    else{
      result ? setloggedIn(true):setloggedIn(false)
    }
  })

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      {
        loggedIn ? <DashboardNavigator />:<Login />
      }
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
