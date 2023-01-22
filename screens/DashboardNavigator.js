import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import Dashboard from "./Dashboard"
import CustomerSupport from "./NavScreens/CustomerSupport";
import FAQ from "./NavScreens/FAQ";
import Notifications from "./NavScreens/Notifcations";
import Orders from "./NavScreens/Orders";
import Settings from "./NavScreens/Settings";

export default function DashboardNavigator(){

    const Stack = createNativeStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false, headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="Orders" component={Orders} options={{headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="Notifications" component={Notifications} options={{headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="Settings" component={Settings} options={{headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="CustomerSupport" component={CustomerSupport} options={{headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="FAQ" component={FAQ} options={{headerTitle: "Surf Vegies"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}