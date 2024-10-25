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


    const countryMapping = {
        AF: "Afghanistan",
        ZA: "South Africa",
        AL: "Albania",
        DZ: "Algeria",
        DE: "Germany",
        US: "United States",
        AD: "Andorra",
        AO: "Angola",
        AI: "Anguilla",
        AQ: "Antarctica",
        AG: "Antigua and Barbuda",
        SA: "Saudi Arabia",
        AR: "Argentina",
        AM: "Armenia",
        AW: "Aruba",
        AU: "Australia",
        AT: "Austria",
        AZ: "Azerbaijan",
        BS: "Bahamas",
        BH: "Bahrain",
        BD: "Bangladesh",
        BB: "Barbados",
        BE: "Belgium",
        BZ: "Belize",
        BJ: "Benin",
        BM: "Bermuda",
        BT: "Bhutan",
        BY: "Belarus",
        BO: "Bolivia",
        BA: "Bosnia and Herzegovina",
        BW: "Botswana",
        BR: "Brazil",
        BN: "Brunei",
        BG: "Bulgaria",
        BF: "Burkina Faso",
        BI: "Burundi",
        KH: "Cambodia",
        CM: "Cameroon",
        CA: "Canada",
        CV: "Cape Verde",
        CL: "Chile",
        CN: "China",
        CY: "Cyprus",
        CO: "Colombia",
        KM: "Comoros",
        CG: "Congo",
        KP: "North Korea",
        KR: "South Korea",
        CR: "Costa Rica",
        CI: "Ivory Coast",
        HR: "Croatia",
        CU: "Cuba",
        DK: "Denmark",
        DJ: "Djibouti",
        DM: "Dominica",
        EG: "Egypt",
        AE: "United Arab Emirates",
        EC: "Ecuador",
        ER: "Eritrea",
        ES: "Spain",
        EE: "Estonia",
        SZ: "Eswatini",
        FJ: "Fiji",
        FI: "Finland",
        FR: "France",
        GA: "Gabon",
        GM: "Gambia",
        GE: "Georgia",
        GH: "Ghana",
        GI: "Gibraltar",
        GR: "Greece",
        GD: "Grenada",
        GL: "Greenland",
        GT: "Guatemala",
        GN: "Guinea",
        GQ: "Equatorial Guinea",
        GW: "Guinea-Bissau",
        GY: "Guyana",
        HT: "Haiti",
        HN: "Honduras",
        HU: "Hungary",
        IN: "India",
        ID: "Indonesia",
        IQ: "Iraq",
        IR: "Iran",
        IE: "Ireland",
        IS: "Iceland",
        IL: "Israel",
        IT: "Italy",
        JM: "Jamaica",
        JP: "Japan",
        JO: "Jordan",
        KZ: "Kazakhstan",
        KE: "Kenya",
        KG: "Kyrgyzstan",
        KI: "Kiribati",
        KW: "Kuwait",
        LA: "Laos",
        LS: "Lesotho",
        LV: "Latvia",
        LB: "Lebanon",
        LR: "Liberia",
        LY: "Libya",
        LI: "Liechtenstein",
        LT: "Lithuania",
        LU: "Luxembourg",
        MK: "North Macedonia",
        MG: "Madagascar",
        MY: "Malaysia",
        MW: "Malawi",
        MV: "Maldives",
        ML: "Mali",
        MT: "Malta",
        MA: "Morocco",
        MH: "Marshall Islands",
        MU: "Mauritius",
        MR: "Mauritania",
        MX: "Mexico",
        FM: "Micronesia",
        MD: "Moldova",
        MC: "Monaco",
        MN: "Mongolia",
        ME: "Montenegro",
        MZ: "Mozambique",
        NA: "Namibia",
        NR: "Nauru",
        NP: "Nepal",
        NI: "Nicaragua",
        NE: "Niger",
        NG: "Nigeria",
        NO: "Norway",
        NZ: "New Zealand",
        OM: "Oman",
        UG: "Uganda",
        UZ: "Uzbekistan",
        PK: "Pakistan",
        PW: "Palau",
        PA: "Panama",
        PG: "Papua New Guinea",
        PY: "Paraguay",
        NL: "Netherlands",
        PH: "Philippines",
        PL: "Poland",
        PT: "Portugal",
        QA: "Qatar",
        RO: "Romania",
        GB: "United Kingdom",
        RU: "Russia",
        RW: "Rwanda",
        KN: "Saint Kitts and Nevis",
        SM: "San Marino",
        VC: "Saint Vincent and the Grenadines",
        LC: "Saint Lucia",
        SV: "El Salvador",
        WS: "Samoa",
        ST: "Sao Tome and Principe",
        SN: "Senegal",
        RS: "Serbia",
        SC: "Seychelles",
        SL: "Sierra Leone",
        SG: "Singapore",
        SK: "Slovakia",
        SI: "Slovenia",
        SO: "Somalia",
        SD: "Sudan",
        SS: "South Sudan",
        LK: "Sri Lanka",
        SE: "Sweden",
        CH: "Switzerland",
        SR: "Suriname",
        SY: "Syria",
        TJ: "Tajikistan",
        TZ: "Tanzania",
        TD: "Chad",
        CZ: "Czech Republic",
        TH: "Thailand",
        TL: "Timor-Leste",
        TG: "Togo",
        TO: "Tonga",
        TT: "Trinidad and Tobago",
        TN: "Tunisia",
        TM: "Turkmenistan",
        TR: "Turkey",
        TV: "Tuvalu",
        UA: "Ukraine",
        UY: "Uruguay",
        VU: "Vanuatu",
        VE: "Venezuela",
        VN: "Vietnam",
        YE: "Yemen",
        ZM: "Zambia",
        ZW: "Zimbabwe"
    };
    
    

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
                                            <p>{data?.country_symbol ? countryMapping[data?.country_symbol] : "India"}</p>
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