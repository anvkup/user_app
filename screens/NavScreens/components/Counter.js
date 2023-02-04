import { Entypo } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useState } from "react";

export default function Counter(props){
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#1C6758", borderWidth: 2, borderRadius: 5, backgroundColor: "#1C6758", marginTop: 6}}>
            <Entypo name="minus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#1C6758', color: "#fff", backgroundColor: "#1C6758"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)+props.key); console.log("OBJ@++", obj); obj[props.key]=props.cart[props.key]-1; console.log(obj); props.setCart(obj)}} />
            <Text style={{fontSize: 14, fontWeight: '700', borderLeftColor: "#1C6758", borderRightColor: '#1C6758', backgroundColor: "#fff", paddingVertical: 6, alignSelf: 'center', borderTopWidth: 0, borderBottomWidth: 0, paddingHorizontal: 14, paddingLeft: 18, borderWidth: 2}}>{props.qty}</Text>
            <Entypo name="plus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#1C6758', color: "#fff", backgroundColor: "#1C6758"}} onPress={()=>{let obj=props.cart; seta(Math.floor(Math.random()*1000)+props.key); console.log("OBJ@++", obj); obj[props.key]=props.cart[props.key]-1; console.log(obj); props.setCart(obj)}} />
        </View>
    )
}