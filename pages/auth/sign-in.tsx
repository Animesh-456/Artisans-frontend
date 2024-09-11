
import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { Pick } from "../../src/validation/utils/test";
import IndexHeader from "../../src/views/index/IndexHeader";
import { writeAtom } from "jotai-nexus";
import { useRouter } from "next/router";
import Link from "next/link";
import env from "../../src/config/api";
import Head from "next/head";

type Props = {};


export const getStaticProps = async () => {
	try {
		const params: any = {
			id: 25,
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

const SignIn = (prp) => {
	console.log("seo data", prp)

	const radio_login = useAtomValue(atom.storage.radio_login)
	const [check, checkstate] = useState({
		role: radio_login ? 2 : 1,
		email: "",
		check: true,
	});

	const router = useRouter();

	useEffect(() => {
		if (radio_login) {
			writeAtom(atom.storage.radio_login, null)
		}
	}, [!router.isReady])

	const setCheck = common.ChangeState(checkstate);
	const [login, loginstate] = useState({
		email_username: "",
		password: "",
		agreed: false,
	});
	const setlogin = common.ChangeState(loginstate);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);

	const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();


		api.auth.check({ body: check });
	};

	const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		// api.auth.login(
		// 	{ body: Pick(["email_username", "password"], login) },
		// 	(d) => {
		// 		if (storedProject != null) {

		// 			api.project.get_temp(
		// 				{ body: { project_ids: [storedProject] } },
		// 				(d) => {
		// 					setStoredProject(null);
		// 				},
		// 			);
		// 		}
		// 	},
		// );

		api.auth.login(
			{ body: Pick(["email_username", "password"], login) },
			(d) => {
				if (storedProject != null) {
					if (d?.data?.role_id === 1) {

						api.project.get_temp(
							{ body: { project_ids: [storedProject] } },
							(d) => {
								setStoredProject(null);
							},
						);
					} else {
						toast.error("Only customers can post jobs.");
						setStoredProject(null);
					}
				}

				if (d?.data?.role_id === 1) {
					router.push("/account/jobs");
				} else if (d?.data?.role_id === 2) {
					router.push("/account/jobs");
				}
			},
		);
	};


	return (
		<>
			{/* <section className="sign_wrap" style={{ backgroundImage: `url(./img/wave.png)` }}>

				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="sign_wp">
								<h3>Sign in</h3>
								<form onSubmit={handleLogin}>
									<div>
										<label>Email or Username</label>
										<input className="text" name="username" type="text"
											autoComplete='on'
											value={login.email_username}
											onChange={setlogin("email_username")}
										/>
									</div>
									<div>
										<label>Password</label>
										<input className="text" name="pwd" type="password" autoComplete='on'
											value={login.password}
											onChange={setlogin("password")}
										/>
									</div>
									<div className="form-check-signin">
										<label className="form-check-label">
											<input type="checkbox" className="form-check-input" />Keep me signed in </label>
									</div>
									<div className="form-terms">
										<a>
											<a href={"/auth/forgetpassword"}>Forgot Password?</a>
										</a>
									</div>
									<div className="yhh5d">
										<input type="Submit" name="usersLogin" value="Sign in" />
									</div>
								</form>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="sign_wp">
								<h3>Create an account</h3>
								<form onSubmit={handleSumbit}>
									<div>
										<div className="form-check-inline">
											<label className="form-check-label">
												<input type="radio" className="form-check-input" name="optradio" value={1}
													checked={check.role == 1 ? true : false}
													onChange={setCheck("role")}
												/>I am customer </label>
										</div>
										<div className="form-check-inline">
											<label className="form-check-label">
												<input type="radio" className="form-check-input" name="optradio"
													value={2}
													checked={check.role == 2 ? true : false}
													onChange={setCheck("role")}
												/>I am artist </label>
										</div>
										<br />
										<br />
										<div>
											<label>Email Address</label>
											<input className="text" name="email" type="text"
												value={check.email}
												onChange={setCheck("email")}
											/>
										</div>
										<div className="form-terms">
											<a href={"/account/terms"}>Terms Of Service</a>
										</div>
										<div className="yhh5d">
											<input type="Submit" name="submit" value="Sign Up" />
										</div>
									</div>
								</form>

							</div>
						</div>
					</div>
				</div>
			</section> */}


			<Head>
				<title>{`${prp?.prp?.data[0].page_title}`}</title>
				<meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
			</Head>
			<section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
				<div className="container">
					<h1>My Account</h1>
				</div>
			</section>

			<section className="sign_wp" >
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="heading_title">
								<h1>Sign In</h1>
							</div>
							<form onSubmit={handleLogin}>
								<div className="from_feild">
									<label>Email or Username: <span>*</span></label>
									<input type="text" name="text" placeholder="Email or Username"
										autoComplete='on'
										value={login.email_username}
										onChange={setlogin("email_username")}
									/>
								</div>
								<div className="from_feild">
									<label>Password: <span>*</span></label>
									<input type="password" name="password" placeholder="Password" value={login.password}
										onChange={setlogin("password")} />
								</div>
								{/* <div className="from_feild2">
									<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
									<label> &nbsp; Keep me signed in</label>
								</div> */}
								<div className="from_feild1 fff1">
									<a href={"/auth/forgetpassword"}>Forgot Password?</a>
								</div>

								<div className="discover_wp1 signin1">
									{/* <a href="#">Sign In</a> */}
									<input type="Submit" name="usersLogin" value="Sign in" />
								</div>
							</form>
						</div>
						<div className="col-sm-6">
							<div className="heading_title">
								<h1>Create an Account</h1>
							</div>
							<form onSubmit={handleSumbit}>
								<div className="from_feild">
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio"
												value={2}
												checked={check.role == 2 ? true : false}
												onChange={setCheck("role")}
											/>I am an artist
										</label>
									</div>
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value={1}
												checked={check.role == 1 ? true : false}
												onChange={setCheck("role")}
											/>I am an customer
										</label>
									</div>
								</div>
								<div className="from_feild">
									<label>Email Address: <span>*</span></label>
									<input value={check.email}
										onChange={setCheck("email")} type="email" name="text" placeholder="Type here..." />
								</div>
								<div className="from_feild1 fff1">
									<a href={"/account/terms"}>Terms of service</a>
								</div>

								<div className="discover_wp1 signin1">
									{/* <a href="#">Sign Up</a> */}
									<input type="Submit" name="submit" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

SignIn.ignorePath = true;

export default SignIn;
