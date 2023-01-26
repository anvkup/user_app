import { Button, Card, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSlider } from "react-native-image-slider-banner";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Counter from "./components/Counter";

export default function Home(props, { navigation }) {

    const [itemsSelected, setitemsSelected] = useState({ '1': 'he' })
    const [itemsList, setitemsList] = useState([])
    const [itemsDetails, setitemsDetails] = useState({})
    const [itemsDetailsLoaded, setitemsDetailsLoaded] = useState(false)
    const [cart, setcart] = useState({})
    
    useEffect(() => {
        async function getItems() {
            const response = await fetch(`http://192.168.0.5:8000/api/users/getItems`)
            const data = await response.json()
            // console.log(data);
            setitemsList(data)
            const newObj = {}
            // console.log(itemsList);
            await Promise.all(data.map(async(i)=>{
                const response2 = await fetch(`http://192.168.0.5:8000/api/items/getItemDetails?itemId=${i['itemId']}`)
                const data2 = await response2.json()
                // console.log(data2);

                newObj[data2['itemId']]=data2
            }))
            setitemsDetails(newObj)
            setitemsDetailsLoaded(true)
            // console.log("Item Details==>", itemsDetails)
            console.log("+++", itemsDetails)
            // console.log("Item Details2==>", itemsDetails)
        }
        getItems()
    }, [])

    return (
        // <SafeAreaView>
        <ScrollView>
            <ImageSlider caroselImageContainerStyle={{ marginTop: -50 }} data={[
                { img: require('/home/tom/Desktop/Projects/user_app-1/assets/fresh.webp') },
                { img: require('/home/tom/Desktop/Projects/user_app-1/assets/sale30.webp') },
                { img: require('/home/tom/Desktop/Projects/user_app-1/assets/sale.jpg') }
            ]} localImg autoPlay={true} />
            <Text style={{ marginTop: -30, marginLeft: 16, fontWeight: '800', fontSize: 16 }}>Freshly Arrived Vegies</Text>
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }} id={cart}>
                {
                    itemsDetailsLoaded ? itemsList.map((i)=>{
                        console.log(cart);
                        console.log('========================================');
                        return (
                            <Card style={styles.card} key={i['itemId']} status={i['quantity']>10 ? 'primary': i['quantity']==0 ? 'danger': 'warning'}>
                                <Image source={{uri: `http://192.168.0.5:8000/api/getFile?uri=${itemsDetails[i['itemId']]['itemImage']}`}} style={styles.cardImage} />
                                <Text style={styles.cardText}>{itemsDetails[i['itemId']]['itemName']}</Text>
                                <Text style={styles.cardPrice}>$ {i['price']} per/kg</Text>
                                <Text status={i['quantity']>10 ? 'primary': i['quantity']==0 ? 'danger': 'warning'} style={styles.inStock}>{i['quantity']>10 ? 'In Stock': i['quantity']==0 ? 'Out Of Stock': 'Few left in Stock'}</Text>
                                {
                                    cart[i['itemId']]==null || cart[i['itemId']]==0 ? 
                                    <Button appearance="outline" disabled={i['quantity']!=0 ? false:true} style={styles.addBtn} onPress={()=>{let obj=cart; obj[i['itemId']]=1; console.log("OBJ==", obj); setcart(obj); console.log("New Cart=", cart);}} accessoryLeft={() => { return (<Entypo name="plus" style={{ fontSize: 20, color: i['quantity']!=0 ? "#00bb00":'#ccc' }} />) }} >Add to Cart</Button> :  
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#00bb00", borderWidth: 2, borderRadius: 5, backgroundColor: "#00bb00", marginTop: 6}}>
                                        <Entypo name="minus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=cart; console.log("OBJ@++", obj); obj[i['itemId']]=cart[i['itemId']]-1; console.log(obj); setcart(obj)}} />
                                        <Text style={{fontSize: 14, fontWeight: '700', borderLeftColor: "#00bb00", borderRightColor: '#00bb00', backgroundColor: "#fff", paddingVertical: 6, alignSelf: 'center', borderTopWidth: 0, borderBottomWidth: 0, paddingHorizontal: 14, paddingLeft: 18, borderWidth: 2}}>{cart[i['itemId']]}</Text>
                                        <Entypo name="plus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=cart; obj[i['itemId']]=cart[i['itemId']]+1; setcart(obj)}} />
                                    </View>
                                }
                            </Card> 
                        )
                    }):''
                }
            </View>
        </ScrollView>
        // </SafeAreaView>
    )
}

// {itemsDetails[(i['itemId'])]['itemName']}

const styles = StyleSheet.create({
    twoCardView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    card: {
        width: '47%',
        shadowColor: '#000',
        elevation: 2,
        marginTop: 10
    },
    cardImage: {
        width: '100%',
        height: 90,
        resizeMode: 'contain'
    },
    cardText: {
        marginTop: 10,
        fontWeight: '700',
        fontSize: 14
    },
    cardPrice: {
        fontWeight: '700',
        fontSize: 12,
        marginTop: -1
    },
    inStock: {
        fontSize: 12,
        marginTop: 8,
        fontWeight: '700'
    },
    addBtn: {
        backgroundColor: '#FFF',
        fontWeight: '500',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 6
    }

})
