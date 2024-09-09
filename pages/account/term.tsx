import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Client from "../../src/api/Client";
import env from "../../src/config/api";
import DOMPurify from 'dompurify';

const success = () => {

    const [htmlData, setHtmlData] = useState(null);
    const [title, setTitle] = useState(null);

    const params: any = {
        id: 19,
        status: 'active',
    };

    const queryString = new URLSearchParams(params).toString();

    const renderWebpage = () => {
        axios
            .get(`${env.base_url}project/page-content-details?${queryString}`)
            .then((response: any) => {
                setTitle(response?.data?.data[0]?.page_title)
                const sanitizedHtml = DOMPurify.sanitize(String(response.data?.data[0]?.content));
                setHtmlData(sanitizedHtml);

            })
            .catch((error) => console.error('Error fetching page content:', error));
    };

    useEffect(() => {
        renderWebpage();
    }, []);


    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>{title}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: htmlData }} />

        </>
    )
}

export default success