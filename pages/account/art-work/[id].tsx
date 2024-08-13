import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import api from "../../../src/api/services/api";
import atom from "../../../src/jotai/atom";
import { useAtomValue, useAtom } from "jotai";
import common from '../../../src/helpers/common';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Artwork = () => {

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

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const id = router?.query?.id
        api.project.get_portfolio_art({ params: { id: id } })
    }, [router.isReady]);

    const get_portfolio_art: any = useAtomValue(atom.project.api.get_portfolio_art);

    const [slides, setslides] = useState(0)



    return (
        <section className="row portfolio_details_wp">
            <div className="col-sm-8">
                <div className="portfolio4">
                    <div className="row portfolio5">
                        <div className="col-sm-6">
                            <i style={{ cursor: "pointer", display: slides == 0 ? "none" : "" }} onClick={() => setslides((slides) => slides - 1)} className="fa fa-angle-left"></i> <b>{slides + 1} / {get_portfolio_art?.attachment1?.split(',')?.length}</b> <i style={{ cursor: "pointer", display: slides + 1 == get_portfolio_art?.attachment1?.split(',')?.length ? "none" : "" }} onClick={() => setslides((slides) => slides + 1)} className="fa fa-angle-right"></i>
                        </div>
                        <div className="col-sm-6">
                            <i className="fa fa-search-plus" aria-hidden="true"></i>
                            <i className="fa fa-search-minus" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="port_fo">
                        <img src={common.get_portfolio_pic(get_portfolio_art?.attachment1?.split(',')[slides]) || "../../no-images.png"} alt="" />
                    </div>
                   
                    <div className="portfolio_thamb">
                        <Carousel responsive={responsive} itemAriaLabel="hhh">

                            {get_portfolio_art?.attachment1?.length ? get_portfolio_art?.attachment1?.split(',')?.map((f, index) => {
                                return (
                                    <img style={{cursor: "pointer"}} onClick={() => setslides(index)} key={index} src={common.get_portfolio_pic(f) || "../../no-images.png"} alt="" />
                                )
                            }) : (
                                <></>
                            )}

                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="portfolio_details_right">
                    <div className="row portfolio6">
                        <div className="col-sm-3">
                            <div className="portfolio1">
                                <img src={
                                    common.get_profile_picture(get_portfolio_art?.programmer?.logo) ||
                                    "../../img/no-images.png"
                                } alt="profile-picture" />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="portfolio2">
                                <h3>{get_portfolio_art?.programmer?.user_name} <i className="fa fa-check-circle"></i></h3>
                                <p>Sculpture Artist</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="portfolio3">
                        <h1>{get_portfolio_art?.title}</h1>
                        {/* <small>Sculpture</small> */}
                        <div className="jusa">
                            <ul className="ex1">
                                {get_portfolio_art?.programmer?.category_names?.map((m) => {
                                    return (
                                        <>
                                            <li><a href="#">{m}</a></li>
                                        </>
                                    )
                                })}
                                
                            </ul>
                        </div>
                        <p>{get_portfolio_art?.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

Artwork.ignorePath = true;

export default Artwork
