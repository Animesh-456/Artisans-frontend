import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { CountryReponse } from "../../src/@types/type";
import Carousel from 'react-bootstrap/Carousel';
import env from "../../src/config/api";
import Head from "next/head";
type Props = {};



export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 28,
            status: 'active',
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString}`);
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
const Profile = (prp) => {
    const router = useRouter();
    const data = useAtomValue(atom.auth.api.me);
    const opt = useAtomValue(atom.project.api.my_opt);
    const opt_user = useAtomValue(atom.project.api.my_proj_opt);
    const user = useAtomValue(atom.storage.user);
    const list = useAtomValue(atom.project.api.my);
    const projects = useAtomValue(atom.project.api.my_project);
    const transactions = useAtomValue(atom.auth.api.user_spent);

    let project_images = '';


    project_images = user?.prot_pic != null ? user?.prot_pic.split(',') : ''


    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState([]);

    useEffect(() => {
        api.auth.me({});
        api.project.my({ params: { ...opt, status: 1 } });
        api.project.my_projects({ params: { ...opt_user, status: 1 } });
        api.auth.user_spent({ params: {} });
        //setSlide(project_images[0])
    }, []);

    let totalAmount = 0;

    transactions.forEach((e) => {
        totalAmount += e.amount;
    })



    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.my_projects({ params: { ...opt_user, page: i } });
            });
    };

    const prevSlide = () => {
        if (index == 0) {
            setIndex(slide?.length - 1);
        }
        else {
            setIndex(index - 1);
        }
        //setSlide(project_images[index]);
        //console.log("prev slide ", slide);

    }


    const nextSlide = () => {
        if (index == slide?.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        //console.log("next slide ", slide);
    }

    useEffect(() => {
        if (user?.prot_pic?.length) {
            let p = user?.prot_pic?.split(",")
            setSlide(p)
        }
    }, [user?.prot_pic])

    useEffect(() => {
        api.auth.countries({});
    }, []);


    const countries = useAtomValue<Array<CountryReponse>>(
        atom.auth.api.countries,
    );

    return (
        <>

            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>


            <section className="myproject">
                <div className='container'>
                    <div className='row'>
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>

                        <div className='col-sm-8'>
                            <div className='profile_box'>
                                <div className="prof111">
                                    <h4>
                                        My Profile (
                                        {user?.role_id == 1
                                            ? "Customer"
                                            : user?.role_id == 2
                                                ? "Artist"
                                                : ""}
                                        )
                                    </h4>
                                </div>
                                <div className='myprofile_w'>
                                    <div className='myprofile_l'>
                                        <div className='myprofile_name_label'>
                                            <p>Username</p>
                                        </div>
                                        <div className='myprofile_name_list'>
                                            <p>{data?.user_name}</p>
                                        </div>
                                        <div className='myprofile_name_label'>
                                            <p>Name</p>
                                        </div>
                                        <div className='myprofile_name_list'>
                                            <p>{data?.name + " " + data?.surname}</p>
                                        </div>
                                        <div className='myprofile_name_label'>
                                            <p>Address</p>
                                        </div>
                                        <div className='myprofile_name_list'>
                                            <p>{data?.address1}</p>
                                        </div>
                                        <div className='myprofile_name_label'>
                                            <p>Post code</p>
                                        </div>
                                        <div className='myprofile_name_list'>
                                            <p>{data?.zcode}</p>
                                        </div>
                                        <div className='myprofile_name_label'>
                                            <p>City</p>
                                        </div>
                                        <div className='myprofile_name_list'>
                                            <p>{data?.city}</p>
                                        </div>

                                        {user?.role_id == 2 ? (
                                            <>

                                                <div className='myprofile_name_label'>
                                                    <p>Category</p>
                                                </div>
                                                <div className='myprofile_name_list'>
                                                    <p>{data?.category_names?.join(', ')}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}



                                        {user?.pro_user == 1 ? (
                                            <>
                                                <div className='myprofile_name_label'>
                                                    <p>Company Name</p>
                                                </div>
                                                <div className='myprofile_name_list'>
                                                    <p>{data?.company_name}</p>
                                                </div>

                                                <div className='myprofile_name_label'>
                                                    <p>SIREN</p>
                                                </div>
                                                <div className='myprofile_name_list'>
                                                    <p>{data?.siren}</p>
                                                </div>
                                            </>
                                        ) : (<></>)}
                                        <div className='myprofile_name_label'>
                                            <p>Country</p>
                                        </div>





                                        <div className='myprofile_name_list'>
                                            <p>India</p>
                                        </div>




                                        {user?.role_id == 1 ? (
                                            <>
                                                <div className='myprofile_name_label'>
                                                    <p>Description</p>
                                                </div>
                                                <div className='myprofile_name_list'>
                                                    <p>{data?.description}</p>
                                                </div>
                                            </>
                                        ) : user?.role_id == 2 ? (
                                            <>
                                                <div className='myprofile_name_label'>
                                                    <p>Description</p>
                                                </div>
                                                <div className='myprofile_name_list'>
                                                    <p>{data?.service_desc}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}






                                        {user?.role_id == 2 && user?.pro_user == 1 ? (
                                            <>
                                                <table>
                                                    <tr>
                                                        <td><b>TVA : </b></td>
                                                        <td><b>{user?.pro_vat}%</b></td>
                                                    </tr>
                                                </table>
                                            </>
                                        ) : (<></>)}
                                        {/* <div className='myprofile_name_label'>
											<p>Portfolio Pictures</p>
										</div>
										<div className='myprofile_name_list'>
											<div
												id='demo'
												className='carousel slide'
												data-ride='carousel'>
												<div className='carousel-inner'>
													<div className='carousel-item active'>
														<img src='/img/pic.png' />
													</div>
													<div className='carousel-item'>
														<img src='/img/pic1.png' />
													</div>
													<div className='carousel-item'>
														<img src='/img/pic2.png' />
													</div>
												</div>
												<a
													className='carousel-control-prev'
													href='#demo'
													data-slide='prev'>
													<span className='carousel-control-prev-icon' />
												</a>
												<a
													className='carousel-control-next'
													href='#demo'
													data-slide='next'>
													<span className='carousel-control-next-icon' />
												</a>
											</div>
										</div> */}
                                    </div>
                                    <div className='myprofile_r'>
                                        <figure>
                                            <img
                                                src={
                                                    common.get_profile_picture(data?.logo) ||
                                                    "../img/no-images.png"
                                                }
                                            />
                                        </figure>
                                        <figcaption>Profile Picture</figcaption>
                                    </div>
                                </div>
                                <hr />
                                {user?.role_id == 1 ? (
                                    <>
                                        <div className="rys1"><h5>My Jobs</h5></div>
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                    <tr className='table-primary'>
                                                        <th>Jobs published</th>
                                                        <th>Jobs awarded</th>
                                                        <th>Evaluations</th>
                                                        <th>GBP Spent</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{list?.length}</td>
                                                        <td>
                                                            {
                                                                transactions?.length
                                                            }
                                                        </td>
                                                        <td>
                                                            {list?.reduce(
                                                                (a, b) => a + parseInt(b?.bids_count || "0"),
                                                                0,
                                                            )}{" "}
                                                            Votes received
                                                        </td>
                                                        <td>{totalAmount}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>

                                            <div className="table-responsive">
                                                <table className='table'>
                                                    <thead>
                                                        <tr className='table-primary'>
                                                            <th scope='col'>Job Title</th>
                                                            <th scope='col'>Published</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projects?.length ? (
                                                            projects?.map((l) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{l?.project_name}</td>
                                                                        <td>
                                                                            {moment(l?.project_post_format_date).format(
                                                                                "DD-MMM, YYYY",
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <ul className='pagination'>
                                                {/* <li className='page-item'>
														<a className='page-link' href='#'>
															Previous
														</a>
													</li> */}
                                                {opt_user.total_count > 10 && Array.from({ length: opt_user.total_pages + 1 }).map(
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
                                                )}

                                                {/* <li className='page-item'>
														<a className='page-link' href=''>
															Next
														</a>
													</li> */}
                                            </ul>


                                        </div>


                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};
Profile.ignorePath = false;

export default Profile;