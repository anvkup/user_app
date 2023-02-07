import { useState } from "react"
import { Button, Input } from "@ui-kitten/components"
import { Image, Text, ToastAndroid, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Svg, SvgUri } from "react-native-svg"
import { AntDesign } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export default function Login (props){
    
    const [phone, setphone] = useState('')
    const [otp, setotp] = useState('')
    const [otpSent, setotpSent] = useState(false)

    async function onSendOtp() {
        console.log(phone);
        const response = await fetch(`http://20.193.147.19:80/api/users/otp?phone=${phone}`)
        const data = await response.json()
        setotpSent(true)
        ToastAndroid.show('OTP Sent Successfully', 1000)
        console.log(data);
    }
    
    async function verifyOtp() {
        console.log('checking otp')
        const response = await fetch(`http://20.193.147.19:80/api/users/verifyOTP?phone=${phone}&otp=${otp}`)
        const data = await response.json()
        if (Object.keys(data)[0]!="message"){
            console.log(props.firstTimeUser);
            props.setfirstTimeUser(data['firstTimeUser'])
            console.log(props.firstTimeUser);
            AsyncStorage.setItem('token', data['token'])
            props.setLoggedIn(true)
        }else{
            ToastAndroid.show('Wrong OTP!', 1000)
            setotp('')
        }
        console.log(data);
    }

    return (
        <SafeAreaView style={{display: 'flex', position: 'relative', justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 30}}>
            { otpSent && <AntDesign name="left" size={20} style={{position: 'absolute', top: 45, left: 20}} onPress={()=>{setotpSent(false)}} /> }
            <Image source={require('../assets/logo.jpeg')} style={{width: 200, height: 200, top: 0, alignSelf: 'center', marginBottom: 75, marginTop: -75}} />
            {
                otpSent ? 
                <View>
                    <Input placeholder='OTP' label='Enter OTP sent to your Phone' maxLength={4} keyboardType='numeric' value={otp} onChangeText={(i)=>{setotp(i)}} style={{marginBottom: 30}} />
                    <Button onPress={verifyOtp}>VERIFY</Button>
                </View>:<View>
                    <Input placeholder='Phone Number' label='Enter Your Phone Number' maxLength={10} accessoryLeft={()=>{return (<Text style={{color: '#666'}}> +91 </Text>)}} keyboardType='numeric' value={phone} onChangeText={(i)=>{setphone(i)}} style={{marginBottom: 30}} />
                    <Button onPress={onSendOtp}>SEND OTP</Button>
                </View>
            }
        </SafeAreaView>
    )
}