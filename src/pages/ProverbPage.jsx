import styles from "../styles/ProverbPage.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Collapse, message, Pagination} from "antd";

function parseItems(originList) {
    return originList.map((item,index)=>{
        return {
            key : item.id.toString(),
            label : item.content,
            children: item.helpText,
            showArrow : false,
        };
    })
}

const ProverbPage = () => {
    const [proverbList, setProverbList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(()=> {
        // const serverURL = import.meta.env.BASE_URL
        const serverURL = "https://judy-carter-hyden-silvia-snorlax.site"
        const fetchProverbs = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/proverb/list`);

                if (!response.data) {
                    throw new Error("Proverb list not found");
                }

                const proverbs = parseItems(response.data);
                setProverbList(proverbs);
            } catch (error) {
                setProverbList([]);
                message.error('Failed to load proverbs.');
            }
        };
        fetchProverbs();
    },[])

    const startIndex = (pageNo - 1) * pageSize;
    const currentItems = proverbList.slice(startIndex, startIndex + pageSize);


    const onPageChange = (page,pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                header
            </div>
            <div className={styles.contents}>
                <Collapse className={styles.items} accordion items={currentItems}/>
            </div>
            <div className={styles.footer}>
                <Pagination
                    total = {proverbList.length}
                    defaultPageSize={pageSize}
                    defaultCurrent={1}
                    onChange = {onPageChange}
                >
                </Pagination>
            </div>
        </div>
    )
}
export default ProverbPage;