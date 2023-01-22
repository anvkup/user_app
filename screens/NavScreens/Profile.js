import { Feather, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Button, ButtonGroup, Text } from "@ui-kitten/components";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({navigation, route}){
    return(
        <SafeAreaView style={{height: '100%', width: '100%'}}>
            <View style={{display: 'flex', maxWidth: '100%', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, alignItems: 'center'}}>
                <Ionicons name="person-sharp" style={{color: '#000',fontSize: 60, borderRadius: 50, marginHorizontal: 8, marginBottom: 8}} />
                {/* <View style={{textAlign: 'center', flexGrow: 1, paddingHorizontal: 10, right: 0, flexWrap: 'wrap'}}> */}
                    <Text style={{fontWeight: '800', fontSize: 19}}>Alicia Lorraine</Text>
                    <Text style={{fontWeight: '700', fontSize: 13}}>+91 8373958820</Text>
                    <Text style={{fontWeight: '600', fontSize: 14}}>23-A, Tower F,</Text> 
                    <Text style={{fontWeight: '600', fontSize: 14}}>Toluene Housing Society, Noida</Text>
                {/* </View> */}
            </View>
            <ScrollView style={{position: 'absolute', bottom: '15%', width: '100%'}}>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Orders')}}>Orders</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Notifications')}}>Notifications</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Settings')}}>Settings</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('CustomerSupport')}}>Customer Support & Chat</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('FAQ')}}>FAQ</Text>
            </ScrollView>
            <Button status="danger" style={{position: 'absolute', bottom: 10, width: '95%', alignSelf: 'center'}} accessoryRight={()=>{return <MaterialIcons name="logout" style={{fontSize: 17, color: '#FFF'}} />}}>Logout</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileOptions:{
        padding: 18,
        paddingVertical: 20,
        fontWeight: '700',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        borderColor: '#777'
    }
})