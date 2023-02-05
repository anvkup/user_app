import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json'
import Login from './screens/Login';
import DashboardNavigator from './screens/DashboardNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTime from './screens/FirstTime';

export default function App() {

  const [loggedIn, setloggedIn] = useState(true)
  const [firstTimeUser, setfirstTimeUser] = useState(false)
  AsyncStorage.getItem('token', (err, result)=>{
    if (err) throw err;
    else{
      result ? setloggedIn(true):setloggedIn(false)
    }
  })

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      {/* {
        loggedIn ? firstTimeUser ? <FirstTime setfirstTimeUser={setfirstTimeUser} />:<DashboardNavigator setfirstTimeUser={setfirstTimeUser} />:<Login setLoggedIn={setloggedIn} firstTimeUser={firstTimeUser} setfirstTimeUser={setfirstTimeUser} />
      } */}
      <DashboardNavigator />
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
