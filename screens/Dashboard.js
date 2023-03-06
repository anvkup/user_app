import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Alert } from "react-native"
import { useState } from "react"
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import Basket from "./NavScreens/Basket"
import Cart from "./NavScreens/Cart"
import Home from "./NavScreens/Home"
import Profile from "./NavScreens/Profile"
import { Input } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Dashboard(props, {navigation, route}){

    const BottomBar = createBottomTabNavigator()
    const [searchQuery, setsearchQuery] = useState('')
    const [filteredArray, setfilteredArray] = useState([])
    const [showSearchInput, setshowSearchInput] = useState(false)

    async function getSearchResult(){
        if(searchQuery!=''){

            console.log('###################################################################');
            console.log(searchQuery);
            console.log('###################################################################');
            const response = await fetch(`http://20.193.147.19:80/api/items/getSearchResult?keyword=${searchQuery.toLowerCase()}`)
            const data = await response.json()
            console.log('query', searchQuery);
            setfilteredArray(data)
            console.log('search res', data);
        }else{
            setfilteredArray([])
        }
    }

    return(
        <BottomBar.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: '#3D8361', tabBarInactiveTintColor: '#000', tabBarLabelStyle: {fontWeight: '600', fontSize: 11}, tabBarStyle: {height: 60, paddingVertical: 2}, tabBarItemStyle: {paddingVertical: 7}, headerLeftContainerStyle: {padding: 5}, headerStyle:{height: 80, shadowColor: '#000', elevation: 6}}}>
            <BottomBar.Screen name="Home" children={()=>{return <Home cart={props.cart} setCart={props.setcart} filteredArray={filteredArray} />}}
             options={
                showSearchInput ? {
                tabBarLabel: 'Home', 
                tabBarIcon: ({focused, color})=>{return <AntDesign style={{fontSize: 22, color: focused ? '#3D8361':'#000'}} name="home" />}, 
                headerLeftContainerStyle: {padding: 5}, 
                headerTitle: "Cartout", 
                headerRight:()=>{return <Feather name="search" style={{fontSize: 23}} onPress={()=>{setshowSearchInput(true)}} />}, 
                headerRightContainerStyle:{paddingRight: 14}, 
                headerShown: true, 
                headerStyle:{height: 80, shadowColor: '#000', elevation: 6}, 
                header: ()=>{return(<SafeAreaView><Input placeholder="Enter Product Name" value={searchQuery} onChangeText={text=>{setsearchQuery(text); getSearchResult()}} accessoryRight={()=>{return(<Entypo name="cross" style={{fontSize: 22, color: '#666'}} onPress={()=>{setshowSearchInput(false); setsearchQuery(''); setfilteredArray([])}} />)}} style={{padding: 10, height: 50, marginBottom: 8}} /></SafeAreaView>)}
                }:{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused, color})=>{return <AntDesign style={{fontSize: 22, color: focused ? '#3D8361':'#000'}} name="home" />}, 
                    headerLeftContainerStyle: {padding: 5},
                    headerTitle: "Cartout", 
                    headerRight:()=>{return <Feather name="search" style={{fontSize: 23}} onPress={()=>{setshowSearchInput(true)}} />}, 
                    headerRightContainerStyle:{paddingRight: 14}, 
                    headerShown: true, 
                    
                }} />
            <BottomBar.Screen name="Baskets" children={()=>{return <Basket setcart={props.setcart} />}} options={{tabBarLabel: 'Basket', tabBarIcon: ({focused, color})=>{return <FontAwesome5 style={{fontSize: 22, color: focused ? '#3D8361':'#000'}} name="shopping-basket" />}, headerShown: true}} />
            <BottomBar.Screen name="Shopping Cart" children={()=>{return <Cart cart={props.cart} setcart={props.setcart} />}} options={{tabBarLabel: 'Cart', tabBarIcon: ({focused, color})=>{return <AntDesign style={{fontSize: 22, color: focused ? '#3D8361':'#000'}} name="shoppingcart" />}, headerShown: true}} />
            <BottomBar.Screen name="Profile" children={()=>{return<Profile setloggedIn={props.setloggedIn} />}} options={{tabBarLabel: 'Profile', tabBarIcon: ({focused, color})=>{return <Ionicons style={{fontSize: 22, color: focused ? '#3D8361':'#000'}} name="person-circle" />}, headerShown: true, headerRight: ()=>{return<FontAwesome5 name="user-edit" style={{fontSize: 22, color: '#000', marginRight: 15}} />}}} />
        </BottomBar.Navigator>
    )
}