import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json'
import Login from './screens/Login';
import DashboardNavigator from './screens/DashboardNavigator';
import axios from 'axios';

export default function App() {

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      {/* <Login /> */}
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
