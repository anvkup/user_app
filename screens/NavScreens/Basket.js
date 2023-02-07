import { Fontisto, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, Card, Text } from "@ui-kitten/components";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Basket({navigator}){
    return(
        <View>
            <MaterialCommunityIcons name="basket-plus" style={{fontSize: 28, color: 'white', padding: 16, zIndex: 100, position: 'absolute', bottom: 20, elevation: 5, right: 20, backgroundColor: '#1C6758', borderRadius: 30}} />
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
                <Button appearance="filled" style={{marginTop: 10, marginBottom:7}} accessoryLeft={()=>{return(<Fontisto name="shopping-basket-add" style={{color: 'white', fontSize: 16}} />)}}>Add To Cart Directly</Button>
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