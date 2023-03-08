import { Card, Text, Toggle } from "@ui-kitten/components";

export default function Settings(){
    return(
        <Card style={{display: 'flex', position: 'relative', width: '100%', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '700', fontSize: 18, position: 'absolute'}}>Order Notifications</Text>
            <Toggle style={{position: 'absolute'}}></Toggle>
        </Card>
    )
}