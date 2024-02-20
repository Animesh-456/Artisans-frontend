

const SignIn = () => {


	return (
		<>
			<section className="sign_wrap" style={{ backgroundImage: `url(./img/wave.png)` }}>

				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="sign_wp">
								<h3>Sign in</h3>
								<form>
									<div>
										<label>Email or Username</label>
										<input className="text" name="username" type="text" value="" />
									</div>
									<div>
										<label>Password</label>
										<input className="text" name="pwd" type="password" value="" />
									</div>
									<div className="form-check-signin">
										<label className="form-check-label">
											<input type="checkbox" className="form-check-input" />Keep me signed in </label>
									</div>
									<div className="form-terms">
										<a>
											<a href="/auth/forgetpassword">Forgot Password?</a>
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

								<div>
									<div className="form-check-inline">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="1" />I am a customer </label>
									</div>
									<div className="form-check-inline">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="2" />I am a supplier </label>
									</div>
									<br />
									<br />
									<div>
										<label>Email Address</label>
										<input className="text" name="email" type="text" value="" />
									</div>
									<div className="form-terms">
										<a href="/account/terms">Terms Of Service</a>
									</div>
									<div className="yhh5d">
										<input type="Submit" name="submit" value="Sign Up" />
									</div>
								</div>

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
