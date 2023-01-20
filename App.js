import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './components/Navbar'
export default function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Navbar></Navbar>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
;
