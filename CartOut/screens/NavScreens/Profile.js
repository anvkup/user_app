import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonGroup, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";

export default function Profile(props){

    const navigation = useNavigation()

    const [name, setname] = useState('First Last')
    const [phone, setphone] = useState('9876543210')
    const [email, setemail] = useState('some.email@gmail.com')
    const [defaultAddress, setdefaultAddress] = useState('S-144, Some Address, Delhi-110092')

    console.log('printing info');
    useEffect(()=>{
        AsyncStorage.getItem('token', async (err, result)=>{
            if (err) throw err;
            else{
                const response = await fetch(`http://20.193.147.19:80/api/users/userDetails`, {
                    method: 'get',
                    headers: {
                        token: result,
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json()
                console.log("PData=", data);
                setname(data.name)
                setphone(data.phone)
                setemail(data.email)
                setdefaultAddress(data.defaultAddress)
            }
        })
    })
    const [refreshing, setrefreshing] = useState(false)

    function onReload(){
        AsyncStorage.getItem('token', async (err, result)=>{
            if (err) throw err;
            else{
                const response = await fetch(`http://20.193.147.19:80/api/users/userDetails`, {
                    method: 'get',
                    headers: {
                        token: result,
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json()
                console.log("PData=", data);
                setname(data.name)
                setphone(data.phone)
                setemail(data.email)
                setdefaultAddress(data.defaultAddress)
                setrefreshing(false)
            }
        })
    }

    return(
        <View style={{height: '100%', width: '100%'}}>
            {/* {refreshing ? <ActivityIndicator /> : null} */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} colors={["#1C6758"]} onRefresh={()=>{setrefreshing(true); onReload()}} style={{}} />}>

            <View style={{display: 'flex', maxWidth: '100%', flexDirection: 'column', top: 50, alignItems: 'center', paddingHorizontal: 10, alignItems: 'center'}}>
                <Ionicons name="person-sharp" style={{color: '#000',fontSize: 60, borderRadius: 50, marginHorizontal: 8, marginBottom: 8}} />
                {/* <View style={{textAlign: 'center', flexGrow: 1, paddingHorizontal: 10, right: 0, flexWrap: 'wrap'}}> */}
                    <Text style={{fontWeight: '800', fontSize: 19}}>{name}</Text>
                    <Text style={{fontWeight: '700', fontSize: 13}}>+91 {phone}</Text>
                    <Text style={{fontWeight: '700', fontSize: 13}}>{email}</Text>
                    <Text style={{fontWeight: '600', fontSize: 14}}>{defaultAddress}</Text> 
                {/* </View> */}
            </View>
            <View style={{ top: 100, width: '100%', zIndex: 10, height: 400}}>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Orders')}}>Orders</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Notifications')}}>Notifications</Text>
                {/* <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('Settings')}}>Settings</Text> */}
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('CustomerSupport')}}>Customer Support & Chat</Text>
                <Text style={styles.profileOptions} onPress={()=>{navigation.navigate('FAQ')}}>FAQ</Text>
            </View>
            </ScrollView>
            <Button status="danger" style={{postition: 'absolute', bottom: 5, width: '95%', alignSelf: 'center'}} onPress={()=>{AsyncStorage.removeItem('token'); props.setloggedIn(false)}} accessoryRight={()=>{return <MaterialIcons name="logout" style={{fontSize: 17, color: '#FFF'}} />}}>Logout</Button>
        </View>
    )
}



const styles = StyleSheet.create({
    profileOptions:{
        padding: 18,
        paddingVertical: 20,
        fontWeight: '700',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        borderColor: '#777',
    }
})