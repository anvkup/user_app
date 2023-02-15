import { Fontisto, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, Card, Input, List, SelectItem, Text, Select, IndexPath } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Basket({navigator, route}){

    const [itemsList, setitemsList] = useState([])
    const [itemsDetails, setitemsDetails] = useState({})
    const [itemsDetailsLoaded, setitemsDetailsLoaded] = useState(false)

    // const [props.cart, props.setCart] = useState({})
    const [a, seta] = useState(1)

    useEffect(() => {
        async function getItems() {
            const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            const data = await response.json()
            // console.log(data);
            setitemsList(data)
            let newObj = {}
            // console.log(itemsList);
            await Promise.all(data.map(async (i) => {
                const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i['itemId']}`)
                const data2 = await response2.json()
                // console.log(data2);

                newObj[data2['itemId']] = data2
            }))
            setitemsDetails(newObj)
            setitemsDetailsLoaded(true)
            // console.log("Item Details==>", itemsDetails)
            console.log("+++", itemsDetails)
            // console.log("Item Details2==>", itemsDetails)
        }
        getItems()
    }, [])

    const [showBasketCreationBox, setshowBasketCreationBox] = useState(true)
    function createBasket(){
        Alert.alert()
        ToastAndroid.show('Creating Basket, huhh?', 1000)
    }

    const [selectedItemsForBasket, setselectedItemsForBasket] = useState([{1: new IndexPath(2)}, {2: new IndexPath(0)}])


    return(
        <View>
            <MaterialCommunityIcons name="basket-plus" onPress={createBasket} style={{fontSize: 28, color: 'white', padding: 16, zIndex: 100, position: 'absolute', bottom: 20, elevation: 5, right: 20, backgroundColor: '#1C6758', borderRadius: 30}} />
            {
                showBasketCreationBox && <View style={{position: 'absolute', selfAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Card style={{backgroundColor: '#fff'}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>Add Items to a Basket</Text>
                        <View>
                            {
                                selectedItemsForBasket.length!=0 && selectedItemsForBasket.map((i)=>{
                                    return <View style={{ flexDirection: 'row', width: '100%' }}><Select selectedIndex={i[Object.keys(i)[0]]} onSelect={index => {const obj = {}; obj[Object.keys(i)[0]]=0; setselectedItemsForBasket([...selectedItemsForBasket, ...[obj]]); console.log(selectedItemsForBasket)}} >
                                {
                                    itemsDetailsLoaded && Object.keys(itemsDetails).map((i2)=>{
                                        return <SelectItem title={itemsDetails[i2]['itemName']} />
                                    })
                                }
                            </Select>
                            
                            <Select>
                                    <SelectItem title={1} />
                                    <SelectItem title={2} />
                                    <SelectItem title={3} />
                                    <SelectItem title={4} />
                                    <SelectItem title={5} />
                                    <SelectItem title={6} />
                                    <SelectItem title={7} />
                                    <SelectItem title={8} />
                                    <SelectItem title={9} />
                                    <SelectItem title={10} />
                            </Select>
                            </View>
                                })
                            
                            }
                        </View>
                    </Card>
                </View>
            }
        <ScrollView>
            <Card style={{marginTop: 6, borderRadius: 5}}>
                <Text style={{fontWeight: '700', fontSize: 12}}>Basket 1</Text>
                <Text style={{fontSize: 13, fontWeight: '600', marginBottom: 5}}>Regular Vegetables</Text>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/potato.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Potato</Text>
                        <Text style={styles.itemName}>5 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 8 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/tomato.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Tomato</Text>
                        <Text style={styles.itemName}>2 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 50 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/broccoli.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Corriander</Text>
                        <Text style={styles.itemName}>1 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 60 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/carrot.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Carrot</Text>
                        <Text style={styles.itemName}>5 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 15 per/kg</Text>
                </View>
                <Button appearance="filled" style={{marginTop: 10, marginBottom:7}} accessoryLeft={()=>{return(<Fontisto name="shopping-basket-add" style={{color: 'white', fontSize: 16}} />)}}>Add To Cart Directly</Button>
            </Card>
            <Card style={{marginTop: 6, borderRadius: 5}}>
                <Text style={{fontWeight: '700', fontSize: 12}}>Basket 2</Text>
                <Text style={{fontSize: 13, fontWeight: '600', marginBottom: 5}}>Fruits</Text>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/potato.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Potato</Text>
                        <Text style={styles.itemName}>5 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 8 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/tomato.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Tomato</Text>
                        <Text style={styles.itemName}>2 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 50 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/broccoli.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Corriander</Text>
                        <Text style={styles.itemName}>1 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 60 per/kg</Text>
                </View>
                <View style={styles.singleItem}>
                    <Image style={styles.image} source={{uri: 'http://20.193.147.19:80/api/getFile?uri=assets/vegies/carrot.png'}} />
                    {/* <View> */}
                        <Text style={styles.itemName}>Carrot</Text>
                        <Text style={styles.itemName}>5 kg</Text>
                    {/* </View> */}
                    <Text style={styles.price}>$ 15 per/kg</Text>
                </View>
                <Button appearance="filled" style={{marginTop: 10, marginBottom:7}} accessoryLeft={()=>{return(<Fontisto name="shopping-basket-add" style={{color: 'white', fontSize: 16}} />)}} >Add To Cart Directly</Button>
            </Card>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    singleItem:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 10,
        paddingTop: 5,
        borderTopWidth: 0.3,
        borderTopColor: '#bbb'
    },
    itemName:{
        fontWeight: '700',
        fontSize: 15
    },
    price:{
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 30
    }
})