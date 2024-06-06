// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-bootstrap/Carousel';

const CustomerSays = () => {

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

    return (
        <div className="">



            <Carousel>
                <Carousel.Item interval={5000}>
                    <div className="item">
                        <div className="customer_slider">
                            <p>Really easy to order on website. Both prints I ordered look lovely & compliment<br /> the recently newly decorated bedroom. This is the second order & both<br /> times prints have been lovely</p>
                            <div className="short_name">
                                <div className="short_pic">
                                    <img src="img/man.jpg" alt="" />
                                </div>
                                <div className="short_text">
                                    <h5>Juliette Simpkins</h5>
                                    <p>Owner, Black Ring Coffee. USA </p>
                                </div>
                            </div>
                            <a className="view_all viewall_center" href="#">Join Now <img className="testimonial_arrow" src="img/arrow.png" alt="" /></a>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <div className="item">
                        <div className="customer_slider">
                            <p>Really easy to order on website. Both prints I ordered look lovely & compliment<br /> the recently newly decorated bedroom. This is the second order & both<br /> times prints have been lovely</p>
                            <div className="short_name">
                                <div className="short_pic">
                                    <img src="img/man.jpg" alt="" />
                                </div>
                                <div className="short_text">
                                    <h5>Juliette Simpkins</h5>
                                    <p>Owner, Black Ring Coffee. USA </p>
                                </div>
                            </div>
                            <a className="view_all viewall_center" href="#">Join Now <img className="testimonial_arrow" src="img/arrow.png" alt="" /></a>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>




        </div>

    )
}


CustomerSays.ignorePath = true;
export default CustomerSays;