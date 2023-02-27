import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { Button, Card, Text } from "@ui-kitten/components"
import { useEffect, useState, React } from "react"
import { ActivityIndicator, InteractionManager } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Image, ScrollView, StyleSheet, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RefreshControl } from "react-native";
import CartItem from "./components/CartItem"
import Counter from "./components/Counter"

export default function Cart(props){

    const navigation = useNavigation()

    const [cartItems, setcartItems] = useState({})
    // console.log();
    const [prices, setprices] = useState({})
    const [detailsLoaded, setdetailsLoaded] = useState(false)
    const [a, seta] = useState(1)

    useEffect(() => {
        
        async function getItems() {
            const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            const data = await response.json()

            let obj={}
            data.map((i)=>{
                obj[i['itemId']]=i['price']
                // setprices({...prices, obj})
                console.log("new prices=>", prices)
            })
            setprices(obj)

            // console.log(data);
            // setitemsList(data)
            // console.log(itemsList);
            let newObj={}
            console.log("cart", props.cart);
            await Promise.all(Object.keys(props.cart).map(async(i)=>{
                const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i}`)
                const data2 = await response2.json()
                // console.log(data2);

                newObj[i]=data2
            }))
            console.log(newObj)
            setcartItems(newObj)
            setdetailsLoaded(true)
        }
        getItems()
        console.log("CI", cartItems);
    }, [])

    function onReload(){
        async function getItems() {
            const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            const data = await response.json()

            let obj={}
            data.map((i)=>{
                obj[i['itemId']]=i['price']
                // setprices({...prices, obj})
                console.log("new prices=>", prices)
            })
            setprices(obj)

            // console.log(data);
            // setitemsList(data)
            // console.log(itemsList);
            let newObj={}
            console.log("cart", props.cart);
            await Promise.all(Object.keys(props.cart).map(async(i)=>{
                const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i}`)
                const data2 = await response2.json()
                // console.log(data2);

                newObj[i]=data2
            }))
            console.log(newObj)
            setcartItems(newObj)
            setdetailsLoaded(true)
        }
        getItems()
        console.log("CI", cartItems);
    }

    let total=0
    let refreshing = false
    return(
        <View style={{height: '100%'}}>
            {refreshing ? <ActivityIndicator /> : null}
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} colors={["#1C6758"]} onRefresh={onReload} />}>
            <Text id={a+90} style={{margin: 9, fontWeight: '700', fontSize: 14, marginLeft: 12}}>Cart Items List</Text>
            

            {
                
                detailsLoaded ? Object.keys(cartItems).map((i)=>{
                    total = total+(prices[cartItems[i]['itemId']]*props.cart[cartItems[i]['itemId']]);
                    console.log("I", cartItems[i]['itemImage']);
                    return <CartItem key={Math.floor(Math.random()*10000)} id={cartItems[i]['itemId']} img={cartItems[i]['itemImage']} cart={props.cart} a={a} seta={seta} onReload={onReload} setcart={props.setcart} title={cartItems[i]['itemName']} qty={props.cart[cartItems[i]['itemId']]} pricePerUnit={prices[cartItems[i]['itemId']]} />
                }):''
            }
            {/* <CartItem img={'/home/tom/Desktop/Projects/user_app-1/assets/vegies/tomato.png'} title="Tomatoo" pricePerUnit={50} qty={2} /> */}
            <View style={[styles.cartBottomText, {backgroundColor: '#fff', paddingBottom: 10}]}><Text style={styles.cartBottomText}>Sub Total</Text><Text style={styles.cartBottomText}>₹ {total}</Text></View>
            
            <Button status="primary" disabled={total!=0 ? false:true} onPress={()=>{navigation.navigate("Current Order", {prices: prices, cartItems: cartItems, cart: props.cart, setcart: props.setcart})}} style={{width: '95%', alignSelf: 'center', marginVertical: 10, elevation: total!=0?2:0}} accessoryLeft={()=>{return <FontAwesome name="check-square-o" size={16} color={"#fff"} />}}>Checkout</Button>
        </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    cartItem:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFF",
        paddingVertical: 10,
        borderBottomColor: '#777',
        borderBottomWidth: 0.3
    },
    image:{
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginHorizontal: 13
    },
    title:{
        fontWeight: '700',
        fontSize: 14
    },
    qty:{
        fontWeight: '600',
        fontSize: 12,
        color: '#666'
    },
    innerView:{
        flexDirection: 'row',
        justifyContent: 'space-between'
        
    },
    price:{
        alignSelf: 'center',
        fontWeight: '700',
        marginTop: 8
    },
    cartBottomText:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 4,
        paddingHorizontal: 11,
        fontWeight: '700',
        color: '#666',
        fontSize: 15
    }
})