import React, { useEffect, useState } from "react";

import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";

type Props = {};

let Reviews_data = []

const Reviews = (props: Props) => {

    const [Reviews_data, SetReviews_data] = useState([]);

    // const UserData = JSON.parse(localStorage.getItem('UserData'));



    // api.project.reviews_list({ params: {} }, (d) => {

    //     Reviews_data = d.data;

    // });
    useEffect(() => {

        const UserData = JSON.parse(localStorage.getItem('UserData'));

        // api.project.reviews_list({ params: {} }, (d) => {
        //     console.log("---->", d)
        //     // Reviews_data = d.data;

        // });
        // const d = fetch(`http://localhost:4000/project/customer_review`);
        console.log("udata--", UserData)
        api.project.Customer_Review({ params: { machinist_id: UserData.id } }, (d) => {
            console.log(d)
            SetReviews_data(JSON.parse(localStorage.getItem('Customer_Review_List')));

            //setLoaded(true);
        });


        //console.log("yoo")
        //SetReviews_data(JSON.parse(localStorage.getItem('Customer_Review_List')));
    }, []);


    // setTimeout(() => {
    //     let Tbody = document.getElementById('Tbody')
    //     let ReviewsList = JSON.parse(localStorage.getItem('Reviews_List'));


    //     ReviewsList.map((item) => (
    //         Tbody.innerHTML = Tbody.innerHTML + `<tr> <td>${item.project.project_name}</td> <td>${item.provider.user_name}</td>  <td>${item.rating}</td> </tr>`
    //     ))


    // }, 1000)
    console.log("reviews data", Reviews_data)



    return (
        // <div>
        //     <div
        //         className='banner_wp sign_banner'
        //         style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
        //         <div className='container'>
        //             <div className='row'>
        //                 <div className='banner_text inner_banner_text'>
        //                     <h1 className='yh'>Review artist</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='container cjw'>
        //         <div className='row'>
        //             <div className="col-sm-4">
        //                 <AccountSideBar />
        //             </div>

        //             <div className='col-sm-8'>
        //                 <div className='profile_box'>
        //                     <h3>Reviews</h3>
        //                     <div className='fund_wp'>
        //                         <div className='table-responsive'>
        //                             <table className='table table-bordered table-sm'>
        //                                 <thead>
        //                                     <tr className='table-primary'>
        //                                         <td>Name of the project</td>
        //                                         <td>artist Name</td>
        //                                         <td>Ratings</td>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody id="Tbody">

        //                                     {

        //                                         Reviews_data.map((item) => {

        //                                             return (
        //                                                 <>
        //                                                     <tr>
        //                                                         <td>{item.project.project_name}</td>
        //                                                         <td>{item.provider.user_name}</td>
        //                                                         <td>{item.rating}</td>
        //                                                     </tr>
        //                                                 </>
        //                                             )
        //                                         })}


        //                                 </tbody>
        //                             </table>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <>



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
                                        <table className="table">
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
                                                                    <td>{item?.Comments}</td>
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
