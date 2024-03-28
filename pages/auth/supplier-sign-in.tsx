import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { writeAtom } from "jotai-nexus";
import { toast } from "react-hot-toast";

type Props = {};

const CustomerSignIn = (props: Props) => {
	const router = useRouter();
	const [user, setUser] = useAtom(atom.storage.user);

	const [signIn, signstate] = useState({
		role: 2,
		check: false,
		user_name: "",
		email: router?.query?.email || "",
		password: "",
		password_confirmation: "",
		name: "",
		surname: "",
		address1: "",
		zcode: "",
		city: "",
		company_name: "",
		company_number: "",
		Squestion: "What is your pet's name?",
		answer: "",
	});
	const setSign = common.ChangeState(signstate);
		 const BaseURL = "http://localhost:4000/";

	const [disable, setDisable] = useState(false);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);

	useEffect(() => {
		console.log("hello first time", disable);

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
		api.auth.supplier_register({ body: signIn }, (d) => {
			if (storedProject != null) {
				setUser(d.data);
				router.push("/account/jobs").then(() => {
					api.project.get_temp(
						{ body: { project_ids: [storedProject] } },
						(d) => {
							setStoredProject(null);
						          router.push("/auth/suppliersuccess");

						},
					);
				});
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
						router.push("/auth/suppliersuccess")	

						} else {
						toast.error(d.message);
						}
					});
				
			}
		});
	};

	return (
		<>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(./img/login_bg.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>Create your account</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container sign_wrapper'>
				<div className='row'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<div className='register_c'>
							<h3>Register as artist</h3>
							<form onSubmit={handleSumbit}>
								<h4>Please Provide Your Information Below:</h4>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Username<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='uname'
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
											Email Address<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='email'
											type='text'
											value={signIn.email}
											onChange={setSign("email")}
										/>
										<small>
											We respect your privacy. <a href='/account/privacy'>Privacy policy</a>
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
											name='password'
											type='password'
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
											name='ConfirmPassword'
											type='password'
											autoComplete={"off"}
											value={signIn.password_confirmation}
											onChange={setSign("password_confirmation")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Secret Question<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<select name='Squestion'>
											<option value='pet'>What is your pet's name?</option>
											<option value='f_name'>Name of your father</option>
											<option value='mobile_no'>
												Name of your first school
											</option>
										</select>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Secret Answer<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='ans'
											type='text'
											autoComplete={"off"}
											value={signIn.answer}
											onChange={setSign("answer")}
										/>
									</div>
								</div>
								<hr />
								<h4>Contact Information</h4>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											First Name <span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											className='text'
											name='username'
											type='text'
											autoComplete={"off"}
											value={signIn.name}
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
											name='lname'
											type='text'
											autoComplete={"off"}
											value={signIn.surname}
											onChange={setSign("surname")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Address<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<textarea
											name='address1'
											cols={20}
											rows={5}
											autoComplete={"off"}
											value={signIn.address1}
											onChange={setSign("address1")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											Post Code<span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='zcode'
											type='text'
											autoComplete={"off"}
											value={signIn.zcode}
											onChange={setSign("zcode")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>
											City <span>*</span>
										</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='city'
											type='text'
											autoComplete={"off"}
											value={signIn.city}
											onChange={setSign("city")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>Company Name</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='cname'
											type='text'
											autoComplete={"off"}
											value={signIn.company_name}
											onChange={setSign("company_name")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4'>
										<label>Company Registration Number</label>
									</div>
									<div className='col-sm-8'>
										<input
											name='cno'
											type='text'
											autoComplete={"off"}
											value={signIn.company_number}
											onChange={setSign("company_number")}
										/>
									</div>
								</div>
								<br />
								<div className='form-check'>
									<label className='form-check-label qwe90'>
										<input type='checkbox' className='form-check-input' />
										<span>*</span>I have read and accept the{" "}
										<a href='#'>terms</a> of of use of www.artisans.studio
									</label>
								</div>
								<div className='form-check'>
									<label className='form-check-label qwe90'>
										<input type='checkbox' className='form-check-input' />
										<span>*</span>I agree to receive all payments from
										www.artisans.studio.uk clients using the www.artisans.studio
										Payment System. I understand that my account can be closed
										if I request or receive payments from www.artisans.studio
										clients using another payment system.
									</label>
								</div>
								<br />
								<br />
								<div className='reg-bottom'>
									<button type='submit' name='submit'>
										Cancel
									</button>
									<button type='submit' name='submit'>
										Register
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='col-sm-2'></div>
				</div>
			</div>
		</>
	);
};

CustomerSignIn.ignorePath = true;

export default CustomerSignIn;
