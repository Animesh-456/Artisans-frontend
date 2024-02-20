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



function Home(prp) {


    return (
        <>

            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                </ul>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <h1><b>Free shipping on all order</b> <a href="#">out now</a></h1>
                        <img src="img/SLIDER-_1.jpg" alt="" />
                        <div className="capt_ion">
                            <h2>600+ artworks</h2>
                            <p>Transform Your Space with Stunning Wall Art</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <h1><b>gold metal frame</b> <a href="#">out now</a></h1>
                        <img src="img/SLIDER-_2.jpg" alt="" />
                        <div className="capt_ion">
                            <h2>600+ artworks</h2>
                            <p>Transform Your Space with Stunning Wall Art</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
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
            </div>

            <div className="container-fluid qwe2">
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
            </div>

            <div className="container-fluid recent-art">
                <div className="yh4d yh1d"><h1>recent art from our artists</h1></div>
                {/* <div id="owl-demo1" className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="img/pic4.jpg" alt="" />
                    </div>
                    <div className="item">
                        <img src="img/pic5.jpg" alt="" />
                    </div>
                    <div className="item">
                        <img src="img/pic6.jpg" alt="" />
                    </div>
                    <div className="item">
                        <img src="img/pic4.jpg" alt="" />
                    </div>
                    <div className="item">
                        <img src="img/pic5.jpg" alt="" />
                    </div>
                    <div className="item">
                        <img src="img/pic6.jpg" alt="" />
                    </div>
                </div> */}




                <Carousel>
                    <Carousel.Item>

                        <img src="img/pic4.jpg" alt="" />
                        <img src="img/pic5.jpg" alt="" />
                        <img src="img/pic6.jpg" alt="" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="img/pic4.jpg" alt="" />
                        <img src="img/pic5.jpg" alt="" />
                        <img src="img/pic6.jpg" alt="" />

                    </Carousel.Item>

                </Carousel>
            </div>

            <div className="container-fluid recent-art">
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
            </div>

            <div className="container-fluid">
                <div className="yh4d yh1d"><h1>Client Story</h1></div>
                <div className="container">
                    <div id="owl-demo2" className="owl-carousel owl-theme">
                        <div className="item">
                            <img src="img/pic4.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic5.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic6.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic4.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic5.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic6.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic5.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="img/pic6.jpg" alt="" />
                            <div className="we1">
                                <p>Sandeep</p>
                                <div>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <Carousel>
                        <Carousel.Item>

                            <img src="img/pic4.jpg" alt="" />
                            <img src="img/pic5.jpg" alt="" />
                            <img src="img/pic6.jpg" alt="" />

                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="img/pic4.jpg" alt="" />
                            <img src="img/pic5.jpg" alt="" />
                            <img src="img/pic6.jpg" alt="" />

                        </Carousel.Item>

                    </Carousel> */}
                </div>
            </div>
            <br />
            <div className="container recent-art">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="primi1">
                            <img src="img/medal.png" />
                            <h4>Premium Materials</h4>
                            <p>Art crafted from the finest Materials & Ink.</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="primi1">
                            <img src="img/fast-delivery.png" />
                            <h4>Fast Shipping</h4>
                            <p>All Art is dispatched in 3-4 Working Days.</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="primi1">
                            <img src="img/shopping-bag.png" />
                            <h4>Secure Checkout</h4>
                            <p>Shop with ease.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


Home.ignorePath = true;
export default Home;
