import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { useEffect, useState } from "react";

export default function Orders({navigation}){

    const [currentOrder, setcurrentOrder] = useState([])
    const [pastOrders, setpastOrders] = useState(0)

    useEffect(()=>{
        AsyncStorage.getItem('token', async (err, result)=>{
            const response = await fetch("http://192.168.0.6:8000/api/users/getOrders", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    token: result
                }
            })
            const data = await response.json()
            setcurrentOrder(data['currentOrder'])
            setpastOrders(data['pastOrders'])
            console.log(data);
        })
    }, [])

    return(
        <View>
            <Text style={{fontWeight: '700', fontSize: 14, paddingVertical: 9, paddingLeft: 14}}>Current Order</Text>
            <Card onPress={()=>{navigation.navigate('Order', {orderId: Object.keys(currentOrder)[0]})}}><Text>{Object.keys(currentOrder)[0]}</Text></Card>
            <Text style={{fontWeight: '700', fontSize: 14, paddingVertical: 9, paddingLeft: 14}}>Past Orders</Text>
            <ScrollView>
                <Card><Text>1</Text></Card>
                <Card><Text>2</Text></Card>
                <Card><Text>3</Text></Card>
            </ScrollView>
        </View>
    )
}