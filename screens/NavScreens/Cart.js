import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { Button, Card, Text } from "@ui-kitten/components"
import { useEffect, useState, React } from "react"
import { InteractionManager } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Image, ScrollView, StyleSheet, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
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
            const response = await fetch(`http://192.168.0.5:8000/api/users/getItems`)
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
            await Promise.all(Object.keys(props.cart).map(async(i)=>{
                const response2 = await fetch(`http://192.168.0.5:8000/api/items/getItemDetails?itemId=${i}`)
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

    return(
        <ScrollView>
            <Text id={a+90} style={{margin: 9, fontWeight: '700', fontSize: 14, marginLeft: 12}}>Cart Items List</Text>
            

            {
                detailsLoaded ? Object.keys(cartItems).map((i)=>{
                    console.log("I", cartItems[i]['itemImage']);
                    return <CartItem key={i+a} img={cartItems[i]['itemImage']} title={cartItems[i]['itemName']} qty={props.cart[cartItems[i]['itemId']]} pricePerUnit={prices[cartItems[i]['itemId']]} />
                }):''
            }
            {/* <CartItem img={'/home/tom/Desktop/Projects/user_app-1/assets/vegies/tomato.png'} title="Tomatoo" pricePerUnit={50} qty={2} /> */}
            <View style={[styles.cartBottomText, {backgroundColor: '#fff', paddingBottom: 10}]}><Text style={styles.cartBottomText}>Sub Total</Text><Text style={styles.cartBottomText}>$ 190</Text></View>
            
            <Button status="primary" onPress={()=>{navigation.navigate("Current Order")}}  style={{width: '95%', alignSelf: 'center', marginVertical: 10}} accessoryLeft={()=>{return <FontAwesome name="check-square-o" size={16} color={"#fff"} />}}>Checkout</Button>
        </ScrollView>
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