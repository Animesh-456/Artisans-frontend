import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Crou = () => {

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
                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic5.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>
                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic6.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>
                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic7.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>


                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic8.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic6.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="img/pic7.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>
            </Carousel>

        </div>

    )
}


Crou.ignorePath = true;
export default Crou;