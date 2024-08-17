import {useEffect, useState} from "react";
import axios from "axios";
import {Collapse} from "antd";

function parsedItems(originList) {
    console.log(originList)
    return originList.map((item,index)=>{
        return {
            key : item.id,
            label : item.content,
            children: item.helpText,
            showArrow : false,
        };
    })

}

const ProverbPage = () => {
    const [proverbList, setProverbList] = useState([]);

    useEffect(()=> {
        // const serverURL = import.meta.env.BASE_URL
        const serverURL = "https://judy-carter-hyden-silvia-snorlax.site"
        axios.get(`${serverURL}/api/proverb/list`)
            .then(response => {
                if (!response.data) {
                    throw new Error("Proverb list not found");
                }
                const proverbs = response.data;

                setProverbList(parsedItems(proverbs));
                // console.log(proverbs);
            })
            .catch( error => {
                console.error('Error fetching content:', error);
            })
    },[])
    return (
        <div>
            <Collapse accordion items={proverbList} key="proverb"/>
        </div>
    )
}
export default ProverbPage;