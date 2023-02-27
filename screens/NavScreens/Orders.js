import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { useEffect, useState } from "react";

export default function Orders({navigation}){

    const [currentOrders, setcurrentOrders] = useState([])
    const [pastOrders, setpastOrders] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('token', async (err, result)=>{
            const response = await fetch("http://20.193.147.19:80/api/users/getOrders", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    token: result
                }
            })
            const data = await response.json()
            setcurrentOrders(data['currentOrders'])
            setpastOrders(data['pastOrders'])
            setordersLoaded(true)
            console.log(data);
        })
    }, [])

    return(
        <View>
            <Text style={{fontWeight: '700', fontSize: 14, paddingVertical: 9, paddingLeft: 14}}>Current Order</Text>
            {
                currentOrders.length != 0 ? currentOrders.map((i)=>{
                    return <Card onPress={()=>{navigation.navigate('Order', {orderId: i})}}><Text>Order No.: #{i}</Text></Card>
                }):<Card><Text style={{color: '#a4a4a4'}}>No Orders in Progress :(</Text></Card>
            } 
            <Text style={{fontWeight: '700', fontSize: 14, paddingVertical: 9, paddingLeft: 14}}>Past Orders</Text>
            <ScrollView>
                {
                    pastOrders.length != 0 ? pastOrders.map((i)=>{
                        return <Card><Text>Order ID: #{i}</Text></Card>
                    }):<Card><Text style={{color: '#a4a4a4'}}>No Past Orders :(</Text></Card>
                }
            </ScrollView>
        </View>
    )
}