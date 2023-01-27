import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import Dashboard from "./Dashboard"
import CurrentOrder from "./NavScreens/CurrentOrder";
import CustomerSupport from "./NavScreens/CustomerSupport";
import FAQ from "./NavScreens/FAQ";
import Notifications from "./NavScreens/Notifcations";
import Orders from "./NavScreens/Orders";
import Settings from "./NavScreens/Settings";

export default function DashboardNavigator(){

    const Stack = createNativeStackNavigator()
    const [cart, setcart] = useState({})

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" children={()=>{return <Dashboard cart={cart} setcart={setcart} />}} options={{headerShown: false, headerTitle: "Surf Vegies"}} />
                <Stack.Screen name="Orders" component={Orders} options={{headerTitle: "Orders"}} />
                <Stack.Screen name="Notifications" component={Notifications} options={{headerTitle: "Notifications"}} />
                <Stack.Screen name="Settings" component={Settings} options={{headerTitle: "Settings"}} />
                <Stack.Screen name="CustomerSupport" component={CustomerSupport} options={{headerTitle: "Customer Support"}} />
                <Stack.Screen name="FAQ" component={FAQ} options={{headerTitle: "FAQ"}} />
                <Stack.Screen name="Current Order" children={()=>{return <CurrentOrder cart={cart} setcart={setcart} />}} options={{headerTitle: "Current Order"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}