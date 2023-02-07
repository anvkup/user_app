import { Card, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function FAQ() {

    const [faqs, setfaqs] = useState('')
    const [faqsLoaded, setfaqsLoaded] = useState(false)

    useEffect(()=>{
        async function a(){
            const response = await fetch(`http://20.193.147.19:80/api/users/faq`)
            console.log(response);
            console.log('converting to json');
            const data = await response.json()
            console.log("FAQ DATA=", data);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    
            setfaqs(data)
            setfaqsLoaded(true)
        }
        a()
    }, [])

    return(
        <ScrollView>
            {
                faqsLoaded ? faqs.map((i)=>{
                    return <Card key={Math.random()*1000} style={{marginVertical: 1}}>
                        <Text style={{fontWeight: '700', marginBottom: 8}}>Q: {i['q']}</Text>
                        <Text style={{fontWeight: '600', fontSize: 14}}><Text style={{fontWeight: '700'}}>A: </Text> {i['a']}</Text>
                    </Card>
                }):''
            }
        </ScrollView>
    )
}