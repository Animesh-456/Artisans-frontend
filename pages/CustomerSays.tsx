import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import api from "../src/api/services/api";
import common from "../src/helpers/common";

const CustomerSays = () => {
    const allreviews = useAtomValue(atom.project.api.allreviews);
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);

    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);

    return (

        <Carousel>
            {/* {allreviews?.length ? allreviews.slice(0, 3).map((review, index) => (
                <Carousel.Item key={index} interval={5000}>
                    <div className="item">
                        <div className="customer_slider">
                            <p>{review?.comments}</p>

                            <div className="short_name">
                                <div className="short_pic">
                                    <img src={
                                       
                                        "../img/man.jpg"
                                    } alt="profile-picture" />
                                </div>
                                <div className="short_text">
                                   
                                    <h5>kazi1111</h5>
                                </div>
                            </div>

                            <br /><br /><br />

                        </div>
                    </div>
                </Carousel.Item>

            )).slice(0, 3) : "No reviews found"} */}

            <Carousel.Item key={1} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item key={2} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item key={3} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item key={4} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item key={5} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item key={6} interval={5000}>
                <div className="item">
                    <div className="customer_slider">
                        <p>hghfg fhgfhfgh</p>

                        <div className="short_name">
                            <div className="short_pic">
                                <img src={
                                    // common.get_profile_picture(review?.buyer?.logo) ||
                                    "../img/man.jpg"
                                } alt="profile-picture" />
                            </div>
                            <div className="short_text">
                                {/* <h5>{review?.buyer?.user_name}</h5> */}
                                <h5>kazi1111</h5>
                            </div>
                        </div>

                        <br /><br /><br />

                    </div>
                </div>
            </Carousel.Item>

        </Carousel>






    );
}

CustomerSays.ignorePath = true;
export default CustomerSays;
