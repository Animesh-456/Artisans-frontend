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

const api = new Client();

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();

        const params: any = {
            id: 23,  // Extracted ID from the first API response
            status: 'active', // Any other parameters you want to pass
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();


        // Second API call
        const response2 = await fetch(`${env.base_url}project/page-content-details?${queryString}`);
        if (!response2.ok) {
            throw new Error('Failed to fetch data from the second API');
        }
        const data2 = await response2.json();

        return {
            props: {
                prp: data,
                prp2: data2 // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null,
                prp2: null// Or any default value indicating an error occurred
            }
        };
    }
};


const how_it_works = (prp) => {


    const [customer, setcustomer] = useState(true);
    const [mac, setmac] = useState(false);

    console.log("the users from static props  are : -", prp?.prp)

    const mt = {
        title: 'Animesh Titile',
        description: 'Animesh Page Description',
    }

    const selectcust = () => {
        if (customer == false) {
            setcustomer(true)
        }
        setmac(false)
    }

    const select_mac = () => {
        if (mac == false) {
            setmac(true)
        }
        setcustomer(false)
    }

    console.log("prp2 is", prp?.prp2)

    return (
        <>

            <Head>
                <title>{`${prp?.prp?.data[4].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[4].page_desc}`} />

            </Head>

            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>How it works</h1>
                </div>
            </section>

            <section className="howit_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="../img/phn-img.png" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <div className="heading_title">
                                <h1>How It Works at <br /> Aart Studio</h1>
                            </div>
                            <p>ARTSTUDIO is an online platform where a community of talented artists and artisans are ready to create custom art pieces for anyone. Whether you're looking for a painting, sculpture, or any other form of artwork, AARTSTUDIO makes the process straightforward and enjoyable. Here's how it works.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="howit_wp1">
                <div className="container">
                    <div className="heading_title latest_request_heading1">
                        <h1>Breaking Down Our Process of Work </h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="../img/icon-1.png" alt="" />
                            <h5>1. Post Your Requirement</h5>
                            <p>Start by posting your custom art requirements on AARTSTUDIO. Provide details about your vision, preferences, and any specific elements you want in your artwork.</p>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-2.png" alt="" />
                            <h5>2. Receive Proposals</h5>
                            <p>Once your requirement is posted, artisans and artists will review it and submit their proposals. These proposals will include their approach, pricing, and estimated completion time.</p>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-3.png" alt="" />
                            <h5>3. Select a Proposal</h5>
                            <p>Review the received proposals, check the artists' profiles, and view their previous works. Choose the artist whose proposal and style best match your vision.</p>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-4.png" alt="" />
                            <h5>4. Upload Payment</h5>
                            <p>After selecting an artist, upload the agreed payment to AARTSTUDIO. This ensures a secure transaction for both parties.</p>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-5.png" alt="" />
                            <h5>5. Art Creation</h5>
                            <p>The chosen artist begins creating your custom artwork. Throughout this process, you can communicate with the artist to ensure the work aligns with your expectations.</p>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-6.png" alt="" />
                            <h5>6. Review Completed Artwork</h5>
                            <p>Once the artist completes the artwork, they will upload images ofthe finished piece for your review. If you are satisfied with the result, the artist will proceed to courier the artwork to you.</p>
                        </div>
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/icon-7.png" alt="" />
                            <h5>7. Receive and Complete the Job</h5>
                            <p>Upon receiving your custom artwork, inspect it to ensure it meets your expectations. Once you confirm your satisfaction, complete the job on AARTSTUDIO, and the platform will release the payment to the artist.</p>
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                </div>
            </section>

            <section className="howit_wp2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="heading_title">
                                <h1>Commission Custom Art <br /> Effortlessly with AARTSTUDIO</h1>
                            </div>
                            <p>AARTSTUDIO simplifies the process of commissioning custom art, providing a secure and efficient platform for both customers and artists. Begin your journey to owning a unique, personalized piece of art today with AARTSTUDIO.</p>
                            <a href="/auth/sign-in">Sign Up Now</a>
                        </div>
                        <div className="col-sm-4">
                            <img src="../img/customart-img.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
how_it_works.ignorePath = true

export default how_it_works