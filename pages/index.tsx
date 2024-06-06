import { useEffect, useState } from "react";
import { CSSProperties } from 'react';
import test from "../src/validation/schema/test";
import { perfTest, Pick, Validate } from "../src/validation/utils/test";
import _ from "lodash";
import Joi from "joi";
import Carousel from 'react-bootstrap/Carousel';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import api from "../src/api/services/api";
import HomeHeader from "../src/views/index/HomeHeader";
import LastJobPictures from "../src/views/index/LastJobPictures";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import { ProjectDetails } from "../src/@types/type";
import moment from "moment";
import common from "../src/helpers/common";
import router from "next/router";
import axios from "axios"
import { writeAtom } from "jotai-nexus";
import { Document, Page, pdfjs } from 'react-pdf';
import { useAtom } from "jotai";
import env from "../src/config/api";
import Head from "next/head";
import $ from 'jquery'; // Import jQuery

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;





import Crou from "./Crou";
import CustomerSays from "./CustomerSays"
import Recentart from "./Recentart";


// export const getStaticProps = async () => {
//     try {
//         const response = await fetch(`${env.base_url}project/page-details`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch');
//         }
//         const data = await response.json();

//         return {
//             props: {
//                 prp: data // Assuming the fetched data structure matches what's expected
//             }
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: {
//                 prp: null // Or any default value indicating an error occurred
//             }
//         };
//     }
// };



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



function Home(prp) {


    return (
        <>

            {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <Carousel>
                    <Carousel.Item interval={5000}>
                        <div className="carousel-item active">
                            <h1><b>Free shipping on all order</b> <a href="#">out now</a></h1>
                            <img src="img/SLIDER-_1.jpg" alt="" />
                            <div className="capt_ion">
                                <h2>600+ artworks</h2>
                                <p>Transform Your Space with Stunning Wall Art</p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div className="carousel-item active">
                            <h1><b>Free shipping on all order</b> <a href="#">out now</a></h1>
                            <img src="img/SLIDER-_2.jpg" alt="" />
                            <div className="capt_ion">
                                <h2>600+ artworks</h2>
                                <p>Transform Your Space with Stunning Wall Art</p>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div> */}


            <section className="banner_wp" style={{ backgroundImage: `url(./img/header-banner-bg.jpg)` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="banner_pic">
                                <img className="carve" src={"img/carve.png"} alt="carve-img" />
                                <img src={"img/banner-img.png"} alt="banner-img" />
                                <div className="createdby">
                                    <a href="#"><img src={"img/man.jpg"} alt="man-img" /> Created by Raveart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="banner_text">
                                <h1>Inspiring</h1>
                                <h2>Original Art Work</h2>
                                <div className="search">
                                    <span className="fa fa-search"></span>
                                    <input placeholder="Search for any service..." />
                                </div>
                                <div className="popular_wp">
                                    Popular:
                                    <span>Painting</span>
                                    <span>Music</span>
                                    <span>Animation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="container">
                <div className="yh4d yh1d"><h1>latest art</h1></div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div> */}



            <section className="popular_category">
                <div className="container">
                    <div className="heading_title">
                        <h1>Popular Category</h1>
                    </div>
                    <a className="view_all" href="#">View all categories <img src={"img/arrow.png"} width="11px" alt="" /></a>
                    <ul className="popular_category_listing">
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            {/* <div className="container-fluid qwe2">
                <div className="yh4d howw"><h1>how we works</h1></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>send your ideas</h5>
                                <img src="img/work-icon.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>choose product</h5>
                                <img src="img/work-icon1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>Pay after delivery<br /> only if satisfied</h5>
                                <img src="img/work-icon2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            <section className="discover_wp" style={{ backgroundImage: `url(./img/bg1.jpg)` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 discover_left">
                            <div className="heading_title">
                                <h1>Discover Your Ideal <br /> Artwork</h1>
                            </div>
                            <p>
                                Egestas maecenas pharetra convallis posuere morbi. Nunc pulvinar sapien et ligula ullamcorper. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Lorem sed risus ultricies tristique. Nulla at volutpat diam ut venenatis tellus.Pellentesque adipiscing commodo elit at imperdiet dui. Sed euismod nisi porta lorem mollis aliquam.<br /><br />
                                Augue eget arcu dictum varius. Lorem sed risus ultricies tristique. Nulla at volutpat diam ut venenatis tellus.Pellentesque adipiscing commodo elit at imperdiet dui. Sed euismod nisi porta lorem mollis aliquam.
                            </p>
                            <a href="#">Know More</a>
                        </div>
                        <div className="col-sm-7">
                            <div className="discover_img">
                                <img className="carve_pic" src="img/pic1.png" alt="" />
                                <img className="pic1" src="img/pic.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="container-fluid recent-art">
                <div className="yh4d yh1d"><h1>recent art from our artists</h1></div>
                <Recentart />
            </div> */}



            <section className="latest_request" style={{ backgroundImage: `url(./img/bg2.jpg)` }}>
                <div className="container">
                    <div className="heading_title latest_request_heading">
                        <h1>Latest Requests</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="latest_request_pic">
                                <img src="img/pic2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="latest_request_text">
                                <h1>Create Eye-Catching Packaging for YoBe&apos;s Protein Yogurt to <br />Shine at Whole Foods</h1>
                                <p>We are a traditional supper club located On Main St in Wisconsin. We will feature steaks, chops, ribs, relish trays, fish fries, etc. </p>
                                <div>
                                    <span>by mikeschmidt41D <i className="fa fa-check-circle"></i></span>
                                    <span><i className="fa fa-clock-o"></i> 0 d 23 h ago</span>
                                </div>
                                <a href="#">View Details</a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="latest_request_pic">
                                <img src="img/pic2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="latest_request_text">
                                <h1>Create Eye-Catching Packaging for YoBe&apos;s Protein Yogurt to <br />Shine at Whole Foods</h1>
                                <p>We are a traditional supper club located On Main St in Wisconsin. We will feature steaks, chops, ribs, relish trays, fish fries, etc. </p>
                                <div>
                                    <span>by mikeschmidt41D <i className="fa fa-check-circle"></i></span>
                                    <span><i className="fa fa-clock-o"></i> 0 d 23 h ago</span>
                                </div>
                                <a href="#">View Details</a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="latest_request_pic">
                                <img src="img/pic2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="latest_request_text">
                                <h1>Create Eye-Catching Packaging for YoBe&apos;s Protein Yogurt to <br />Shine at Whole Foods</h1>
                                <p>We are a traditional supper club located On Main St in Wisconsin. We will feature steaks, chops, ribs, relish trays, fish fries, etc. </p>
                                <div>
                                    <span>by mikeschmidt41D <i className="fa fa-check-circle"></i></span>
                                    <span><i className="fa fa-clock-o"></i> 0 d 23 h ago</span>
                                </div>
                                <a href="#">View Details</a>
                            </div>
                        </div>
                    </div>
                    <a className="view_all viewall_center" href="#">View all <img src="img/arrow.png" width="11px" alt="" /></a>
                </div>
            </section>

            {/* <div className="container-fluid recent-art">
                <div className="yh4d yh1d"><h1>artist & artisans</h1></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic1.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic2.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic3.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                    </div>
                    <div className="view_all">
                        <a href="#">view all</a>
                    </div>
                </div>
            </div> */}


            <section className="top_artist" style={{ backgroundImage: `url(./img/bg3.jpg)` }}>
                <div className="container">
                    <div className="heading_title top_artist_heading">
                        <h1>Top Artist & Their Work</h1>
                    </div>

                    <div className="owl-carousel top_artist_slide owl-theme">
                        <Crou />
                    </div>
                </div>
            </section>



            <section className="customer_wp" style={{ backgroundImage: `url(./img/bg4.jpg)` }}>
                <div className="container">
                    <div className="heading_title testimonial_heading">
                        <h1>What Our Customers Are Saying</h1>
                    </div>
                    <div className="owl-carousel owl-carousel1 owl-theme">
                        <CustomerSays />
                    </div>
                    <div className="testimonial_animation">
                        <img src="img/icon1.png" alt="" />
                    </div>
                </div>
            </section>
        </>
    );
}


Home.ignorePath = true;
export default Home;
