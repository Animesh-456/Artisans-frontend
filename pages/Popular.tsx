import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import api from "../src/api/services/api";
import common from "../src/helpers/common";

const Popular = () => {


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 7,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };





    return (
        <div className="container slider-category">
            <Carousel responsive={responsive} itemAriaLabel="hhh">



                <div className="item" key={1}>


                    <li>
                        <a href={`/artworklisting?category=Painting`}>
                            <img src="img/icon.png" alt="" />
                            <p>Painting</p>
                        </a>
                    </li>



                </div>



                <div className="item" key={2}>




                    <li>
                        <a href={`/artworklisting?category=Sculpture`}>
                            <img src="img/icon.png" alt="" />
                            <p>Sculpture</p>
                        </a>
                    </li>



                </div>

                <div className="item" key={3}>



                    <li>
                        <a href={`/artworklisting?category=Drawing`}>
                            <img src="img/icon.png" alt="" />
                            <p>Drawing</p>
                        </a>
                    </li>



                </div>
                <div className="item" key={4}>



                    <li>
                        <a href={`/artworklisting?category=Photography`}>
                            <img src="img/icon.png" alt="" />
                            <p>Photography</p>

                        </a>
                    </li>



                </div>
                <div className="item" key={5}>



                    <li>
                        <a href={`/artworklisting?category=Printmaking`}>
                            <img src="img/icon.png" alt="" />
                            <p>Printmaking</p>
                        </a>
                    </li>



                </div>
                <div className="item" key={6}>



                    <li>
                        <a href={`/artworklisting?category=Mixed+Media`}>
                            <img src="img/icon.png" alt="" />
                            <p>Mixed Media</p>
                        </a>
                    </li>



                </div>
                <div className="item" key={7}>



                    <li>
                        <a href={`/artworklisting?category=Textile+Art`}>
                            <img src="img/icon.png" alt="" />
                            <p>Textile Art</p>
                        </a>
                    </li>


                </div>




            </Carousel>

        </div>




    );
}

Popular.ignorePath = true;
export default Popular;
