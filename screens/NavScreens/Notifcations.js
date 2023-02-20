import { Text, Card } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Notifications(){

    const [notifs, setnotifs] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem("token", async(err, result)=>{
            const response = await fetch('http://20.193.147.19:80/api/users/userDetails', {
                method: 'get',
                headers: {
                    token: result
                }
            })
            const data = await response.json()
            console.log("DATAAA", data);
            setnotifs(data['notifications'])
        })
    })

    return(

        notifs.length != 0 ? notifs.map((notif=>{
            return <Card>
                <Text style={{fontWeight: '700', fontSize: 14}}>{notif['msg']}</Text>
                <Text style={{fontWeight: '700', fontSize: 12, textAlign: 'right'}}>Time: {notif['time']}</Text>
            </Card>
        })):
        <Text style={{fontWeight: '700', color: '#a4a4a4', fontSize: 20, marginTop: 35, alignSelf: 'center'}}>No Notifications Yet :(</Text>
    )
}