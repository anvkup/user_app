import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard"

export default function DashboardNavigator(){

    const Stack = createNativeStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}