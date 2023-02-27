import { AntDesign, Feather } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button, Card, Text } from "@ui-kitten/components"
import { View, Image, StyleSheet, Alert, ScrollView, ToastAndroid } from "react-native"
import prompt from "react-native-prompt-android"
import DialogContainer from "react-native-dialog/lib/Container"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default (props) => {

    const route = useRoute()
    const navigator = useNavigation()
    const cart = route.params.cart
    const cartItems = route.params.cartItems
    const prices = route.params.prices

    let total=0;

    function placeOrder (){
        AsyncStorage.getItem('token', async (err, result)=>{
            console.log('placing order');
            const response = await fetch('http://20.193.147.19:80/api/users/order', {
                method: 'post',
                headers:{
                    token: result,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    cart: cart,
                    total: total
                })
            })
            console.log('ordered');
            const data = await response.json()
            ToastAndroid.show('Ordered Successfully', 1000)
            route.params.setcart({})
            navigator.navigate('Order', {orderId: data['orderId']})
        })
    }

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

    return (
        <ScrollView>
            <View style={{padding: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 0.8, borderBottomColor: '#777'}}>
            <Text style={{fontWeight: '700', fontSize: 16}}>{name}</Text>
            <Text style={{fontSize: 12, fontWeight: '700'}}>Phone: +91 {phone}</Text>
            <View style={{fontSize: 12, fontWeight: '700', justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontWeight: '700'}}>Address: {defaultAddress}</Text>
                <Feather name="edit" size={14} style={{fontWeight: '800'}} onPress={()=>{alert('Address Editing to be Added')}} />
            </View>
            </View>
            <Text style={{fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 20, padding: 13, fontSize: 13, borderBottomColor: '#777', borderBottomWidth: 0.7}}>Items:</Text>
            {
                route.params.cartItems && Object.keys(route.params.cartItems).map((i)=>{
                    total = total+(prices[i]*cart[cartItems[i]['itemId']])
                    return(
                            <View style={styles.cartItem}>
                                <Image source={{uri: `http://20.193.147.19:80/api/getFile?uri=${cartItems[i]['itemImage']}`}} style={styles.image} />
                                <View style={{flexGrow: 1}}>
                                    <Text style={{fontWeight: '700', fontSize: 15.5}}>{cartItems[i]['itemName']}</Text>
                                    <Text style={{fontWeight: '700', fontSize: 12, color: '#666'}}>{"₹"+prices[i]+ " x "+cart[cartItems[i]['itemId']]}</Text>
                                </View>
                                <Text style={{fontWeight:'700', marginRight: 10}}>₹ {prices[i]*cart[cartItems[i]['itemId']]}</Text>
                            </View>
                        )
                    })
                }
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 10, padding: 5}}>
                    <Text style={{fontWeight: '700'}}>SubTotal :</Text>
                    <Text style={{fontWeight: '700'}}>₹{total}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Deilvery Charges :</Text>
                    <Text style={{fontWeight: '700'}}>₹{40}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Discount :</Text>
                    <Text style={{fontWeight: '700'}}>₹{50}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 5}}>
                    <Text style={{fontWeight: '700'}}>Amount to be Paid :</Text>
                    <Text style={{fontWeight: '700'}}>₹{total-10}</Text>
                </View>
                <Button style={{marginHorizontal: 15, marginTop: 15, marginBottom: 15, elevation: 2}} onPress={placeOrder}>Place Order (COD)</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cartItem:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: "#FFF",
        paddingVertical: 10,
        borderBottomColor: '#777',
        borderBottomWidth: 0.3
    },
    image:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginHorizontal: 13
    }
})