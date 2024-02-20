import { useAtomValue } from "jotai/utils";
import atom from "../../src/jotai/atom";
import { useEffect, useState } from "react";
import common from "../../src/helpers/common";
import router from "next/router";
import api from "../../src/api/services/api";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import { useAtom } from "jotai";
import Link from "next/link";
import Image from "next/image";

const image = () => {
    const all_list = useAtomValue(atom.project.api.all_list);
    const project_gallery = useAtomValue(atom.project.api.project_gallery)


    useEffect(() => {
        api.project.all_lists({ params: {} });
    }, []);

    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)
        api.project.project_gallery({ params: { ...galleryopt, page: pageNumber - 1 } });
    }, [])

    console.log("all lists are: ------------->", all_list)

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    // all_list?.map((m) => {
    //     if (m?.attach_file.includes(",")) {
    //         m?.attach_file.split(",").map((a) => {
    //             console.log("a files", a)
    //         })
    //     }
    //     console.log(m?.attach_file)
    // })

    const [index, setIndex] = useState(0);
    const [open_img, setOpen_img] = useAtom(atom.modal.img_viewer);
    const [slide, setSlide] = useState(project_gallery[0]?.a);

    const [project_name, setproject_name] = useState(project_gallery[0]?.a)
    const [id, setid] = useState(project_gallery[0]?.c)
    const [dt, setdt] = useState(project_gallery[0]?.d)


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

        // var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d);
        // if (md = '/public/404.jpg') {
        //     md = common.get_attachment_latest_ach(project_gallery[index]?.a)
        // }

        // console.log("md is", md)
        // console.log("index is->>>>", index)
        // setimg_modal(md)



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


        // var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d);
        // if (md = '/public/404.jpg') {
        //     md = common.get_attachment_latest_ach(project_gallery[index]?.a)
        // }

        // console.log("md is", md)
        // setimg_modal(md)


        //setIndex((index + 1) % (project_gallery.length - 1));
        console.log("next slide ", slide);

        console.log("index is->>>>", index)

        console.log("modal slide-->", img_modal)

    }

    console.log("gallery images :-", project_gallery)

    console.log("index is :- ", index)

    console.log("slide is:-", slide)

    // useEffect(() => {
    //     setSlide(project_gallery[index]?.a);
    //     setproject_name(project_gallery[index]?.b)
    //     setid(project_gallery[index]?.c)
    //     setdt(project_gallery[index]?.d)
    //     console.log("useeffect all states", index, slide, project_name, id, dt)
    // }, [index])


    const handlePageClick = (i) => {

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.project_gallery({ params: { ...galleryopt, page: i } });
            });
    };


    const galleryopt = useAtomValue(atom.project.api.gallery_opt);

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, galleryopt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(galleryopt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const [img_modal, setimg_modal] = useState(null)

    // useEffect(() => {
    //     let md = common.get_attachment(slide, dt)
    //     if (md = '/public/404.jpg') {
    //         setimg_modal(common.get_attachment_latest_ach(slide))
    //     } else {
    //         setimg_modal(common.get_attachment(slide, dt))
    //     }
    // }, [])

    const modal_img = (a, b) => {
        let md = common.get_attachment(a, b)
        if (md = '/public/404.jpg') {
            md = common.get_attachment_latest_ach(a)
            setimg_modal(md)
        } else {
            md = common.get_attachment(a, b)
            setimg_modal(md)
        }

        return md
    }

    // useEffect(() => {
    //     var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d);
    //     if (md = '/public/404.jpg') {
    //         md = common.get_attachment_latest_ach(project_gallery[index]?.a)
    //     }

    //     console.log("md is", md)
    //     setimg_modal(md)
    //     console.log("img modal useeffect",img_modal)
    //     //setimg_modal(common.get_attachment(slide, dt))
    // }, [index])

    useEffect(() => {
        console.log("index in useeffect", index)

        var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d)
        if (md = '/public/404.jpg') {
            md = common.get_attachment_latest_ach(project_gallery[index]?.a)
            setimg_modal(md)
        } else {
            setimg_modal(md)
        }
    }, [index])



    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>LATEST ACHIEVEMENTS</h1>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container latest_request'>

                <div className='row'>
                    {project_gallery?.length
                        ? (project_gallery?.map((l, ind) => {
                            var imageSrc = common.get_attachment(l?.a, l?.d);
                            if (imageSrc = '/public/404.jpg') {
                                imageSrc = common.get_attachment_latest_ach(l?.a)
                            }
                            //console.log("loop index is ", ind)

                            return (
                                <div className='col-sm-3'>
                                    <div className='last_l'>

                                        <figure>
                                            <a data-toggle="tooltip" data-placement="top" title={l?.b}>

                                                <img
                                                    src={imageSrc}

                                                    onClick={() => {
                                                        setOpen_img(true)
                                                        setSlide(l?.a)
                                                        setIndex(ind)
                                                        setproject_name(l?.b)
                                                        setid(l?.c)
                                                        setdt(l?.d)
                                                        modal_img(l?.a, l?.d)
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
                    <GlobalModal title={`${project_gallery[index]?.b}`} atom={atom.modal.img_viewer}>


                        <>
                            <div className='myprofile_name_list'>
                                <div
                                    id='demo'
                                    className='carousel slide'
                                    data-ride='carousel'>
                                    <div className='carousel-inner'>
                                        <div className='carousel-item active'>
                                            <img src={`${img_modal}?q=1`} id="curr_img" onClick={() => router.push(`/machining/${project_name?.split(" ").join("-")}-${id}`)} />
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





                    </GlobalModal>
                </div>

                {/* <div className='row'>
                    {all_list?.length
                        ? (all_list?.map((l) => {

                            return (
                                l?.adminApprove == 1 && l?.attach_file.includes(",") ? l?.attach_file.split(",").map((m) => {
                                    <div className='col-sm-3'>
                                        <div className='last_l'>

                                            <figure>
                                                <a data-toggle="tooltip" data-placement="top" title={l?.project_name}>
                                                    <img
                                                        src={common.get_image(
                                                            (m)
                                                        )} />
                                                </a>
                                                <h6>{l?.project_name}</h6>
                                            </figure>

                                        </div>
                                    </div>
                                }) :  l?.adminApprove == 1 && !l?.attach_file.includes(",")? (
                                    <div className='col-sm-3'>
                                        <div className='last_l'>

                                            <figure>
                                                <a data-toggle="tooltip" data-placement="top" title={l?.project_name}>
                                                    <img
                                                        src={common.get_image(
                                                            (l?.attach_file)
                                                        )} />
                                                </a>
                                                <h6>{l?.project_name}</h6>
                                            </figure>

                                        </div>
                                    </div>
                                ) : (<></>)

                            );
                        }))
                        : ""}
                </div> */}


                <ul className='pagination'>
                    {(galleryopt.page > 0) ? <li className='page-item'>
                        <a className='page-link' onClick={() => handlePageClick(0)}>
                            First
                        </a>
                    </li> : ""}
                    {(galleryopt.page > 0) ? <li className='page-item'>
                        <a className='page-link' onClick={() => handlePageClick(galleryopt.page - 1)}>
                            Previous
                        </a>
                    </li> : ""}
                    {/* {(opt.total_pages < 10 ? (Array.from({ length: opt.page + 1 })) : (Array.from({ length: 10 }))).map(
										(d, i: any) => {
											return (
												<li
													className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
														1 ==
														i
														? "active"
														: ""
														}`}>
													<Link href={`${router.pathname}?page=${i}`}>
														<a
															className='page-link'
															onClick={(e) => {
																e.preventDefault();
																handlePageClick(i);
															}}>
															{i + 1}
														</a>
													</Link>
												</li>
											);
										},
									)} */}

                    {galleryopt.total_count && getPageNumbers().map((page) => (

                        <li
                            className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 ==
                                page
                                ? "active"
                                : ""
                                }`}>
                            <Link href={`${router.pathname}?page=${page}`}>
                                <a
                                    className='page-link'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageClick(page);
                                    }}>
                                    {page + 1}
                                </a>
                            </Link>
                        </li>

                    ))}




                    {galleryopt.page != galleryopt.total_pages ?
                        <li className='page-item'>
                            <a className='page-link' onClick={() => handlePageClick(galleryopt.page + 1)}>
                                Next
                            </a>
                        </li> : ""}
                    {galleryopt.page != galleryopt.total_pages ? <li className='page-item'>
                        <a className='page-link' onClick={() => handlePageClick(galleryopt.total_pages)}>
                            Last
                        </a>
                    </li> : ""}
                </ul>
            </div>



        </>
    )
}

image.ignorePath = true

export default image