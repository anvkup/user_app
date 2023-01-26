import { Entypo } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useState } from "react";

export default function Counter(props){
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#00bb00", borderWidth: 2, borderRadius: 5, backgroundColor: "#00bb00", marginTop: 6}}>
            <Entypo name="minus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.oldCart; console.log("OBJ@++", obj); obj[props.itemId]=props.qty-1; console.log(obj); props.setCart(obj)}} />
            <Text style={{fontSize: 14, fontWeight: '700', borderLeftColor: "#00bb00", borderRightColor: '#00bb00', backgroundColor: "#fff", paddingVertical: 6, alignSelf: 'center', borderTopWidth: 0, borderBottomWidth: 0, paddingHorizontal: 14, paddingLeft: 18, borderWidth: 2}}>{props.qty}</Text>
            <Entypo name="plus" size={14} style={{alignSelf: 'center', paddingHorizontal: 9, paddingVertical: 8, borderColor: '#00bb00', color: "#fff", backgroundColor: "#00bb00"}} onPress={()=>{let obj=props.oldCart; obj[props.itemId]=props.qty+1; props.setCart(obj)}} />
        </View>
    )
}