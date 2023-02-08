import { View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, Card } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function Order({navigation ,route}){

    const [cartItems, setcartItems] = useState({})
    // console.log();
    const [prices, setprices] = useState({})
    const [detailsLoaded, setdetailsLoaded] = useState(false)
    const [a, seta] = useState(1)

    let total=0;


    useEffect(() => {
        
        async function getItems() {
            const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            const data = await response.json()

            let obj={}
        //     data.map((i)=>{
        // async function getItems() {
        //     const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
        //     const data = await response.json()

        // async function getItems() {
        //     const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
        //     const data = await response.json()

        // async function getItems() {
        //     const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
        //     const data = await response.json()

        //         obj[i['itemId']]=i['price']
        //         // setprices({...prices, obj})
        //         console.log("new prices=>", prices)
        //     })
        //     setprices(obj)

        //     // console.log(data);
        //     // setitemsList(data)
        //     // console.log(itemsList);
        //     let newObj={}
        //     await Promise.all(Object.keys(props.cart).map(async(i)=>{
        //         const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i}`)
        //         const data2 = await response2.json()
        //         // console.log(data2);

        //         newObj[i]=data2
        //     }))
        //     console.log(newObj)
        //     setcartItems(newObj)
        //     setdetailsLoaded(true)
        }
        // getItems()
        // console.log("CI", cartItems);
    }, [])

    return (
        <View>
            <View style={{padding: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 0.8, borderBottomColor: '#777'}}>
            <Text style={{fontWeight: '700', fontSize: 16}}>Luv Verma</Text>
            <Text style={{fontSize: 12, fontWeight: '700'}}>Phone: +91 9549982610</Text>
            <View style={{fontSize: 12, fontWeight: '700', justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontWeight: '700'}}>Address: D-138, 2F, West Vinod Nagar Delhi - 110092</Text>
                <Feather name="edit" size={14} style={{fontWeight: '800'}} onPress={()=>{alert('Address Editing to be Added')}} />
            </View>
            </View>
            <Text style={{fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 20, padding: 13, fontSize: 13, borderBottomColor: '#777', borderBottomWidth: 0.7}}>Items:</Text>
            {
                cartItems && Object.keys(cartItems).map((i)=>{
                    total = total+(prices[i]*cart[cartItems[i]['itemId']])
                    return(
                            <View style={styles.cartItem}>
                                <Image source={{uri: `http://20.193.147.19:80/api/getFile?uri=${cartItems[i]['itemImage']}`}} style={styles.image} />
                                <View style={{flexGrow: 1}}>
                                    <Text style={{fontWeight: '700', fontSize: 15.5}}>{cartItems[i]['itemName']}</Text>
                                    <Text style={{fontWeight: '700', fontSize: 12, color: '#666'}}>{"$"+prices[i]+ " x "+cart[cartItems[i]['itemId']]}</Text>
                                </View>
                                <Text style={{fontWeight:'700', marginRight: 10}}>$ {prices[i]*cart[cartItems[i]['itemId']]}</Text>
                            </View>
                        )
                    })
                }
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 10, padding: 5}}>
                    <Text style={{fontWeight: '700'}}>SubTotal :</Text>
                    <Text style={{fontWeight: '700'}}>${total}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Deilvery Charges :</Text>
                    <Text style={{fontWeight: '700'}}>${40}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 4}}>
                    <Text style={{fontWeight: '700'}}>Discount :</Text>
                    <Text style={{fontWeight: '700'}}>${50}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, padding: 5}}>
                    <Text style={{fontWeight: '700'}}>Amount to be Paid :</Text>
                    <Text style={{fontWeight: '700'}}>${total-10}</Text>
                </View>
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