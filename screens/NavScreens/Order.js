import { View, Image, ScrollView, RefreshControl } from "react-native";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, Card, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StepIndicator from "react-native-step-indicator";
import { StepIndicatorProps } from "react-native-step-indicator";
import { ActivityIndicator } from "react-native";

export default function Order({navigation ,route}){
    
    const [itemDetails, setitemDetails] = useState({})
    // console.log();
    const [prices, setprices] = useState({})
    const [detailsLoaded, setdetailsLoaded] = useState(false)
    const [a, seta] = useState(1)
    
    let total=0;
    
    const [order, setorder] = useState('')
    const [orderLoaded, setorderLoaded] = useState(false)
    const [userInfo, setuserInfo] = useState('')
    const [timer, settimer] = useState('')

    function startTimer(){
        setInterval(() => {
            const timeOrdered=new Date(order.timeOrdered)
            const currentTime=new Date()
            const hoursLeft = timeOrdered.getHours()+2-currentTime.getHours()
            const minutesLeft = timeOrdered.getMinutes()-currentTime.getMinutes()
            const secondsLeft = timeOrdered.getSeconds()-currentTime.getSeconds()

            const distance = timeOrdered.getTime()+7200000-currentTime.getTime()

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            settimer (hours+":"+minutes+":"+seconds)
            // return order['timeSlotSelected']
        }, 1000)
    }
    
    useEffect(() => {
        AsyncStorage.getItem('token', (err, result)=>{
            async function getItems() {
                const response = await fetch(`http://20.193.147.19:80/api/users/getOrder?orderId=${route.params.orderId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: result
                    }
                })
                const data = await response.json()
                console.log("DATA=", data);
                
                const response2 = await fetch(`http://20.193.147.19:80/api/users/getItems`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        token: result
                    }
                })
                const data2 = await response2.json()
                console.log("DATA2==", data2);
    
                let obj2={}
                await data2.map((i)=>{
                    obj2[i['itemId']]=i['price']
                    console.log(obj2);
                    console.log('prices=', prices);
                })
                setprices(obj2)
                console.log("PRICES==", prices);
                
                console.log('data2 map finished');
                let obj3= {}
                await Promise.all(data['items'].map(async(i)=>{
                    console.log('i=', i);
                    const response3 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i['itemId']}`)
                    const data3 = await response3.json()
                    console.log('data3=', data3);
                
                    obj3[i['itemId']]=data3
                }))
                setitemDetails(obj3)
                console.log('ABCD');
            console.log(itemDetails);
            
            console.log(data);

            setorder(data)
            setorderLoaded(true)
                startTimer()
            
            
            // const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            // const data = await response.json()

            // let obj={}
            // data.map((i)=>{
            //     obj[i['itemId']]=i['price']
            //     // setprices({...prices, obj})
            //     console.log("new prices=>", prices)
            // })
            // setprices(obj)

            // // console.log(data);
            // // setitemsList(data)
            // // console.log(itemsList);
            // let newObj={}
            // await Promise.all(Object.keys(props.cart).map(async(i)=>{
            //     const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i}`)
            //     const data2 = await response2.json()
            //     // console.log(data2);

            //     newObj[i]=data2
            // }))
            // console.log(newObj)
            // setcartItems(newObj)
            // setdetailsLoaded(tru
        }
        getItems()
    })
    }, [])
    let refreshing = false

    return (
        orderLoaded ? 
        <View>
            {refreshing ? <ActivityIndicator /> : null}
        <ScrollView style={{height: '100%'}} refreshControl={<RefreshControl refreshing={refreshing} colors={["#1C6758"]} onRefresh={onReload} style={{}} />}>
            {/* <ScrollView> */}
            <View style={{padding: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 0.8, borderBottomColor: '#777'}}>
            <Text style={{fontWeight: '700', fontSize: 16}}>{order['orderedByName']}</Text>
            <Text style={{fontSize: 12, fontWeight: '700'}}>Phone: +91 {order['orderedBy']}</Text>
            <View style={{fontSize: 12, fontWeight: '700', justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontWeight: '700'}}>Address: {order['address']}</Text>
                <Feather name="edit" size={14} style={{fontWeight: '800'}} onPress={()=>{alert('Address Editing to be Added')}} />
            </View>
            </View>
            <Text style={{fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 20, padding: 13, fontSize: 13, borderBottomColor: '#777', borderBottomWidth: 0.7}}>Items:</Text>
            {
                order['items'] && order['items'].map((i)=>{
                    total = total+(prices[i['itemId']]*i['quantity'])
                    return(
                        <View style={styles.cartItem}>
                                <Image source={{uri: `http://20.193.147.19:80/api/getFile?uri=${itemDetails[i['itemId']]['itemImage']}`}} style={styles.image} />
                                <View style={{flexGrow: 1}}>
                                    <Text style={{fontWeight: '700', fontSize: 15.5}}>{itemDetails[i['itemId']]['itemName']}</Text>
                                    <Text style={{fontWeight: '700', fontSize: 12, color: '#666'}}>{"₹"+prices[i['itemId']]+ " x "+i['quantity']}</Text>
                                </View>
                                <Text style={{fontWeight:'700', marginRight: 10}}>₹ {prices[i['itemId']]*i['quantity']}</Text>
                            </View>
                        )
                    })
                }
                <Card>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, paddingTop: 0, padding: 5, marginTop: 5}}>
                    <Text style={{fontWeight: '700'}}>SubTotal :</Text>
                    <Text style={{fontWeight: '700'}}>₹{total}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Delivery Charges :</Text>
                    <Text style={{fontWeight: '700'}}>₹{40}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Discount :</Text>
                    <Text style={{fontWeight: '700'}}>₹{50}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, paddingTop: 5, marginBottom: 5}}>
                    <Text style={{fontWeight: '700'}}>Amount to be Paid :</Text>
                    <Text style={{fontWeight: '700'}}>₹{total-10}</Text>
                </View>
                </Card>
                <Card style={{paddingBottom: 12}}>
                    {
                        <Text style={{textAlign: 'right', fontSize: 12}}><Text style={{fontWeight: '700', fontSize: 12.5}}>Time Left: </Text>{timer}</Text>
                        // #72= 15.54.36
                        // 900000
                    }
                    <Text style={{fontWeight: '700', fontSize: 14, marginBottom: 20, marginTop: 10}}>Order Status</Text>
                    <StepIndicator
                    currentPosition={order['status']}
                    stepCount={3}
                    customStyles={{stepIndicatorUnFinishedColor: '#e4e4e4', separatorUnFinishedColor: '#e4e4e4'}}
                    renderStepIndicator={({position, stepStatus})=>{if (stepStatus==="finished"){return <FontAwesome5 name='check' style={{color: 'white', fontSize: 13}} />}else{return (<Text style={{fontSize: 13, color: '#949494'}}>{position+1}</Text>)}}}
                    labels={['Ordered', 'Out for Delivery', 'Delivered']} />
                    <Text style={{fontWeight: '700', fontSize: 11, marginTop: 10, marginHorizontal: 5}}>Order OTP: {order['otp']}</Text>
                </Card>
                {/* </ScrollView> */}
                {
                    order['status']==0 &&
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 20}}>
                    <Button style={{marginHorizontal: 10, marginRight: 5, flexGrow: 1, elevation: 4}}><Ionicons name='md-call-sharp' style={{fontSize: 15, marginTop: 5}} />   Call Delivery Boy</Button>
                    <Button status='danger' disabled={((new Date().getTime())-(new Date(order.timeOrdered).getTime()))>=900000} style={{marginHorizontal: 10, marginLeft: 5, flexGrow: 1}}>&#x2716;   Cancel Order</Button>
                </View>
                }
                </ScrollView>
    </View>:<View>
            <Text>Orders not Loaded yet :(</Text>
        </View>
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