
import { useAtom, useAtomValue } from "jotai";

import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { Pick } from "../../src/validation/utils/test";
import IndexHeader from "../../src/views/index/IndexHeader";
import { writeAtom } from "jotai-nexus";
import { useRouter } from "next/router";
import Link from "next/link";
type Props = {};
const SignIn = (props: Props) => {

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
	
		api.auth.login(
			{ body: Pick(["email_username", "password"], login) },
			(d) => {
				if (storedProject != null) {
					api.project.get_temp(
						{ body: { project_ids: [storedProject] } },
						(d) => {
							setStoredProject(null);
						},
					);
				}
			},
		);
	};


	return (
		<>
			<section className="sign_wrap" style={{ backgroundImage: `url(./img/wave.png)` }}>

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
			</section>
		</>
	);
};

SignIn.ignorePath = true;

export default SignIn;
