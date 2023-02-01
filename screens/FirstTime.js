import { View } from "react-native"
import { useState } from "react"
import { Button, Input, Text } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default (props) => {

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    
    function onSubmit() {
        AsyncStorage.getItem('token', async (err, result)=>{
            console.log(result);
            await fetch('http://192.168.126.137:8000/api/users/createUser', {
                method: 'post',
            headers: {
                token: result,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: firstName+" "+lastName,
                email: email,
                address: address
            })
            })
        })
    }

    return (
        <SafeAreaView style={{height: '100%', flexDirection: 'column', justifyContent: 'space-around'}}>
            <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: '700', paddingTop: 20}}>Create Your Profile</Text>
            <Text style={{fontWeight: '700', fontSize: 14, paddingLeft: 25, paddingTop: 20}}>First Name</Text>
            <Input style={{marginHorizontal: 15}} onChangeText={(text)=>{setfirstName(text)}} placeholder="First Name" />
            <Text style={{fontWeight: '700', fontSize: 14, paddingLeft: 25, paddingTop: 30}}>Last Name</Text>
            <Input style={{marginHorizontal: 15}} onChangeText={(text)=>{setlastName(text)}} placeholder="Last Name" />
            {/* <Text style={{fontWeight: '700', fontSize: 14, paddingLeft: 25, paddingTop: 15}}>Phone Number</Text>
            <Input style={{marginHorizontal: 15}} value="9" /> */}
            <Text style={{fontWeight: '700', fontSize: 14, paddingLeft: 25, paddingTop: 30}}>Email Address</Text>
            <Input style={{marginHorizontal: 15}} onChangeText={(text)=>{setemail(text)}} placeholder="Your Email ID (Optional)" />
            <Text style={{fontWeight: '700', fontSize: 14, paddingLeft: 25, paddingTop: 30}}>Default Address</Text>
            <Input style={{marginHorizontal: 15}} onChangeText={(text)=>{setaddress(text)}} placeholder="Address" />
            <Button style={{marginHorizontal: 50, marginTop: 40, marginBottom: 50}} onPress={onSubmit}>SUBMIT</Button>
        </SafeAreaView>
    )
}