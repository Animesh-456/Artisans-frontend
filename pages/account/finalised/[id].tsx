import { useAtomValue } from "jotai/utils";

import atom from "../../../src/jotai/atom";
import { useEffect, useState } from "react";
import common from "../../../src/helpers/common";
import router from "next/router";

import api from "../../../src/api/services/api";
import GlobalModal from "../../../src/views/Common/Modals/GlobalModal";
import { useAtom } from "jotai";
import Link from "next/link";


const image = () => {
    
    const project_gallery = useAtomValue(atom.project.api.public_profile_finalised_image)
    

    useEffect(() => {
	let id = router.query?.id;
        api.project.public_profile_finalised_image({ params: { id: id } });
	api.project.public_me({ params: { id: id } })
    }, []);

    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)
        api.project.public_profile_finalised_image({ params: { ...galleryopt, page: pageNumber - 1,id: 13449 } });
    }, [])

    //console.log("all lists are: ------------->", public_profile_finalised_image)

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }


    const [index, setIndex] = useState(0);
    const [open_img, setOpen_img] = useAtom(atom.modal.img_viewer);
    const [slide, setSlide] = useState(project_gallery[0]?.a);

    const [project_name, setproject_name] = useState(project_gallery[0]?.a)
    const [id, setid] = useState(project_gallery[0]?.c)
    const [dt, setdt] = useState(project_gallery[0]?.d)


const user = useAtomValue(atom.project.api.public_me)

    const prevSlide = () => {
        if (index == 0) {
            setIndex(project_gallery.length - 1);
        }
        else {
            setIndex(index - 1);
        }
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
        setdt(project_gallery[index]?.d)
        console.log("prev slide ", slide);

    }


    const nextSlide = () => {
        if (index == project_gallery.length - 1) {
            setIndex(0)
            setSlide(project_gallery[index]?.a);
            setproject_name(project_gallery[index]?.b)
            setid(project_gallery[index]?.c)
            setdt(project_gallery[index]?.d)
        } else {
            setIndex((prevState) => prevState + 1)
            setSlide(project_gallery[index]?.a);
            setproject_name(project_gallery[index]?.b)
            setid(project_gallery[index]?.c)
            setdt(project_gallery[index]?.d)
        }
        //setIndex((index + 1) % (project_gallery.length - 1));
        console.log("next slide ", slide);
    }

    console.log("gallery images :-", project_gallery)

    console.log("index is :- ", index)

    console.log("slide is:-", slide)

    useEffect(() => {
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
        setdt(project_gallery[index]?.d)
    }, [index])


    const handlePageClick = (i) => {

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.public_profile_finalised_image({ params: { ...galleryopt, page: i } });
            });
    };


    const galleryopt = useAtomValue(atom.project.api.gallery_opt);

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, galleryopt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(galleryopt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Latest Achievements of {user?.user_name}</h1>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container latest_request'>

                <div className='row'>
                    {project_gallery?.length
                        ? (project_gallery?.map((l, index) => {
                            var imageSrc = common.get_attachment(l?.a, l?.d);
                            if (imageSrc = '/public/404.jpg') {
                                imageSrc = common.get_attachment_latest_ach(l?.a)
                            }
                            console.log("image src is :--", imageSrc)
                            return (
                                <div className='col-sm-3'>
                                    <div className='last_l'>
                                        
                                        <figure>
                                            <a data-toggle="tooltip" data-placement="top" title={l?.b}>
                                                <img
                                                    src={imageSrc}
                                                    onClick={() => {
                                                        router.push(`/${l?.b?.split(" ").join("-")}-${l?.c}`)
                                                    }}
                                                />
                                            </a>

                                            <h6>{l?.b}</h6>
                                        </figure>

                                    </div>
                                </div>
                            );
                        }))
                        : ""}
                     <GlobalModal title={`${project_name}`} atom={atom.modal.img_viewer}>
                        {
                            common?.get_attachment(slide, dt) != '/public/404.jpg' ? (
                                <>
                                    <div className='myprofile_name_list'>
                                        <div
                                            id='demo'
                                            className='carousel slide'
                                            data-ride='carousel'>
                                            <div className='carousel-inner'>
                                                <div className='carousel-item active'>

                                                    <img src={`${common.get_attachment(slide, dt)}`} id="curr_img" onClick={() => router.push(`/${project_name?.split(" ").join("-")}-${id}`)} />
                                                </div>
                                            </div>
                                            <button
                                                className='carousel-control-prev'
                                                onClick={prevSlide}
                                                data-slide='prev'>
                                                <span className='carousel-control-prev-icon' />
                                            </button>
                                            <button
                                                className='carousel-control-next'
                                                onClick={nextSlide}
                                                data-slide='next'>
                                                <span className='carousel-control-next-icon' />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='myprofile_name_list'>
                                        <div
                                            id='demo'
                                            className='carousel slide'
                                            data-ride='carousel'>
                                            <div className='carousel-inner'>
                                                <div className='carousel-item active'>

                                                    <img src={`${common.get_attachment_latest_ach(slide)}`} id="curr_img" onClick={() => router.push(`/${project_name?.split(" ").join("-")}-${id}`)} />
                                                </div>
                                            </div>
                                            <button
                                                className='carousel-control-prev'
                                                onClick={prevSlide}
                                                data-slide='prev'>
                                                <span className='carousel-control-prev-icon' />
                                            </button>
                                            <button
                                                className='carousel-control-next'
                                                onClick={nextSlide}
                                                data-slide='next'>
                                                <span className='carousel-control-next-icon' />
                                            </button>
                                        </div>
                                    </div></>
                            )

                        }


                    </GlobalModal>
                </div>

                

                    
                
            </div>



        </>
    )
}

image.ignorePath = true

export default image