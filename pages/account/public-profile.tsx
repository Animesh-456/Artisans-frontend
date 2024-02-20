import { useAtomValue } from "jotai";
import { CSSProperties } from 'react';

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CountryReponse, ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import moment from "moment";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { useRouter } from "next/router";


let Reviews_data = []
let job_list = []


const EditProfile = () => {
	const router = useRouter();
	const user = useAtomValue(atom.storage.user);
	const list = useAtomValue(atom.project.api.my);
	const opt = useAtomValue(atom.project.api.my_proj_opt);
	const projects = useAtomValue(atom.project.api.my_project);
	const transactions = useAtomValue(atom.auth.api.user_spent);

	const RefLink = (l) => {
		//const router = useRouter();
		localStorage.setItem('items', (l));
		router.replace(l)
	}

	useEffect(() => {
		api.auth.user_spent({ params: {} });
		api.project.my_projects({ params: { ...opt, status: 1 } });
	}, []);

	let avg_rating = 0

	api.project.reviews_list({ params: {} }, (d) => {
		console.log("---->", d)
		Reviews_data = d.data;

	});

	api.auth.projects_count({ params: {} }, (d) => {
		job_list = d.data;

	});

	Reviews_data.forEach(function (curr) {
		avg_rating += curr.rating;

	});


	avg_rating = (avg_rating / Reviews_data?.length);

	avg_rating = Number(avg_rating.toFixed(2));


	const udetails = {
		name: user?.name || "",
		user_name: user?.user_name || "",
		user_rating: user?.user_rating || "",
		user_picture: user?.prof_pic || ""
	}
	return (
		<>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>My Profile</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container cjw'>
				<div className='row'>
					<AccountSideBar />

					<div className='col-sm-8'>
						<div className='profile_box'>
							<div className='overview-head'>
								<figure>
									<img
										src={
											common.get_image(udetails?.user_picture) ||
											"/img/no-images.png"
										}
									/>
								</figure>
								<div>
									<h3>{udetails.name}</h3>
									<p>{udetails.user_name}</p>
									<div className='location_a1'>
										<div className='location_l2'>
											<h5>Feedback</h5>
										</div>
										<div className='location_r2'>
											<p>
												<div
        className="stars"
        style={{ '--rating': avg_rating } as CSSProperties}
      ></div>
												<span>{avg_rating}</span>
											</p>
										</div>
									</div>
									<div className='location_a1'>
										<div className='location_l2'>
											<h5>Jobs Completed</h5>
										</div>
										<div className='location_r2'>
											<p>{transactions.length}</p>
										</div>
									</div>
								</div>
							</div>
								{user?.role_id == 2 ? (
									<>
							<div className='gallery_photo'>
								<h4>Portfolio</h4>
										<div id='demo' className='carousel slide' data-ride='carousel'>
											<div className='carousel-inner'>
												<div className='carousel-item active'>
													<img src='/img/pic4.jpg' />
												</div>
												<div className='carousel-item'>
													<img src='/img/pic5.jpg' />
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
										</div>
									</>
								) : (
									<></>
								)}

							
							<h5>
								Work History
							</h5>
							{projects.length
								? projects?.map((l) => {
									return (
										<div className='project_loop'>
											<h4>

												<a href='#' onClick={() => RefLink(`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`)}>{l?.project_name}</a>

											</h4>
											<p>{l?.visibility} | Open</p>
											<p>
												Posted :{" "}
												{moment(l?.createdAt).format("DD-MMM-YYYY")}
											</p>
										</div>
									);

								})
								: ""}
							{/* <div className='project_loop'>
								<h4>
									<a href='#'>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since
									</a>
								</h4>
								<p>Public | Open</p>
								<p>Posted : 16-Jun,2022</p>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
