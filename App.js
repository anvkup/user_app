import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json'
import Login from './screens/Login';
import DashboardNavigator from './screens/DashboardNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTime from './screens/FirstTime';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  // const animation = useRef(null)

  const [loggedIn, setloggedIn] = useState(true)
  const [firstTimeUser, setfirstTimeUser] = useState(false)
  AsyncStorage.getAllKeys((err, data)=>{if(err) throw err; console.log("Async==>",data);})
  AsyncStorage.getItem('token', (err, result)=>{
    if (err) throw err;
    else{
      result ? setloggedIn(true):setloggedIn(false)
    }
  })

  // useEffect(()=>{
  //   animation.current.play()
  // }, [])

  const [loaded, setLoaded] = useState(false);
  if (loaded == false) {
    return(
      <SafeAreaView style={styles.splash}>
        <LottieView source={require('./assets/loading.mp4')}
          autoPlay={true}
          loop={false}
          resizeMode='contain'
          onAnimationFinish={() => {
            console.log('animation finished')
            // setLoaded(true);
        }}
        />
      </SafeAreaView>
    )
  }else{

    return (
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      {
        loggedIn ? firstTimeUser ? <FirstTime setfirstTimeUser={setfirstTimeUser} />:<DashboardNavigator setloggedIn={setloggedIn} setfirstTimeUser={setfirstTimeUser} />:<Login setLoggedIn={setloggedIn} firstTimeUser={firstTimeUser} setfirstTimeUser={setfirstTimeUser} />
      }
      
      {/* <DashboardNavigator /> */}
    </ApplicationProvider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    flex: 1,
    alighItems: 'center',
    margin: 0,
    backgroundColor: 'black'
  },
});
