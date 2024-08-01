import "react-multi-carousel/lib/styles.css";
// import Carousel from 'react-bootstrap/Carousel';
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import api from "../src/api/services/api";
import common from "../src/helpers/common";

const CustomerSays = () => {
    const allreviews = useAtomValue(atom.project.api.allreviews);
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);

    return (

        // <Carousel>
        //     {allreviews?.length ? allreviews.slice(0, 3).map((review, index) => (
        //         <Carousel.Item key={index} interval={5000}>
        //             <div className="item">
        //                 <div className="customer_slider">
        //                     <p>{review?.comments}</p>

        //                     <div className="short_name">
        //                         <div className="short_pic">
        //                             <img src={
        //                                 common.get_profile_picture(review?.buyer?.logo) ||
        //                                 "../img/no-images.png"
        //                             } alt="profile-picture" />
        //                         </div>
        //                         <div className="short_text">


        //                             <h5>{review?.buyer?.user_name}</h5>

        //                         </div>
        //                     </div>

        //                     <br /><br /><br />

        //                 </div>
        //             </div>
        //         </Carousel.Item>

        //     )).slice(0, 3) : "No reviews found"}



        // </Carousel>


        <div className="container">
            <Carousel responsive={responsive} itemAriaLabel="hhh">
                {/* {projects.length
                        ? projects.map((project, index) => {
                            const date = new Date(project?.created * 1000);
    
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');
    
                            const formattedDate = `${year}-${month}-${day}`;
    
                            return (
                                <div className="item" key={index}>
                                    <div className="top_artist_slider">
                                        {project?.attachment_name?.includes(",") ? (
                                            <>
                                                <a href={`/${project?.project_name?.split(" ").join("-")}-${project?.id}`}>
                                                    <img className="art-img1" src={common.get_attachment(
                                                        (project?.attachment_name)?.substring(0, project?.attachment_name.indexOf(',')), formattedDate
                                                    ) || "../img/logo.png"} alt="" />
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <a href={`/${project?.project_name?.split(" ").join("-")}-${project?.id}`}>
                                                    <img className="art-img1" src={common.get_attachment(
                                                        (project?.attachment_name), formattedDate) || "../img/logo.png"} alt="art-image" />
                                                </a>
                                            </>
                                        )}
                                        <h3>{project?.project_name}</h3>
                                        <span> Created by {project?.creator?.user_name}</span>
                                        <p>{formattedDate}</p>
                                    </div>
                                </div>
                            );
                        })
                        : "No projects found"} */}

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="../img/pic5.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="../img/pic6.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>


                <div className="item">
                    <div className="top_artist_slider">
                        <img src="../img/pic7.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="../img/pic9.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>

                <div className="item">
                    <div className="top_artist_slider">
                        <img src="../img/pic8.png" alt="" />
                        <h3>Beetle Ladybug Art</h3>
                        <span><img src="img/man.jpg" alt="" /> Created by Raveart</span>
                    </div>
                </div>
            </Carousel>






        </div>







    );
}

CustomerSays.ignorePath = true;
export default CustomerSays;
