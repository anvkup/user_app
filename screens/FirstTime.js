import { View } from "react-native"
import { Input, Text } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"

export default (props) => {
    return (
        <SafeAreaView>
            <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: '700', paddingVertical: 15}}>Enter your Details</Text>
            <Text>First Name</Text>
            <Input placeholder="First Name" />
            <Text>Last Name</Text>
            <Input placeholder="Last Name" />
            <Text>Phone Number</Text>
            <Input value="9" />
            <Text>Email Address</Text>
            <Input placeholder="Your Email ID (Optional)" />
            <Text>Default Address</Text>
            <Input placeholder="Address" />
        </SafeAreaView>
    )
}