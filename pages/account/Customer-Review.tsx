import React, { useEffect, useState } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";

import env from "../../src/config/api";
import Head from "next/head";
type Props = {};

//let Reviews_data = []



export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 38,
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
const Reviews = (prp) => {

    const [Reviews_data, SetReviews_data] = useState([]);


    useEffect(() => {

        const UserData = JSON.parse(localStorage.getItem('UserData'));

        // api.project.reviews_list({ params: {} }, (d) => {
        //     console.log("---->", d)
        //     // Reviews_data = d.data;

        // });
        // // const d = fetch(`http://localhost:4000/project/customer_review`);
        // console.log("udata--", UserData)
        api.project.Customer_Review({ params: { machinist_id: UserData.id } }, (d) => {
            console.log("review d data ", d)
            SetReviews_data(JSON.parse(localStorage.getItem('Customer_Review_List')));

            //setLoaded(true);
        });


        //console.log("yoo")
        //SetReviews_data(JSON.parse(localStorage.getItem('Customer_Review_List')));
    }, []);
    // const UserData = JSON.parse(localStorage.getItem('UserData'));
    // console.log("data--", UserData)


    console.log("reviews data", Reviews_data)


    // setTimeout(() => {
    //     let Tbody = document.getElementById('Tbody')
    //     let ReviewsList = JSON.parse(localStorage.getItem('Reviews_List'));
    //     console.log("Reviews list--", ReviewsList)

    //     // ReviewsList.map((item) => (
    //     //     Tbody.innerHTML = Tbody.innerHTML + `<tr> <td>${item.project.project_name}</td> <td>${item.provider.user_name}</td>  <td>${item.rating}</td> </tr>`
    //     // ))

    //     console.log(Reviews_data)
    // }, 1000)



    return (
        <>
            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>
            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>Evaluations</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="prof111">
                                    <h4>Reviews</h4>
                                </div>
                                <div className="fund_wp">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-sm">
                                            <thead>
                                                <tr className="table-primary">
                                                    <th>Name of the project</th>
                                                    <th>Artist Name</th>
                                                    <th>Ratings</th>
                                                    <th>Comments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    Reviews_data.map((item) => {

                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{item?.project?.project_name}</td>
                                                                    <td>{item?.provider?.user_name}</td>
                                                                    <td>{item?.rating}</td>
                                                                    <td>{item?.comments}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reviews;
