import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import api from "../src/api/services/api";
import common from "../src/helpers/common";

const Crou = () => {
    const [opt, setOpt] = useAtom(atom.project.api.rev_proj_opt);
    const [projects, setproj] = useAtom(atom.project.api.reviewed_projects);

    const responsive = {
        superLargeDesktop: {
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
        api.project.review_projects({ params: {} })

    }, []);

    console.log("reviewed projects", projects)
    return (
        <div className="container">
            <Carousel responsive={responsive} itemAriaLabel="hhh">
                {projects.length
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
                                            <a href={`/machining/${project?.project_name?.split(" ").join("-")}-${project?.id}`}>
                                                <img className="art-img1" src={common.get_attachment(
                                                    (project?.attachment_name)?.substring(0, project?.attachment_name.indexOf(',')), formattedDate
                                                ) || "../img/logo.png"} alt="" />
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a href={`/machining/${project?.project_name?.split(" ").join("-")}-${project?.id}`}>
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
                    : "No projects found"}
            </Carousel>
        </div>
    );
}

Crou.ignorePath = true;
export default Crou;
