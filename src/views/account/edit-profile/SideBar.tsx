

import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import atom from "../../../jotai/atom";
import Routes from "../../../Routes";
import api from "../../../api/services/api";
import { CSSProperties } from 'react';

type Props = {};
let Reviews_data = []
let job_list = [];

const AccountSideBar = (props: Props) => {
    const router = useRouter();
    const user = useAtomValue(atom.storage.user);
    //const [opt, setOpt] = useAtom(atom.project.api.list_opt);
    //job_list = useAtom(atom.auth.api.total_jobs)

    const annonymoususer = useAtomValue(atom.project.api.public_me)

    let avg_rating = 0;

    if (user) {
        api.project.reviews_list({ params: {} }, (d) => {
            console.log("ghut---->", d)
            Reviews_data = d.data;
        });
    }


    // api.auth.public_profile_api({ params: {} }, (d)=>{
    //   job_list = d.data;
    // })

    if (user) {
        api.auth.projects_count({ params: {} }, (d) => {
            job_list = d.data;
        });
    }




    useEffect(() => {

        if (user) {
            //window.location.reload()
            api.auth.projects_count({ params: {} }, (d) => {
                job_list = d.data;
            });
        } else {
            if (!router.isReady) return;

            const id = router.query.id

            api.project.public_me({ params: { id: id } })

            api.project.public_profile_api({ params: { id: id } })

            api.project.public_user_reviews({ params: { id: id } })

            api.project.public_profile_total_jobs({ params: { id: id } })
        }

    }, [router.isReady])

    const projects = useAtomValue(atom.project.api.total_jobs)


    console.log("annonymous", user?.id)

    //console.log("Job data =======>>>>>>>", job_list)


    console.log("reviews data", Reviews_data)

    Reviews_data.forEach(function (curr) {
        avg_rating += curr.rating;

    });


    avg_rating = (avg_rating / Reviews_data?.length);

    avg_rating = Number(avg_rating.toFixed(2));

    console.log(avg_rating);



    const publicprofile = () => {
        window.location.href = `/account/public-profile/${user?.id}`
    }




    const public_user_reviews = useAtomValue(atom.project.api.public_user_reviews)

    let public_reviews = [];

    let public_avg_rating = 0;

    public_reviews = public_user_reviews;

    public_reviews.forEach(function (curr) {
        public_avg_rating += curr.rating;
    });



    public_avg_rating = (public_avg_rating / public_reviews?.length);

    public_avg_rating = Number(public_avg_rating.toFixed(2));



    console.log("User :- ", user)

    console.log("router path = ", router.pathname)

    return (
        <div className="col-sm-4">
            {user != null ? (
                <div className="sidebar">
                    <h3>My Account</h3>
                    <ul className="side-nav">
                        {Routes.EditProfileSideBar.filter((f) => {
                            return f.role.includes(parseInt(user?.role_id));
                        }).map((d) => {
                            return (
                                <>
                                    <div>
                                        <li className={router.pathname == d.path ? "active" : ""}>
                                            {d.path === "/account/public-profile/[id]" ? (

                                                <Link href={`/account/public-profile/${user?.id}`}>
                                                    <a>{d.title}</a>
                                                </Link>
                                            ) : (
                                                <Link href={d.path}>
                                                    <a>{d.title}</a>
                                                </Link>
                                            )}
                                        </li>
                                    </div>
                                </>
                            );
                        })}
                    </ul>


                </div>
            ) : (<></>)}



            {/* {router.pathname == "/account/jobs" || router.pathname == "/account/inbox" || router.pathname == "/account/edit-profile" || router.pathname == "/account/withdraw" || router.pathname == "/account/reviews" || router.pathname == "/account/invoices" || router.pathname == "/account/change-password" || router.pathname == "/job/listing" ? (
                <></>
            ) : (
                <>
                    <div className="sidebar">
                        <h3>Member Details</h3>

                        <div className="location">
                            <div className="location_l">
                                <h5>Member Since</h5>
                            </div>

                            {user != null && (user?.id == router.query.id || router.pathname == "/account/profile" || router?.pathname == '/machining/msg/[id]/[from_id]/[to_id]' || router.pathname == "/account/Customer-Review") ? (
                                <div className="location_r">
                                    <p>{moment.unix(user?.created).format("DD-MMM,YYYY")}</p>
                                </div>
                            ) : (
                                <div className="location_r">
                                    <p>{moment.unix(annonymoususer?.created).format("DD-MMM,YYYY")}</p>
                                </div>
                            )}

                        </div>
                        {user != null && (user?.id == router.query.id || router.pathname == "/account/profile") ? (

                            <div className="location">
                                <div className="location_l">
                                    <h5>Last Active</h5>
                                </div>
                                <div className="location_r">
                                    <p>{moment(user?.last_seen).format("DD-MMM,YYYY hh:mm A")}</p>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>
                    <div className="sidebar">
                        <h3>Statistics</h3>
                        <div className="location">
                            <div className="location_l">
                                <h5>Jobs</h5>
                            </div>

                            {user != null ? (
                                <div className="location_r">
                                    <p>{job_list?.length}</p>
                                </div>
                            ) : (
                                <div className="location_r">
                                    <p>{projects}</p>
                                </div>
                            )}

                        </div>
                        <div className="location">
                            <div className="location_l">
                                <h5>Feedback</h5>
                            </div>

                            {user != null && router.pathname == "/account/profile" ? (

                                <div className="location_r">
                                    {avg_rating && user?.role_id == 2 ? (
                                        <p>
                                            <div
                                                className="stars"
                                                style={{ '--rating': avg_rating } as CSSProperties}
                                            ></div>
                                            <span>{avg_rating}</span>
                                        </p>
                                    ) : (
                                        <p>
                                            <div
                                                className="stars"
                                                style={{ '--rating': 0.0 } as CSSProperties}
                                            ></div>
                                            <span>0.0</span>
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="location_r">
                                    {public_avg_rating && annonymoususer?.role_id == 2 ? (
                                        <p>
                                            <div
                                                className="stars"
                                                style={{ '--rating': public_avg_rating } as CSSProperties}
                                            > <span className="stats" >{public_avg_rating}</span></div>

                                        </p>
                                    ) : (
                                        <p>
                                            <div
                                                className="stars"
                                                style={{ '--rating': 0.0 } as CSSProperties}
                                            > <span className="stats" >0.0</span></div>

                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )} */}

        </div>
    );
};

AccountSideBar.ignorePath = true;
export default AccountSideBar;