
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
import Script from 'next/script';
import { log } from "console";

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
	if (window) {
		// window["google-signup"] = (data) => {
		// 	const jwt = data["credential"];


		// 	window.location.href = `/auth/google-sign-in?token=${jwt}`;

		// }

		window["google-signup"] = async (data) => {
			const jwt = data["credential"];

			if (!jwt) {
				toast.error("Google login token missing. Please try again.");
				return;
			}

			try {
				// Attempt login using the Google token
				const response: any = await api.auth.google_login({ body: { token: jwt } });

				if (response && response.success) {
					// Successful login, redirect to jobs page
					router.push("/account/jobs");
				} else {
					// If login failed, redirect to the sign-in page with the token
					toast.error(response.message || "Google login failed. Redirecting to sign-in...");
					// window.location.href = `/auth/google-sign-in?token=${jwt}`;
				}
			} catch (error) {
				// window.location.href = `/auth/google-sign-in?token=${jwt}`;

				console.error("Error during Google login:", error);
			}
		};
	}




	// DONT MODIFY
	function mountScript() {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		document.body.appendChild(script);
	}
	mountScript();

	useEffect(() => {
		window.fbAsyncInit = function () {
			window.FB.init({
				appId: "3789400361309842",
				cookie: true,
				xfbml: true,
				version: "v21.0",
			});
		};

		const loadFBSDK = () => {
			const script = document.createElement("script");
			script.src = "https://connect.facebook.net/en_GB/sdk.js";
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		};

		loadFBSDK();
	}, []);


	// const handleFacebookLogin = () => {
	// 	window.FB.login(
	// 		function (response: any) {

	// 			console.log("Facebook op up response", response)
	// 			if (response.authResponse) {
	// 				// User is logged in, get the access token
	// 				const accessToken = response.authResponse.accessToken;


	// 				// Check for login api

	// 				// Send the access token to the backend
	// 				fetch("http://localhost:4000/user/auth/facebook/callback", {
	// 					method: "POST",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 					},
	// 					body: JSON.stringify({ accessToken }),
	// 				})
	// 					.then((res) => res.json())
	// 					.then((data) => {
	// 						console.log("User data saved to backend:", data);
	// 					})
	// 					.catch((error) => {
	// 						console.error("Error sending access token to backend:", error);
	// 					});
	// 			} else {
	// 				console.log("User cancelled login or did not fully authorize.");
	// 			}
	// 		},
	// 		{ scope: "public_profile,email" }
	// 	);
	// };

	const handleFacebookLogin = async () => {
		window.FB.login(
			async function (response) {
				console.log("Facebook popup response:", response);

				if (response.authResponse) {
					// User is logged in, get the access token
					const accessToken = response.authResponse.accessToken;
					// console.log("accessToken is ", accessToken);


					if (!accessToken) {
						toast.error("Facebook login token missing. Please try again.");
						return;
					}


					await api.auth.facebook_login({ body: { accessToken } });

					// if (response && response.success) {
					// 	router.push("/account/jobs");
					// } else {
					// 	toast.error(response.message || "Facebook login failed. Redirecting to sign-in...");

					// }
				}
				else {
					console.log("User cancelled login or did not fully authorize.");
				}
			},
			{ scope: "public_profile,email" }
		);
	};



	// App id 1323269679079061
	// App secret ecfa8adec73117a7ddcc620dba72402d



	return (
		<>

			<div id="fb-root"></div>
			{/* <Script async defer src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v21.0&appId=1323269679079061"></Script> */}
			{/* <Script async defer src="https://connect.facebook.net/en_GB/sdk.js"></Script> */}
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


			{/* <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
				<div className="container">
					<h1>My Account</h1>
				</div>
			</section> */}

			<section className="breadcrumb_sec">
				<div className="container">
					<div className="row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="#">Home</a></li>
							<li className="breadcrumb-item active">My account</li>

						</ul>
					</div>
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

						<div className="or-separator">
							<span>OR</span>
							<hr />
						</div>


						<div id="OAUTH_BUTTONS">
							<section id='google-signup'>
								<div id="g_id_onload"
									data-client_id="73873787865-3d7nkcfm4b6f4efji86ar4a9ctss4j94.apps.googleusercontent.com"
									data-context="signup"
									data-ux_mode="popup"
									data-callback="google-signup"
									data-auto_prompt="false">
								</div>

								<div className="g_id_signin"
									data-type="standard"
									data-shape="rectangular"
									data-theme="outline"
									data-text="signup_with"
									data-size="large"
									data-logo_alignment="left">
								</div>
							</section>


							<section className="facebook-login">
								<a href="https://www.facebook.com/" target="_blank" onClick={handleFacebookLogin} ><img src="/img/new-facebook-icon.svg" alt="" /> Continue with Facebook</a>
							</section>
						</div>


						{/* <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">

                              
                                

                            </div>
                            <div className="col-sm-3"></div>
                        </div> */}
						{/* FACEBOOK BUTTON--------------- */}
						{/* <button onClick={handleFacebookLogin}>Contunue with FB</button> */}
						{/* <div onClick={handleFacebookLogin} className="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false"></div> */}

						{/* <button onClick={handleFacebookLogin} style={{ padding: '10px 20px', backgroundColor: '#4267B2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
							Continue with Facebook
						</button> */}


					</div>
				</div>
			</section>
		</>
	);
};

SignIn.ignorePath = true;

export default SignIn;
