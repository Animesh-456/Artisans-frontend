import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import atom from "../../src/jotai/atom";
import { writeAtom } from "jotai-nexus";
import Link from "next/link";
import Layout from "../../src/views/Layouts/Main";
import Head from "next/head";
import Client from "../../src/api/Client";
import env from "../../src/config/api";

let metadata = {
    title: "abcd",
    description: "how its works"
}


export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();

        return {
            props: {
                prp: data // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null // Or any default value indicating an error occurred
            }
        };
    }
};

const about = (prp) => {
    console.log("the users from static props  are : -", prp?.prp)


    return (
        <>
            <Head>
                <title>{`${prp?.prp?.data[6].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[6].page_desc}`} />


            </Head>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Who are we?</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cjw">
                <div className="col-sm-12 howit5">
                    <p>artist was launched in 2013 to provide affordable custom machined parts. After years of experience in the CNC artist industry, we found large variations in the prices proposed for the same part. Faced with overinflated, unaffordable prices, many customers ended up abandoning their orders, leaving machinists high and dry.</p>
                    <p>Our solution was to create a marketplace where buyers and machinists could easily connect, with no risk to either party.</p>
                    <h3>Connecting Buyers and Machinists</h3>
                    <p>Costs of CNC parts depend on the type of artist operations that need to be performed, such as CNC milling, turning, cutting and drilling. Costs also vary depending on the equipment available in the workshop, the expertise of the machinist and materials in or out of stock.</p>
                    <h3>Helping You Find the Best Price</h3>
                    <p>As a result, costs can vary significantly from one workshop to another. By communicating your CNC artist requests to all our members at once, artist enables machinists to identify the jobs that best suit them and enables buyers to access machine shops that will best meet their specific needs.</p>
                    <p>By providing a specialized marketplace for buyers and machinists, artist makes accessing custom machined parts easy, and allows machine shops to reach their full potential.</p>
                    <div className="whowe1">
                        <p><i className="fa fa-envelope"></i> info@artisan.in  </p>
                        <p>artist</p>
                        <p><i className="fa fa-map-marker"></i>

                            57 Rathbone Place, London W1T 1JT
                        </p>
                        <p><i className="fa fa-phone"></i> Tel :  020 3290 1191 </p>


                    </div>
                </div>
            </div>





        </>
    )
}
about.ignorePath = true
export default about