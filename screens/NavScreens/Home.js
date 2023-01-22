import { Button, Card, Text } from "@ui-kitten/components";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSlider } from "react-native-image-slider-banner";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Counter from "./components/Counter";

export default function Home({navigator}){

    const [itemsSelected, setitemsSelected] = useState({'1': 'he'})
    axios({baseURL: 'http://localhost:8000'})

    async function a(){
        const response = await axios.get('http://localhost:8000/', {method: 'get'})
        console.log(response);
    }
    a()

    return(
        // <SafeAreaView>
            <ScrollView>
            <ImageSlider caroselImageContainerStyle={{marginTop: -50}} data={[
                {img: require('/home/tom/Desktop/Projects/user_app-1/assets/fresh.webp')},
                {img: require('/home/tom/Desktop/Projects/user_app-1/assets/sale30.webp')},
                {img: require('/home/tom/Desktop/Projects/user_app-1/assets/sale.jpg')}
            ]} localImg autoPlay={true} />
            <Text style={{marginTop: -30, marginLeft: 16, fontWeight: '800', fontSize: 16}}>Freshly Arrived Vegies</Text>
            <View style={styles.twoCardView}>
                <Card style={styles.card} status="primary">
                    <Image source={{uri: 'https://pngimg.com/d/cauliflower_PNG12673.png'}} style={styles.cardImage} />
                    <Text style={styles.cardText}>Cauliflower</Text>
                    <Text style={styles.cardPrice}>$ 40 per/kg</Text>
                    <Text status="primary" style={styles.inStock}>In Stock</Text>
                    {/* <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button> */}
                    <Counter qty={1} />
                </Card>
                <Card style={styles.card} status="primary">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/carrot.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Carrot</Text>
                    <Text style={styles.cardPrice}>$ 20 per/kg</Text>
                    <Text status="primary" style={styles.inStock}>In Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
            </View>
            <View style={styles.twoCardView}>
                <Card style={styles.card} status="primary">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/tomato.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Tomato</Text>
                    <Text style={styles.cardPrice}>$ 60 per/kg</Text>
                    <Text status="primary" style={styles.inStock}>In Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
                <Card style={styles.card} status="primary">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/cabbage.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Cabbage</Text>
                    <Text style={styles.cardPrice}>$ 30 per/kg</Text>
                    <Text status="primary" style={styles.inStock}>In Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
            </View>
            <View style={styles.twoCardView}>
                <Card style={styles.card} status="warning">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/broccoli.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Broccoli</Text>
                    <Text style={styles.cardPrice}>$ 60 per/kg</Text>
                    <Text status="warning" style={styles.inStock}>Few left Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
                <Card style={styles.card} status="warning">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/capsicum.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Capsicum</Text>
                    <Text style={styles.cardPrice}>$ 50 per/kg</Text>
                    <Text status="warning" style={styles.inStock}>Few left in Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
            </View>
            <View style={styles.twoCardView}>
                <Card style={styles.card} status="warning">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/potato.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Potato</Text>
                    <Text style={styles.cardPrice}>$ 8 per/kg</Text>
                    <Text status="warning" style={styles.inStock}>Few left in Stock</Text>
                    <Button appearance="outline" style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#00bb00'}} />)}} >Add to Cart</Button>
                </Card>
                <Card style={styles.card} status="danger">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/banana.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Banana</Text>
                    <Text style={styles.cardPrice}>$ 70 per/kg</Text>
                    <Text status="danger" style={styles.inStock}>Out of Stock</Text>
                    <Button appearance="outline" disabled={true} style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#bbb'}} />)}} >Add to Cart</Button>
                </Card>
            </View>
            <View style={styles.twoCardView}>
                <Card style={styles.card} status="danger">
                    <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/peas.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Peas</Text>
                    <Text style={styles.cardPrice}>$ 40 per/kg</Text>
                    <Text status="danger" style={styles.inStock}>Out of Stock</Text>
                    <Button appearance="outline" disabled={true} style={styles.addBtn} accessoryLeft={()=>{return(<Entypo name="plus" style={{fontSize: 20, color: '#ddd'}} />)}} >Add to Cart</Button>
                </Card>
            </View>
            </ScrollView>
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    twoCardView:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    card:{
        width: '47%',
        shadowColor: '#000',
        elevation: 2
    },
    cardImage:{
        width: '100%',
        height: 90,
        resizeMode: 'contain'
    },
    cardText:{
        marginTop: 10,
        fontWeight: '700',
        fontSize: 14
    },
    cardPrice:{
        fontWeight: '700',
        fontSize: 12,
        marginTop: -1
    },
    inStock:{
        fontSize: 12,
        marginTop: 8,
        fontWeight: '700'
    },
    addBtn:{
        backgroundColor: '#FFF',
        fontWeight: '500',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 6
    }

})