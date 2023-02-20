import { Fontisto, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Input, List, SelectItem, Text, Select, IndexPath } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Basket(props){
    
    const navigator = useNavigation()

    const [itemsList, setitemsList] = useState([])
    const [itemsDetails, setitemsDetails] = useState({})
    const [itemsDetailsLoaded, setitemsDetailsLoaded] = useState(false)
    const [baskets, setbaskets] = useState([])

    // const [props.cart, props.setCart] = useState({})
    const [a, seta] = useState(false)
    const [basketCreationList, setbasketCreationList] = useState({})
    const [basketCreationTitle, setbasketCreationTitle] = useState("Random Basket")

    useEffect(() => {
        async function getItems() {
            console.log('Basket milestone 1');
            const response = await fetch(`http://20.193.147.19:80/api/users/getItems`)
            const data = await response.json()
            // console.log(data);
            setitemsList(data)
            let newObj = {}
            console.log('Basket milestone 2');
            // console.log(itemsList);
            await Promise.all(data.map(async (i) => {
                const response2 = await fetch(`http://20.193.147.19:80/api/items/getItemDetails?itemId=${i['itemId']}`)
                const data2 = await response2.json()
                // console.log(data2);
                console.log('Basket milestone 3');

                newObj[data2['itemId']] = data2
            }))
            setitemsDetails(newObj)
            setitemsDetailsLoaded(true)
            // console.log("Item Details==>", itemsDetails)
            console.log("+++", itemsDetails)
            console.log('=-=-=', itemsDetails);
            // console.log("Item Details2==>", itemsDetails)
            try {
                AsyncStorage.getItem('token', async (err, result)=>{
                console.log('Basket milestone 4');
                console.log(result);
                    if (err) throw err;
                    const responseBasket = await fetch('http://20.193.147.19:80/api/users/getBasket', {
                        method: 'get',
                        headers: {
                            'token': result
                        }
                    })
                    const dataBasket = await responseBasket.json()
                    setbaskets(dataBasket)
                    console.log(responseBasket);
                    console.log("BASKET", dataBasket);
                console.log('Basket milestone 5');
            })  
            } catch (error) {
                throw error
                setbaskets([])
            }
        }
        getItems()

        let obj = {}
        Object.keys(itemsDetails).map((i)=>{
            obj[i]=0
        })
        setbasketCreationList(obj)
    }, [])

    const [showBasketCreationBox, setshowBasketCreationBox] = useState(false)
    function createBasket(){
        Alert.alert('Fixing some Errors in this.', 'To be Updated soon...')
        // ToastAndroid.show('Creating Basket, huhh?', 1000)
    }

    const [selectedItemsForBasket, setselectedItemsForBasket] = useState([{1: 1}, {2: 2}])

    let basketNum=0;

    function addToCart(list){
        let cartList = {}
        list.map((item)=>{
            cartList[item['itemId']]=item['quantity']
        })
        props.setcart(cartList)
        navigator.navigate('Shopping Cart')
    }

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))
    function createBasket(){
        const obj = {}
        obj[basketCreationTitle]=basketCreationList
        console.log("FINAL OBJ", obj);
        AsyncStorage.getItem("token", async(err, data)=>{
            if(err) throw err;
            const response = await fetch('http://20.193.147.19:80/api/users/createBasket', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': data
                },
                body:{
                    basket: obj
                }
            })
        })
    }

    return(
        <View>
            <MaterialCommunityIcons name="basket-plus" onPress={()=>{setshowBasketCreationBox(true)}} style={{fontSize: 28, color: 'white', padding: 16, zIndex: 8, position: 'absolute', bottom: 20, elevation: 5, right: 20, backgroundColor: '#1C6758', borderRadius: 30}} />
            {
                showBasketCreationBox ? <View style={{position: 'absolute', selfAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Card style={{backgroundColor: '#fff'}}>
                        <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center', marginBottom: 20, marginTop: 10}}>Add Items to a Basket</Text>
                        <View>
                            {
                                Object.keys(basketCreationList).length!=0 && Object.keys(basketCreationList).map((i)=>{
                                    return <View style={{ width: '100%', flexDirection: 'row' }}>
                                
                                <Text style={{marginHorizontal: 10}}>{itemsDetails[i]['itemName']}</Text>
                            <Select style={{flexGrow: 1}} selectedIndex={new IndexPath(basketCreationList[i]-1)} placeholder='Quantity' onSelect={index => {let obj=basketCreationList; obj[i]=index.row; console.log(index.row); setbasketCreationList(obj); seta(!a); console.log("Updated basket Cr list", basketCreationList);}}>
                                    <SelectItem title={0} />
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
                        <Button style={{marginVertical: 10, marginTop: 20, width: '100%' }} onPress={createBasket}>Create Basket</Button>
                    </Card>
                </View>:<Text>H</Text>
            }
        <ScrollView style={{minHeight: '100%'}}>
            

            {
                baskets.length !=0 ? baskets.map((b)=>{
                    console.log('b==', b);
                    console.log();
                    basketNum++;
                    return <Card style={{marginTop: 6, borderRadius: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 12}}>Basket {basketNum}</Text>
                        <Text style={{fontSize: 13, fontWeight: '600', marginBottom: 5}}>{Object.keys(b)[0]}</Text>
                        {
                            b[Object.keys(b)[0]].map((bi)=>{
                                console.log('bi==', bi);
                                return <View style={styles.singleItem}>
                                <Image style={styles.image} source={{uri: `http://20.193.147.19:80/api/getFile?uri=${bi['itemImage']}`}} />
                                {/* <View> */}
                                    <Text style={styles.itemName}>{bi['itemName']}</Text>
                                    <Text style={styles.itemName}>{bi['quantity']} kg</Text>
                                {/* </View> */}
                                {/* <Text style={styles.price}>$ 8 per/kg</Text> */}
                            </View>
                            })
                        }
                        <Button onPress={()=>{addToCart(b[Object.keys(b)[0]])}} style={{marginVertical: 15}}><MaterialCommunityIcons name="cart-arrow-right" style={{color: 'white', fontSize: 20}} />  Add Directly to Cart</Button>
                    </Card>
                }):<Card style={{height: '100%'}}>
                    <Text style={{color: '#a4a4a4', fontWeight: '700', fontSize: 14}}>No Baskets Added Yet! Either create one or Place Order to add Basket Automatically</Text>
                </Card>
            }

        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 60,
        height: 60,
        resizeMode: 'contain',
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
        marginLeft: 30,
        flexGrow: 1
    }
})