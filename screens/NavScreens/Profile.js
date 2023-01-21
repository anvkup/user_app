import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({navigator}){
    return(
        <SafeAreaView>
            <View style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                {/* <Image source={require('/home/tom/Desktop/Projects/user_app-1/assets/person.jpeg')} style={{width: 140, height: 140, borderRadius: 70}} /> */}
                <Ionicons name="person-sharp" style={{color: '#000',fontSize: 55, borderRadius: 50, marginHorizontal: 8}} />
                <View style={{width: '100%', flexGrow: 1, paddingHorizontal: 10, right: 0, flexWrap: 'wrap'}}>
                    <Text style={{fontWeight: '800', fontSize: 19}}>Alicia Lorraine</Text>
                    <Text style={{fontWeight: '700', fontSize: 13}}>+91 8373958820</Text>
                    <Text style={{fontWeight: '700', fontSize: 14}}>23-A, Tower F, Toluene Housing Society, Noida</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}