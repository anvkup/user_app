import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Counter from "./Counter";

export default function CartItem(props) {
    return <View style={styles.cartItem}>
                <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/vegies/potato.png')} style={styles.image} />
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.qty}>$ {props.pricePerUnit} per/kg</Text>
                    <View style={styles.innerView}>
                        <Text style={styles.price}>$ {props.pricePerUnit*props.qty}</Text>
                    </View>
                </View>
                <View style={{marginRight: 20}}>
                    <Counter qty={props.qty} />
                </View>
            </View>
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
    }
})