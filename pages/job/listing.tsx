




const listing = () => {



	return (
		<>

			<section className="cjw">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="looking_m" style={{ backgroundImage: `url(/img/about-bg.jpg)` }}>

								<h3>Looking for a Artist?</h3>
								<p>Post your request and receive quotes for free.</p>
								<a href="#">Post your request</a>
								<h3>Are you a Artist?</h3>
								<p>Create a profile and start working.</p>
								<a href="#">Sign up</a>
							</div>
						</div>
						<div className="col-sm-8">
							<div className="profile_box machin_req">
								<h3>Artist Requests <span>showing results 1 - 10</span>
								</h3>
								<div className="machin_req_li">
									<div className="award">
										<img src="/img/awarded.png" alt="" />
									</div>
									<div className="machin_req_li_img">
										<img src="/img/pic1.jpg" alt="" />
									</div>
									<div className="machin_req_li_text">
										<h4>
											<a href="projectdetails.html">ZWO EAF Samyang Mount Plate</a>
										</h4>
										<p>
											<span>Posted 2d 20h ago</span>
											<span>End: 5d 3h</span>
											<span>3 Offers</span>
										</p>
										<p>Aluminium, 1 part</p>
										<a href="#" className="qwe5">JASONZ340</a>
									</div>
								</div>
								<div className="machin_req_li">
									<div className="machin_req_li_img">
										<img src="/img/pic2.jpg" alt="" />
									</div>
									<div className="machin_req_li_text">
										<h4>
											<a href="projectdetails.html">ZWO EAF Samyang Mount Plate</a>
										</h4>
										<p>
											<span>Posted 2d 20h ago</span>
											<span>End: 5d 3h</span>
											<span>3 Offers</span>
										</p>
										<p>Aluminium, 1 part</p>
										<a href="#" className="qwe5">JASONZ340</a>
									</div>
								</div>
								<ul className="pagination justify-content-center">
									<li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="fa fa-angle-double-left"></i></a></li>
									<li className="page-item"><a className="page-link" href="javascript:void(0);">1</a></li>
									<li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
									<li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="fa fa-angle-double-right"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

listing.ignorePath = true;

export default listing;