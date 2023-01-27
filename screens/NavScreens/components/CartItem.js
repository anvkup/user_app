import React, {useEffect, useState} from "react";
import { Entypo } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";
import Counter from "./Counter";

export default function CartItem(props) {

    const a = props.a
    const seta = props.seta

    return props.qty!=0 && <View style={styles.cartItem} key={a}>
                <Image source={{uri: `http://192.168.0.5:8000/api/getFile?uri=${props.img}`}} style={styles.image} />
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.qty}>$ {props.pricePerUnit} per/kg</Text>
                    <View style={styles.innerView}>
                        <Text style={styles.price}>$ {props.pricePerUnit*props.qty}</Text>
                    </View>
                </View>
                <View style={{marginRight: 20}}>
                <View key={a} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#00bb00", borderWidth: 2, borderRadius: 5, backgroundColor: "#00bb00", marginTop: 6}}>
                    <Entypo name="minus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)-parseInt(props.id)); console.log("OBJ@++", obj); obj[props.id]=props.cart[props.id]-1; console.log(obj); props.setcart(obj)}} />
                    <Text id={a} style={{fontSize: 14, fontWeight: '700', borderLeftColor: "#00bb00", borderRightColor: '#00bb00', backgroundColor: "#fff", paddingVertical: 6, alignSelf: 'center', borderTopWidth: 0, borderBottomWidth: 0, paddingHorizontal: 14, paddingLeft: 18, borderWidth: 2}}>{props.qty}</Text>
                    <Entypo name="plus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)+props.id); console.log("OBJ@++", obj); obj[props.id]=props.cart[props.id]+1; console.log(obj); props.setcart(obj)}} />
                </View>
                    {/* <Counter qty={props.qty} /> */}
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