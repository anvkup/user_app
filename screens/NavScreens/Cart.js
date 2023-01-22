import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { Button, Card, Text } from "@ui-kitten/components"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CartItem from "./components/CartItem"
import Counter from "./components/Counter"

export default function Cart({navigator}){
    return(
        <ScrollView>
            <Text style={{margin: 9, fontWeight: '700', fontSize: 14, marginLeft: 12}}>Cart Items List</Text>
            <View style={styles.cartItem}>
                <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/cabbage.png')} style={styles.image} />
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title}>Cabbage</Text>
                    <Text style={styles.qty}>$ 25 per/kg</Text>
                    <View style={styles.innerView}>
                        <Text style={styles.price}>$ 50</Text>
                    </View>
                </View>
                <View style={{marginRight: 20}}>
                    <Counter qty={1} />
                </View>
            </View>
            <View style={styles.cartItem}>
                <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/cabbage.png')} style={styles.image} />
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title}>Cabbage</Text>
                    <Text style={styles.qty}>Qty: 2kg</Text>
                    <View style={styles.innerView}>
                        <Text style={styles.price}>$ 50</Text>
                    </View>
                </View>
                <View style={{marginRight: 20}}>
                    <Counter qty={1} />
                </View>
            </View>
            <View style={styles.cartItem}>
                <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/cabbage.png')} style={styles.image} />
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title}>Cabbage</Text>
                    <Text style={styles.qty}>Qty: 2kg</Text>
                    <View style={styles.innerView}>
                        <Text style={styles.price}>$ 50</Text>
                    </View>
                </View>
                <View style={{marginRight: 20}}>
                    <Counter qty={1} />
                </View>
            </View>
            <CartItem img={'/home/tom/Desktop/Projects/user_app-1/assets/vegies/cabbage.png'} title="Cauliflower" pricePerUnit={40} qty={1} />
            <View style={[styles.cartBottomText, {backgroundColor: '#fff', paddingBottom: 10}]}><Text style={styles.cartBottomText}>Sub Total</Text><Text style={styles.cartBottomText}>$ 190</Text></View>
            {/* <View style={{backgroundColor: '#fff', paddingTop: 7}}>
                <View style={styles.cartBottomText}><Text style={styles.cartBottomText}>Delivery Charges</Text><Text style={styles.cartBottomText}>$ 30</Text></View>
                <View style={styles.cartBottomText}><Text style={styles.cartBottomText}>Discount</Text><Text style={styles.cartBottomText}>-  $ 40</Text></View>
                <View style={[styles.cartBottomText, {marginTop: 5}]}><Text style={[styles.cartBottomText, {color: "#000"}]}>Total Amount</Text><Text style={[styles.cartBottomText]}>-  $ 180</Text></View>
            </View> */}
            <Button status="primary" style={{width: '95%', alignSelf: 'center', marginVertical: 10}} accessoryLeft={()=>{return <FontAwesome name="check-square-o" size={16} color={"#fff"} />}}>Checkout</Button>
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