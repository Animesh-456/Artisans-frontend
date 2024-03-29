import React, { useEffect, useState } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";

type Props = {};

//let Reviews_data = []

const Reviews = (props: Props) => {

    const [Reviews_data, SetReviews_data] = useState([]);


    useEffect(() => {

        const UserData = JSON.parse(localStorage.getItem('UserData'));

        api.project.reviews_list({ params: {} }, (d) => {
            //  Reviews_data = d.data;
        });
        // const d = fetch(`http://localhost:4000/project/customer_review`);
       
        api.project.Customer_Review({ params: { machinist_id: UserData.id } }, (d) => {
            
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
        <div>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(./img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Customer Review</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container cjw'>
                <div className='row'>
                    <div className="col-sm-4">
                        <AccountSideBar />
                    </div>

                    <div className='col-sm-8'>
                        <div className='profile_box'>
                            <h3>Reviews</h3>
                            <div className='fund_wp'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-sm'>
                                        <thead>
                                            <tr className='table-primary'>
                                                <td>Name of the project</td>
                                                <td>Machanist Name</td>
                                                <td>Ratings</td>
                                            </tr>
                                        </thead>
                                        <tbody id="Tbody">

                                            {Reviews_data &&

                                                Reviews_data.map((item) => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{item.project.project_name}</td>
                                                                <td>{item.provider.user_name}</td>
                                                                <td>{item.rating}</td>
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
        </div>
    );
};

export default Reviews;
