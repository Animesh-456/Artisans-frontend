import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Client from "../../src/api/Client";
import env from "../../src/config/api";
import DOMPurify from 'dompurify';

const api = new Client();

export const getStaticProps = async () => {
    try {

        const params: any = {
            id: 7,
            status: 'active',
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return {
            props: {
                prp: data,
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null,
            }
        };
    }
};

const HowItWorks = ({ prp }) => {
    const [htmlData, setHtmlData] = useState(null);
    const [title, setTitle] = useState(null);

    const params: any = {
        id: 23,
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

    const [customer, setCustomer] = useState(true);
    const [mac, setMac] = useState(false);

    const selectCust = () => {
        setCustomer(true);
        setMac(false);
    };

    const selectMac = () => {
        setMac(true);
        setCustomer(false);
    };


    return (
        <>
            {prp && (
                <>
                    <Head>
                        <title>{`${prp.data[0].page_title}`}</title>
                        <meta name="description" content={`${prp.data[0].page_desc}`} />
                    </Head>
                </>
            )}

            {/* <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </section> */}


            <section className="breadcrumb_sec">
                <div className="container">
                    <div className="row">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">{title}</li>

                        </ul>
                    </div>
                </div>
            </section>
            {/* <h1>{title}</h1> */}
            <div dangerouslySetInnerHTML={{ __html: htmlData }} />


        </>
    );
};

HowItWorks.ignorePath = true;

export default HowItWorks;
