import { Button, Card, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSlider } from "react-native-image-slider-banner";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Counter from "./components/Counter";

export default function Home(props, { navigation }) {

    const [itemsList, setitemsList] = useState([])
    const [itemsDetails, setitemsDetails] = useState({})
    const [itemsDetailsLoaded, setitemsDetailsLoaded] = useState(false)
    // const [props.cart, props.setCart] = useState({})
    const [a, seta] = useState(1)

    useEffect(() => {
        async function getItems() {
            const response = await fetch(`http://156.67.219.185:8002/api/users/getItems`)
            const data = await response.json()
            // console.log(data);
            setitemsList(data)
            let newObj = {}
            // console.log(itemsList);
            await Promise.all(data.map(async(i)=>{
                const response2 = await fetch(`http://156.67.219.185:8002/api/items/getItemDetails?itemId=${i['itemId']}`)
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
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }} id={props.cart}>
                {
                    itemsDetailsLoaded ? itemsList.map((i)=>{
                        console.log(props.cart);
                        console.log('========================================');
                        return (
                            <Card style={styles.card} id={a} key={i['itemId']} status={i['quantity']>10 ? 'primary': i['quantity']==0 ? 'danger': 'warning'}>
                                <Image source={{uri: `http://156.67.219.185:8002/api/getFile?uri=${itemsDetails[i['itemId']]['itemImage']}`}} style={styles.cardImage} />
                                <Text style={styles.cardText}>{itemsDetails[i['itemId']]['itemName']}</Text>
                                <Text style={styles.cardPrice}>$ {i['price']} per/kg</Text>
                                <Text status={i['quantity']>10 ? 'primary': i['quantity']==0 ? 'danger': 'warning'} style={styles.inStock}>{i['quantity']>10 ? 'In Stock': i['quantity']==0 ? 'Out Of Stock': 'Few left in Stock'}</Text>
                                {
                                    props.cart[i['itemId']]==null || props.cart[i['itemId']]==0 ? 
                                    <Button appearance="outline" disabled={i['quantity']!=0 ? false:true} style={styles.addBtn} onPress={()=>{let obj=props.cart; seta(i['itemId']*100); obj[i['itemId']]=1; console.log("OBJ==", obj); props.setCart(obj); console.log("New Cart=", props.cart);}} accessoryLeft={() => { return (<Entypo name="plus" style={{ fontSize: 20, color: i['quantity']!=0 ? "#00bb00":'#ccc' }} />) }} >Add to Cart</Button> :  
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#00bb00", borderWidth: 2, borderRadius: 5, backgroundColor: "#00bb00", marginTop: 6}}>
                                        <Entypo name="minus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)+i['itemId']); console.log("OBJ@++", obj); obj[i['itemId']]=props.cart[i['itemId']]-1; console.log(obj); props.setCart(obj)}} />
                                        <Text style={{fontSize: 14, fontWeight: '700', borderLeftColor: "#00bb00", borderRightColor: '#00bb00', backgroundColor: "#fff", paddingVertical: 6, alignSelf: 'center', borderTopWidth: 0, borderBottomWidth: 0, paddingHorizontal: 14, paddingLeft: 18, borderWidth: 2}}>{props.cart[i['itemId']]}</Text>
                                        <Entypo name="plus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)+i['itemId']); obj[i['itemId']]=props.cart[i['itemId']]+1; props.setCart(obj)}} />
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
