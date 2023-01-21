import { useState } from "react"
import { Button, Input } from "@ui-kitten/components"
import { Image, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Svg, SvgUri } from "react-native-svg"

export default function Login (){
    
    const [phone, setphone] = useState('')

    return (
        <SafeAreaView style={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 30}}>
            <Image source={require('../assets/logo.jpeg')} style={{width: 200, height: 200, top: 0, alignSelf: 'center', marginBottom: 70, marginTop: -70}} />
            <Input placeholder='Phone Number' label='Enter Your Phone Number' accessoryLeft={()=>{return (<Text style={{color: '#666'}}> +91 </Text>)}} keyboardType='numeric' value={phone} onChangeText={setphone} style={{marginBottom: 20}} />
            <Button>GET OTP</Button>
        </SafeAreaView>
    )
}