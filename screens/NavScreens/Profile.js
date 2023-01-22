import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({navigator}){
    return(
        <SafeAreaView>
            <View style={{display: 'flex', maxWidth: '100%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                <Ionicons name="person-sharp" style={{color: '#000',fontSize: 60, borderRadius: 50, marginHorizontal: 8}} />
                <View style={{width: '100%', flexGrow: 1, paddingHorizontal: 10, right: 0, flexWrap: 'wrap'}}>
                    <Text style={{fontWeight: '800', fontSize: 19}}>Alicia Lorraine</Text>
                    <Text style={{fontWeight: '700', fontSize: 13}}>+91 8373958820</Text>
                    <Text style={{fontWeight: '600', fontSize: 14}}>23-A, Tower F,</Text> 
                    <Text style={{fontWeight: '600', fontSize: 14}}>Toluene Housing Society, Noida</Text>
                </View>
            </View>
            <ScrollView>
                <Text style={styles.profileOptions} onPress={({navigation})=>{navigation.navigate('Orders')}}>Orders</Text>
                <Text style={styles.profileOptions}>Notifications</Text>
                <Text style={styles.profileOptions}>Settings</Text>
                <Text style={styles.profileOptions}>Customer Support & Chat</Text>
                <Text style={styles.profileOptions}>FAQ</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileOptions:{

    }
})