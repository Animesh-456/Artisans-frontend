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
		SIREN: "",
		pro_user: 0,
		show_modal: 0,
	});
	const setSign = common.ChangeState(signstate);
	 const BaseURL = "http://localhost:4000/";

	const [disable, setDisable] = useState(false);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);
	const [procust, setprocust] = useState(false);

	useEffect(() => {
		let time = setTimeout(() => {
			setDisable(false);
		}, 3000);
		return () => {
			clearTimeout(time);
		};
	}, [disable]);

	const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (disable) return;
		setDisable(true);
		if (procust == true && signIn.account == "Company") {
			signIn.pro_user = 1
		}

		if (signIn.account == "Individual") {
			signIn.company_name = ""
			signIn.SIREN = ""
			signIn.pro_user = 0
		}

		if (signIn.account == "Company" && procust == false) {
			signIn.company_name = ""
			signIn.SIREN = ""
			signIn.pro_user = 0
		}

		if (modal == true) {
			signIn.show_modal = 1
		}

		if (checkbox == true) {
			console.log("correct call----->");
			api.auth.customer_register({ body: signIn }, (d) => {
				if (storedProject != null) {
					setUser(d.data);
					api.project.get_temp(
							{ body: { project_ids: [storedProject] } },
							(d) => {
								setStoredProject(null);
							},
						);
					router.push("/account/jobs");
				} else {
					const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({email_username:signIn.email, password: signIn.password}),
					};
					fetch(`${BaseURL}user/auth/login`, requestOptions)
					.then((response) => response.json())
					.then((d) => {
						if (d.status) {
						toast.success(d.message);
						writeAtom(atom.storage.user, d.data);
						localStorage.setItem("UserData", JSON.stringify(d.data));

						writeAtom(atom.storage.loginmodal, true)
						router.push("/auth/success")	

						} else {
						toast.error(d.message);
						}
					});
				
			}
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

	return (
		<div>
			{/* <div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/login_bg.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>Create your account</h1>
						</div>
					</div>
				</div>
			</div> */}
			<div className='container sign_wrapper'>
				<div className='row'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<div className='register_c'>
							<h3>{signIn.account == "Company" && procust==true ? "Register as a PRO Customer" : "Register as a Customer"}</h3>
							<form onSubmit={handleSumbit}>
								<h4>Please Provide Your Information Below:</h4>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Type of Account<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<select
											name='account'
											onChange={setSign("account")}
											value={signIn.account}>
											<option value='Individual'>Individual</option>
											<option value='Company'>Company</option>
										</select>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											First Name<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text'
											name='name'
											type='text'
											value={signIn.name}
											autoComplete={"off"}
											onChange={setSign("name")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Last Name <span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text'
											name='surname'
											type='text'
											value={signIn.surname}
											autoComplete={"off"}
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
													value={signIn.SIREN}
													autoComplete={"off"}
													onChange={setSign("SIREN")} />
												
											</div>
										</div>
									</>
								) : (<></>)}
								<hr />
								<h4>Contact Information</h4>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Username <span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											autoComplete={"off"}
											className='text'
											name='user_name'
											type='text'
											value={signIn.user_name}
											onChange={setSign("user_name")}
										/>
										<small>
											Choose a Username to represent you on www.artisans.studio. It can
											not be changed later.
										</small>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Email Address <span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text m_b_none'
											name='email'
											type='text'
											autoComplete={"off"}
											value={signIn.email}
											onChange={setSign("email")}
										/>
										<small>
											Your email address will not be shared.{" "}
											<a href={'/account/privacy'}>Privacy policy</a>
										</small>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Create Password<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text'
											name='password'
											type='password'
											autoComplete={"off"}
											value={signIn.password}
											onChange={setSign("password")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Confirm Password<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text'
											name='confirm_password'
											autoComplete={"off"}
											type='password'
											value={signIn.confirm_password}
											onChange={setSign("confirm_password")}
										/>
									</div>
								</div>
									{signIn.account == "Company" && show ? (<Modal show={true} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Modal heading</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<p className="tgs">A Pro to Pro relationship with privileged access to the best machinists. Usineur Pro is free and accessible at no additional cost to professional customers.</p>
										<div className="form-check">
											<label className="form-check-label">
												<input type="checkbox" className="form-check-input" value="option" onClick={modalcheck}></input>Don't show me again
											</label>
										</div>
									</Modal.Body>
									<Modal.Footer className="oksign2">
										<Button className="oksign1" variant="secondary" onClick={handleClose}>
											Not now
										</Button>
										<Button className="oksign" variant="primary" onClick={handleok}>
											Ok, I sign up
										</Button>
									</Modal.Footer>
								</Modal>) : (<></>)}

								<div className='form-check signcheck'>
									<label className='form-check-label'>
										<input type='checkbox' className='form-check-input' onClick={check} />I have
										read and accept the <a href={'/account/terms'}>terms</a> of of use of
										www.artisans.studio.
									</label>
								</div>
								<br />
								<br />
								<div className='reg-bottom'>
									<button>Cancel</button>
									<button
										type='submit'
										name='submit'
										style={
											disable
												? { backgroundColor: "grey", color: "whitesmoke" }
												: {}
										}>
										Register
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='col-sm-2'></div>
				</div>
			</div>
		</div>
	);
};
CustomerSignIn.ignorePath = true;

export default CustomerSignIn;
