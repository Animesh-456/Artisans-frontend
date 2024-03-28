import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Recentart = () => {

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
        <div className="container">


            <Carousel responsive={responsive}>
                <div>

                    <img src="img/pic4.jpg" alt="" />

                </div>
                <div>
                    <img src="img/pic5.jpg" alt="" />

                </div>
                <div>
                    <img src="img/pic6.jpg" alt="" />

                </div>

                <div>
                    <img src="img/pic6.jpg" alt="" />

                </div>
            </Carousel>

        </div>

    )
}


Recentart.ignorePath = true;
export default Recentart;