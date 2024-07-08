import { useEffect, useState } from "react";
import { CSSProperties } from 'react';
import test from "../src/validation/schema/test";
import { perfTest, Pick, Validate } from "../src/validation/utils/test";
import _ from "lodash";
import Joi from "joi";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import api from "../src/api/services/api";
import HomeHeader from "../src/views/index/HomeHeader";
import LastJobPictures from "../src/views/index/LastJobPictures";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import { ProjectDetails } from "../src/@types/type";
import moment from "moment";
import common from "../src/helpers/common";
import router from "next/router";
import axios from "axios"
import { writeAtom } from "jotai-nexus";
import { Document, Page, pdfjs } from 'react-pdf';
import { useAtom } from "jotai";
import env from "../src/config/api";
import Head from "next/head";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();

        return {
            props: {
                prp: data // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null // Or any default value indicating an error occurred
            }
        };
    }
};

function Home(prp) {
    const latest = useAtomValue(atom.project.api.latest);
    const allreviews = useAtomValue(atom.project.api.allreviews);
    const all_list = useAtomValue(atom.project.api.all_list);
    const [numPages, setNumPages] = useState(null);
    const [filename, setFilename] = useState("");
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);



    useEffect(() => {
        api.project.latest({ params: { page: 0 } });
    }, []);

    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);

    //useEffect(() => {
    //    api.project.image_list({ params: {} })
    //}, []);

    useEffect(() => {
        api.project.all_lists({ params: {} });
    }, []);

    //console.log("latest lists are:- ", latest)

    console.log("all lists are: ------------->", all_list)
    console.log("prp is----", prp)
    //console.log("All reviews are: -", allreviews)

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    const handlepost = () => {
        router.push("/usinage")
    }


    const user = useAtomValue(atom.storage.user);

    useEffect(() => {
        if (user) {
            api.project.public_profile_total_jobs({ params: { id: user?.id } })
        }
    }, [])


    const totaljobs = useAtomValue(atom.project.api.total_jobs)

    //latest.map((m) => {
    //   console.log("The latest is", m)
    //})
    const onDocumentLoadSuccess = ({ numPages }) => {
        //console.log("total page in pdf", numPages);
        setNumPages(numPages);
    };
    const rating = 3.5;
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled"></span>);
        }
        if (halfStar) {
            stars.push(<span key={fullStars} className="star half"></span>);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<span key={i} className="star empty"></span>);
        }

        return stars;
    };


    return (
        <>
            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />

            </Head>
            <HomeHeader />
            <div>
                <div className='container latest_request'>
                    <div>
                        <h1>Dernières Demandes d'Usinage</h1>
                    </div>
                    <div className='row'>
                        {latest?.length
                            ? latest?.map((l) => {
                                const strt = new Date(l?.project_post_format_date)


                                let n = new Date().toLocaleString('en-US', {
                                    timeZone: 'Europe/Paris',
                                });
                                const nd = new Date(n)

                                const today = new Date()
                                nd.setHours(nd.getHours(), nd.getMinutes(), nd.getSeconds());


                                // Calculate the time difference in milliseconds
                                const timeDiff = nd.getTime() - strt.getTime();

                                // Calculate the number of days
                                const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                                // Calculate the number of remaining hours
                                const hourDifference = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

                                // console.log("ndis", diffInDays, hourDifference)

                                const date = new Date(l?.created * 1000);

                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                const seconds = String(date.getSeconds()).padStart(2, '0');

                                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                const dt = new Date();
                                console.log("current date--------->>", dt);
                                //console.log('created-------------------',formattedDate); 				
                                return (
                                    <div className='col-sm-4'>
                                        <div className='laste_l'>
                                            {l?.visibility.toLowerCase() == "public" ? (
                                                <figure>
                                                    {l?.attachment_name?.includes(",") ? (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')).includes("pdf") ? <div className="pdf-container"><Document
                                                        file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={1} width={200} />
                                                    </Document> </div> : (

                                                        <img
                                                            src={common.get_attachment(
                                                                (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
                                                                formattedDate,
                                                            )}
                                                            alt="Custom cnc"
                                                        />
                                                    ) : (l?.attachment_name).includes("pdf") ? <div className="pdf-container"><Document
                                                        file={common.get_attachment((l?.attachment_name), formattedDate)}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={1} width={200} />
                                                    </Document> </div> : (
                                                        <img
                                                            src={common.get_attachment(
                                                                (l?.attachment_name),
                                                                formattedDate,
                                                            )}
                                                            alt="Custom cnc"
                                                        />
                                                    )}
                                                </figure>
                                            ) : l?.visibility.toLowerCase() == "private" ? (
                                                (user && (user?.role_id == 2 && Number(totaljobs) >= 1) || (user?.id == l?.creator_id) ? (
                                                    <figure>
                                                        {l?.attachment_name?.includes(",") ? (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')).includes("pdf") ? <div className="pdf-container"><Document
                                                            file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
                                                            onLoadSuccess={onDocumentLoadSuccess}
                                                        >
                                                            <Page pageNumber={1} width={200} />
                                                        </Document> </div> : (
                                                            <img
                                                                src={common.get_attachment(
                                                                    (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
                                                                    formattedDate,
                                                                )}
                                                                alt="Custom cnc"
                                                            />
                                                        ) : (l?.attachment_name).includes("pdf") ? <div className="pdf-container"><Document
                                                            file={common.get_attachment((l?.attachment_name), formattedDate)}
                                                            onLoadSuccess={onDocumentLoadSuccess}
                                                        >
                                                            <Page pageNumber={1} width={200} />
                                                        </Document> </div> : (
                                                            <img
                                                                src={common.get_attachment(
                                                                    (l?.attachment_name),
                                                                    formattedDate,
                                                                )}
                                                                alt="Custom cnc"
                                                            />
                                                        )}
                                                    </figure>
                                                ) : (<figure><img
                                                    src='/img/private.jpg'
                                                /></figure>))
                                            ) : (<></>)}

                                            <div>



                                                <h2 className="ughv">
                                                    <a href={`/usinage/${l?.project_name?.split(" ").join("-")}-${l?.id}`} >{l?.project_name}</a>
                                                </h2>



                                                <span>
                                                    Posté:{" "}
                                                    il y a  {diffInDays} d {hourDifference}

                                                </span>
                                                <br />



                                                {l?.visibility.toLowerCase() == "private" ? (
                                                    (user && ((user?.role_id == 2 && Number(totaljobs) >= 1) || l?.creator_id == user?.id) ? (
                                                        <p>{l?.description?.length > 80 ? (l?.description?.slice(0, 80) + '...') : (l?.description)}</p>
                                                    ) : (
                                                        <></>
                                                    ))
                                                ) : (<p>{l?.description?.length > 80 ? (l?.description?.slice(0, 80) + '...') : (l?.description)}</p>)}

                                            </div>
                                        </div>
                                    </div>

                                );
                            }).slice(0, 3)
                            : ""}
                    </div>
                    <div className='all_request_button'>
                        <Link href='/job/listing'>
                            <a>
                                Toutes les Demandes <i className='fa fa-angle-right' />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='container step_wrapper'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='step_w'>
                                <figure>
                                    <a href="/usinage"><img src='img/icon_1.png' />
                                    </a>
                                </figure>
                                <div>
                                    <span>1</span>
                                    <h4>
                                        <a href="/usinage">Envoyez vos plans...</a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='step_w'>
                                <figure>
                                    <img src='img/icon_2.png' />
                                </figure>
                                <div>
                                    <span>2</span>
                                    <h4> <a href="#">Recevez des devis gratuitement et choisissez</a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='step_w'>
                                <figure>
                                    <img src='img/icon_3.png' />
                                </figure>
                                <div>
                                    <span>3</span>
                                    <h4><a href="">Payez après réception et si vous êtes satisfaits</a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qwe4"><a href="/page/works"><img src='img/blue-head.png' alt="UK machined parts" /></a></div>
                </div>

                <div className='container price-guide'>
                    <h4>Les Prix de I'Usinage</h4>
                    <p>Combien coûte l'usinage d'une pièce ?</p>
                    <figure>
                        <img src="https://www.usineur.fr/euro%20symbole.jpg" />
                    </figure>
                    <div>
                        <a href='/usinage/prix_usinage_tarifs'>
                            Voir tous les prix <i className='fa fa-angle-right' />
                        </a>

                    </div>

                </div>

                <div className='container machin1'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='machin4'>
                                <h3>Usineur.fr</h3>
                                <p>
                                    Avec Usineur.fr, faites fabriquer vos pièces sur mesure facilement.
                                    <br />
                                    <br />
                                    Recevez gratuitement des offres de plusieurs usineurs et bénéficiez de leurs conseils. Métal ou plastique, usinage CNC, traditionnel ou impression 3D, les usineurs ont ce qu’il faut. Payez à réception des pièces et seulement si vous êtes satisfaits.
                                    <br />
                                    <br />
                                    Gardez vos plans confidentiels si vous le souhaitez.
                                    <br />
                                    <br />
                                    Usineur.fr leader français de l’usinage en ligne depuis 2013 avec plus de 100 000 pièces livrées

                                </p>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <figure className='machin2'>
                                <img alt="Cnc machined parts" src='img/CNC Machined parts.jpg' />
                            </figure>
                        </div>
                    </div>
                </div>
                <div className='container machin1'>
                    <div className='row'>
                        <div className='col-sm-6 my-home'>
                            <figure className='machin3'>
                                <img alt="Cnc turning" src='img/CNC turning parts.PNG' />
                            </figure>
                        </div>
                        <div className='col-sm-6'>
                            <div className='machin5'>
                                <h3>"Usinage en ligne facile"</h3>
                                <p>
                                    J'ai enfin trouvé la solution pour usiner les pièces en acier et inox dont j'avais besoin. Ma demande n'intéressait pas les ateliers du coin. Mon usineur m'a livré les pièces en 1 semaine. Le prix était dans mon budget. J'ai reçu 2 offres rapidement. Le paiement n'est transmis à l'usineur qu'une fois les pièces reçues et examinées. Cela m'a mis en confiance pour passer ma première commande en ligne sur le site.
                                </p>
                                <p>  Michel Augrain </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container machin1'>
                    <div className='row'>
                        <div className='col-sm-6 '>
                            <div className='machin5'>
                                <h3>"Fabrication à l'unité"</h3>
                                <p>
                                    Un nouveau service d'usinage en ligne qui correspond à ceux d'entre nous qui ont besoin de faire fabriquer des pièces en métal sur mesure à l'unité. J'ai envoyé mon plan, choisi mon artisan usineur parmi les offres et 1 semaine plus tard, mon colis est arrivé et les pièces en aluminium et acier que j'ai conçues sont chez moi et prêtes à être montées. Ca fait plaisir de transformer ses projets en réalité.
                                </p>
                                <p> Stéphane Monier </p>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <figure className='machin3'>
                                <img alt="Cnc milling" src='img/cnc milling parts.png' />
                            </figure>
                        </div>
                    </div>
                </div>


                <div className='container latest_request'>
                    <div>
                        <h1>Dernières Réalisations</h1>
                    </div>
                    <div className='row'>
                        {all_list?.length
                            ? (all_list?.slice(0, 4).map((l) => {

                                return (
                                    <>
                                        <div className='col-sm-3'>
                                            <div className='last_l'>
                                                <figure>
                                                    <a data-toggle="tooltip" data-placement="top" title={l?.b}>


                                                        <Link href={`/usinage/${l?.b?.split(" ").join("-")}-${l?.c}`}>

                                                            <img
                                                                // src={common.get_attachment_latest_ach(l?.a)}
                                                                src={common.get_attachment(l?.a, l?.d)}
                                                                alt="UK machined parts"
                                                            //onClick={() => RefLink(`/usinage/projectDetails/${l?.project_name}-${l?.project_id}`)}
                                                            />
                                                        </Link>
                                                    </a>
                                                </figure>
                                            </div>

                                        </div>
                                    </>
                                );
                            }))
                            : ""}
                    </div>
                    <div className='all_request_button'>
                        <Link href='/account/projectgallery'>
                            <a>
                                Toutes les Photos <i className='fa fa-angle-right' />
                            </a>
                        </Link>
                    </div>
                </div>


                <div className='container latest_review'>
                    <div>
                        <h1>Dernières Evaluations</h1>
                    </div>
                    <div className="row">
                        <>
                            {allreviews?.length ? allreviews?.map((l) => {





                                return (
                                    <div className='col-sm-4'>

                                        <div className='latest_r'>
                                            <div className='rf85f'>
                                                <p>
                                                    <div
                                                        className="stars"
                                                        style={{ '--rating': l?.rating } as CSSProperties}
                                                    ></div>
                                                    <span>{l?.rating}</span>
                                                </p>

                                                <h6>{new Date(l?.review_post_date).toLocaleDateString('fr-FR', {
                                                    day: "2-digit",
                                                    month: "long", // Use "long" instead of "short" for full month name
                                                    year: "numeric"
                                                }).replace(/(\d+)\s(\w+)\s(\d+)/, (_, day, month, year) => `${day}-${month},${year}`)}</h6>




                                            </div>

                                            <h4>
                                                {l?.comments}
                                            </h4>
                                            <h5> <b> -{l?.buyer?.user_name} </b> </h5>
                                            <h6></h6>

                                        </div>
                                    </div>
                                )
                            }).slice(0, 3) : (<></>)}
                        </>

                    </div>
                    <div className='all_request_button'>
                        <Link href='/account/allreviews'>
                            <a>
                                Toutes les Evaluations <i className='fa fa-angle-right' />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='container-fluid bottom-main-press'>

                    <div className='container'>
                        <h1>Ils parlent de nous</h1>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://www.leparisien.fr/hauts-de-seine-92/rueil-malmaison-92500/rueil-il-a-cree-un-site-qui-change-la-vie-aux-grands-bricoleurs-21-08-2015-5025473.php">
                                        <img src='img/logo-usn.png' />
                                    </a>
                                </figure>
                            </div>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://www.usinenouvelle.com/article/vous-avez-besoin-d-une-piece-un-site-internet-met-en-relation-usineurs-et-clients.N373031">
                                        <img src='img/press_2.png' />
                                    </a>
                                </figure>
                            </div>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://www.usineur.fr/page/Systeme_D">

                                        <img src='img/press_3.png' />
                                    </a>
                                </figure>
                            </div>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://www.largus.fr/pros/actualite-automobile/un-site-pour-lusinage-de-pieces-en-petites-series-7977385.html">

                                        <img src='img/press_4.png' />
                                    </a>
                                </figure>
                            </div>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://www.usineur.fr/page/enduro-mag">

                                        <img src='img/press_7.png' />
                                    </a>
                                </figure>
                            </div>
                            <div className='col-sm-2'>
                                <figure>
                                    <a href="https://moto-station.com/moto-revue/actu/usineur-fr-un-site-pour-faire-usiner-vos-pieces/34714">
                                        <img src='img/press1.jpg' />
                                    </a>
                                </figure>
                            </div>
                            <div className="button-allpoint">
                                <Link href='/account/allpoints'>
                                    <a href="">Toute la Presse <i className='fa fa-angle-right' /> </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reg-button">
                <button type='submit' name='submit' onClick={handlepost}>
                    Recevez des Devis
                </button>
            </div>

        </>
    );
}


Home.ignorePath = true;
export default Home;
