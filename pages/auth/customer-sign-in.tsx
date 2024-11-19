import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-hot-toast";
import { writeAtom } from "jotai-nexus";
import Form from 'react-bootstrap/Form';
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import { Validate } from "../../src/validation/utils/test";
import schema from "../../src/validation/schema/schema";


type Props = {};

const CustomerSignIn = (props: Props) => {
	const router = useRouter();

	const [user, setUser] = useAtom(atom.storage.user);
	const [signIn, signstate] = useState({
		role: 1,
		check: false,
		email: router?.query?.email || "",
		account: "Individual",
		name: "",
		surname: "",
		user_name: "",
		password: "",
		confirm_password: "",
		company_name: "",
		company_number: "",
		siren: "",
		pro_user: 0,
		show_modal: 0,
		mobile_number: ""

	});
	const setSign = common.ChangeState(signstate);
	// const BaseURL = "http://localhost:4000/";
	const BaseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`;
	const [disable, setDisable] = useState(false);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);
	const [procust, setprocust] = useState(false);
	const [open, setOpen] = useAtom(atom.modal.confirm_project);
	const [otp, setotp] = useState("");
	const [visiblity, setvisibility] = useState(true);
	const [optsendbutton, setoptsendbutton] = useState(true)
	const [verifybutton, setverifybutton] = useState(true)


	const [timeLeft, setTimeLeft] = useState(60); // Countdown starting from 60 seconds
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	useEffect(() => {
		let time = setTimeout(() => {
			setDisable(false);
		}, 3000);
		return () => {
			clearTimeout(time);
		};
	}, [disable]);

	const handleSumbit = () => {
		// e.preventDefault();
		if (disable) return;

		if (signIn.mobile_number.length > 10 || signIn.mobile_number.length < 10) return toast.error("Mobile number should be of 10 digits");
		if (!checkbox) {
			toast.error("Please accept the terms")
			return
		};
		setDisable(true);
		// if (procust == true && signIn.account == "Company") {
		// 	signIn.pro_user = 1
		// }

		// if (signIn.account == "Individual") {
		// 	signIn.company_name = ""
		// 	signIn.SIREN = ""
		// 	signIn.pro_user = 0
		// }

		// if (signIn.account == "Company" && procust == false) {
		// 	signIn.company_name = ""
		// 	signIn.SIREN = ""
		// 	signIn.pro_user = 0
		// }

		// if (modal == true) {
		// 	signIn.show_modal = 1
		// }

		if (checkbox == true) {

			api.auth.customer_register({ body: signIn }, (d) => {
				// if (storedProject != null) {
				// 	setUser(d.data);
				// 	api.project.get_temp(
				// 		{ body: { project_ids: [storedProject] } },
				// 		(d) => {
				// 			setStoredProject(null);
				// 		},
				// 	);
				// 	router.push("/auth/success");
				// } else {
				// 	const requestOptions = {
				// 		method: "POST",
				// 		headers: { "Content-Type": "application/json" },
				// 		body: JSON.stringify({ email_username: signIn.email, password: signIn.password }),
				// 	};
				// 	fetch(`${BaseURL}user/auth/login`, requestOptions)
				// 		.then((response) => response.json())
				// 		.then((d) => {
				// 			if (d.status) {
				// 				toast.success(d.message);
				// 				writeAtom(atom.storage.user, d.data);
				// 				localStorage.setItem("UserData", JSON.stringify(d.data));

				// 				writeAtom(atom.storage.loginmodal, true)
				// 				router.push("/auth/success")

				// 			} else {
				// 				toast.error(d.message);
				// 			}
				// 		});

				// }

				router.push("/auth/sign-in");

			});
		} else {
			toast.error("Please agree to the terms of use");
		}

	};
	const [show, setShow] = useState(true);
	const [checkbox, setchexbox] = useState(false);

	const check = (event) => {
		if (event.target.checked) {
			setchexbox(true)
		} else if (!event.target.checked) {
			setchexbox(false)
		}
	}

	const handleClose = () => {
		setShow(false);
		setprocust(false);
	}
	const handleShow = () => setShow(true);

	const handleok = () => {
		setShow(false);
		signstate(signIn)
		setprocust(true);
	}



	useEffect(() => {
		if (signIn.account == "Individual") {
			setShow(true)
		}
	})

	const [modal, setmodal] = useState(false)

	const modalcheck = (event) => {
		if (event.target.checked) {
			setmodal(true)
		} else {
			setmodal(false)
		}
	}

	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;

		if (isTimerRunning && timeLeft > 0) {
			timerId = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setIsTimerRunning(false);
			setvisibility(true);
			// Stop the timer when it reaches 0
		}

		// Cleanup function
		return () => {
			if (timerId) {
				clearInterval(timerId);
			}
		};
	}, [isTimerRunning, timeLeft]);

	const startRegister = async (event) => {
		event.preventDefault();


		let data = Validate([], schema.auth.customer_register, signIn)
		if (!data) return;
		if (signIn.mobile_number.length > 10 || signIn.mobile_number.length < 10) return toast.error("Mobile number should be of 10 digits");
		if (!checkbox) {
			toast.error("Please accept the terms")
			return
		};
		try {
			const data = { body: { phoneNumber: signIn.mobile_number, email: signIn.email, user_name: signIn.user_name } };
			const response = await api.auth.register_mobileOtp(data);
			if (response.status) {
				toast.success("OTP sent successfully");
				setOpen(true);
				setvisibility(false);
				setIsTimerRunning(true);
				setTimeLeft(60);
			} else {
				toast.error("Error sending OTP: " + response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Unknown error, check logs");
		}
		// setOpen(true);

	};


	const verifyOTP = async (event) => {
		event.preventDefault();

		try {
			// Replace `otp` and `phoneNumber` with actual values from state or input fields
			const response: any = await api.auth.registerverify_mobileOtp({
				body: {
					code: otp,
					phoneNumber: signIn.mobile_number
				}
			});

			if (response.status) {
				toast.success("OTP verified successfully");

				handleSumbit();
				// Perform actions upon successful verification, such as redirecting or opening a modal
				setOpen(false); // Close OTP modal on success
			} else {
				toast.error("OTP verification failed: " + response.message);
			}
		} catch (error) {
			console.error("Error verifying OTP:", error);
			toast.error(error?.message || "Unknown error, check logs");
		}
	};

	const resendOtp = async () => {
		setotp("")

		//  Call api to send otp to mobile number
		// api.auth.send_mobileOtp(
		//     { params: {}, body: { phoneNumber: mobile } },
		//     (d) => {
		//         if (d?.status === true) {
		//             setvisibility(true);
		//             setIsTimerRunning(true);
		//             setTimeLeft(60);
		//         }
		//     }
		// );


		console.log("Current phoneNumber value:", signIn.mobile_number);
		try {
			const data = { body: { phoneNumber: signIn.mobile_number } };
			const response = await api.auth.register_mobileOtp(data);
			if (response.status) {
				toast.success("OTP sent successfully");
				setOpen(true);
				setvisibility(false);
				setIsTimerRunning(true);
				setTimeLeft(60);
			} else {
				toast.error("Error sending OTP: " + response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Unknown error, check logs");
		}
	}

	return (

		<>

			{/* <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
				<div className="container">
					<h1>Create Your Account</h1>
				</div>
			</section> */}

			<section className="breadcrumb_sec">
				<div className="container">
					<div className="row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href={"/"}>Home</a></li>
							<li className="breadcrumb-item active">Customer Register</li>


						</ul>
					</div>
				</div>
			</section>

			<section className="myproject">
				<div className="container">
					<div className="row justify-content-center">
						<div className="offset-sm-2"></div>
						<div className="col-sm-8 profile_box">
							<div className="register_c">
								<h3>{signIn.account == "Company" && procust == true ? "Register as a PRO Customer" : "Register as a Customer"}</h3>
								<form>
									<h4>Please Provide Your Information Below:</h4>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Type of Account <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<select
												name='account'
												onChange={setSign("account")}
												value={signIn.account}>
												<option value='Individual'>Individual</option>
												{/* <option value='Company'>Company</option> */}
											</select>
										</div>
									</div>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>First Name <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="name" type="text" placeholder="First Name"
												value={signIn.name}
												autoComplete="given-name"
												onChange={setSign("name")}
											/>
										</div>
									</div>
									<div className="row from_feild cont11">
										<div className="col-sm-4">
											<label>Last Name <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="surname" type="text" placeholder="Last Name"
												value={signIn.surname}
												autoComplete="family-name"
												onChange={setSign("surname")}
											/>
										</div>
									</div>
									{signIn.account == "Company" && procust == true ? (
										<><div className='row'>
											<div className='col-sm-4'>
												<label>
													Company Name <span>*</span>
												</label>
											</div>
											<div className='col-sm-8'>
												<input
													className='text'
													name='surname'
													type='text'
													value={signIn.company_name}
													autoComplete={"off"}
													onChange={setSign("company_name")} />
											</div>
										</div><div className='row'>
												<div className='col-sm-4'>
													<label>
														SIREN <span>*</span>
													</label>
												</div>

												<div className='col-sm-8'>
													<input
														className='text'
														name='surname'
														type='text'
														value={signIn.siren}
														autoComplete={"off"}
														onChange={setSign("siren")} />

												</div>
											</div>
										</>
									) : (<></>)}
									<hr />
									<h4>Contact Information</h4>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Username <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="user_name" type="text" autoComplete={"username"} placeholder="Username"
												value={signIn.user_name}
												onChange={setSign("user_name")}
											/>
											<small>Choose a Username to represent you on Aart Studio. It can not be changed later.</small>
										</div>
									</div>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Email Address <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text m_b_none" name="email" type="text" placeholder="Email Address"
												autoComplete={"email"}
												value={signIn.email}
												onChange={setSign("email")}
											/>
											<small>Your email address will not be shared.
											</small>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Number<span>*</span>
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='mobile_number'
												type='text'
												autoComplete={"tel"}
												value={signIn.mobile_number}
												onChange={setSign("mobile_number")}

												placeholder="+91 XXXXXXX890"
											/>

											<small>Your One-Time Password will be sent to the registered mobile number.
											</small>

										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>Company Name</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='company'
												type='text'
												autoComplete="organization"
												value={signIn.company_name}
												onChange={setSign("company_name")}
												placeholder="Company Name"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>GST Number</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='cno'
												type='text'
												autoComplete={"off"}
												value={signIn.company_number}
												onChange={setSign("company_number")}
												placeholder="Company Registration Number"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>PAN Number</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='cno'
												type='text'
												autoComplete={"off"}
												value={signIn.siren}
												onChange={setSign("siren")}
												placeholder="PAN Number"
											/>
										</div>
									</div>


									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Create Password <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="password" type="password" placeholder="Create Password"
												autoComplete={""}
												value={signIn.password}
												onChange={setSign("password")}
											/>
										</div>
									</div>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Confirm Password <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="confirm_password" autoComplete={"off"}
												type='password'
												value={signIn.confirm_password}
												onChange={setSign("confirm_password")} placeholder="Confirm Password"
											/>
										</div>
									</div>
									<div className="form-check signcheck">
										<label className="form-check-label">
											<input type="checkbox" className="form-check-input" onClick={check} />I have read and accept the <a href={'/account/terms'}>terms</a> of of use of Aart Studio </label>
									</div>
									<br />
									<br />
									<div className="reg-bottom">
										<button type="submit" name="submit" style={
											!visiblity
												? { backgroundColor: "grey", color: "whitesmoke" }
												: {}
										} disabled={!visiblity} onClick={startRegister}>Register</button>
										<button className="canl" onClick={(event) => {
											event.preventDefault();
											window.location.href = '/auth/sign-in';
										}}>Cancel <img src={"../img/arrow.png"} width="11px" alt="" /></button>									</div>
								</form>
							</div>
						</div>
					</div>


					<GlobalModal
						title='Verify Your OTP'
						atom={atom.modal.confirm_project}>

						<div className="modal-body modal_design">

							<div className="from_feild">
								<label>Enter OTP: <span>*</span></label>
								<input type="text" name="text" placeholder="OTP" value={otp} onChange={(e) => setotp(e.target.value)} />
							</div>

							<div className="signin_btn">
								<a href="#"
									onClick={verifyOTP}>Verify</a>
							</div>
							{/* <div className="resend_otp">
								<a href="#">Resend OTP</a>
							</div> */}
							<div className="resend_otp">
								{isTimerRunning ? (<a href="#">Resend OTP in {timeLeft}s</a>) : (<a href="#" onClick={resendOtp}>Resend OTP</a>)}
							</div>

							<div className="button_s ">
								{/* <a style={{ cursor: "pointer", color: "#080424" }} onClick={() => setOpen(false)}>Back <img className="image101" src={"../img/arrow.png"} width="11px" alt="" /></a> */}
								{/* <a style={{ cursor: "pointer", color: "#fff" }} onSubmit={handleSumbit}>Submit</a> */}
							</div>

						</div>



					</GlobalModal>
				</div>
			</section>

		</>
	);
};
CustomerSignIn.ignorePath = true;

export default CustomerSignIn;
