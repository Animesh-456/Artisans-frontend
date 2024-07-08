// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import api from "../src/api/services/api";
const CustomerSays = () => {

    const allreviews = useAtomValue(atom.project.api.allreviews);
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);

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


    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);

    return (
        <div className="">



            <Carousel>


                <div className="row">
                    <>
                        {allreviews?.length ? allreviews?.map((l) => {

                            return (
                                <>
                                    <Carousel.Item interval={5000}>
                                        <div className="item">
                                            <div className="customer_slider">
                                                <p>{l?.comments}</p>
                                                <div className="short_name">
                                                    <div className="short_pic">
                                                        <img src="../img/man.jpg" alt="" />
                                                    </div>
                                                    <div className="short_text">
                                                        <h5>{l?.buyer?.user_name}</h5>
                                                        {/* <p>Owner, Black Ring Coffee. USA </p> */}
                                                    </div>
                                                </div>
                                                <a className="view_all viewall_center" href="#">Join Now <img className="testimonial_arrow" src="../img/arrow.png" alt="" /></a>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </>
                            )

                        }).slice(0, 3) : (<></>)}


                    </>

                </div>



            </Carousel>




        </div>

    )
}


CustomerSays.ignorePath = true;
export default CustomerSays;