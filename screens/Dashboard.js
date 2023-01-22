import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons"
import Basket from "./NavScreens/Basket"
import Cart from "./NavScreens/Cart"
import Home from "./NavScreens/Home"
import Profile from "./NavScreens/Profile"

export default function Dashboard(){

    const BottomBar = createBottomTabNavigator()

    return(
        <BottomBar.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: '#00bb00', tabBarInactiveTintColor: '#000', tabBarLabelStyle: {fontWeight: '600', fontSize: 11}, tabBarStyle: {height: 60, paddingVertical: 2}, tabBarItemStyle: {paddingVertical: 7}}}>
                <BottomBar.Screen name="Home" component={Home} options={{tabBarLabel: 'Home', tabBarIcon: ({focused, color})=>{return <AntDesign style={{fontSize: 22, color: focused ? '#00bb00':'#000'}} name="home" />}}} />
                <BottomBar.Screen name="Basket" component={Basket} options={{tabBarLabel: 'Basket', tabBarIcon: ({focused, color})=>{return <FontAwesome5 style={{fontSize: 22, color: focused ? '#00bb00':'#000'}} name="shopping-basket" />}}} />
                <BottomBar.Screen name="Cart" component={Cart} options={{tabBarLabel: 'Cart', tabBarIcon: ({focused, color})=>{return <AntDesign style={{fontSize: 22, color: focused ? '#00bb00':'#000'}} name="shoppingcart" />}}} />
                <BottomBar.Screen name="Profile" component={Profile} options={{tabBarLabel: 'Profile', tabBarIcon: ({focused, color})=>{return <Ionicons style={{fontSize: 22, color: focused ? '#00bb00':'#000'}} name="person-circle" />}}} />
            </BottomBar.Navigator>
    )
}