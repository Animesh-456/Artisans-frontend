import React from "react";
import Link from "next/link";

type Props = {};

export default function Footer({ }: Props) {
	return (
		<>

			<footer>
				<div className="container">
					<div className="row">
						<div className="col-sm-3">
							<div className="footer_logo">
								<img src={"./img/AartStudio-footer.png"} alt="aartstudio" />
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
								<h4>Hotline : <a href="tel:(+91) 89 815 15 666">+91 8981515666</a></h4>

							</div>
						</div>
						<div className="col-sm-9">
							<div className="footer_information">
								<div className="footer_information1">
									<div><i className="fa fa-phone"></i></div>
									<div>
										<h5>Phone</h5>
										<a href="tel:+89 815-15-666">+91 8981515666</a>
									</div>
								</div>
								<div className="footer_information1">
									<div><i className="fa fa-envelope-open-o"></i></div>
									<div>
										<h5>Email</h5>
										<a href="mailto:Info@aartstudio.in">Info@aartstudio.in</a>
									</div>
								</div>

							</div>
							<hr />
							<div className="quick_wp">
								<div className="quick_left">
									<h3>Company</h3>
									<ul>
										<li><Link href="/">Home</Link></li>
										<li><Link href="/account/about">About Us</Link></li>
										<li><Link href="/artrequest">Custom Artwork Request</Link></li>
										<li><Link href="/artworklisting">Artist & Artisans</Link></li>
										<li><Link href="/page/works">How it Works</Link></li>
										<li><Link href="/account/contact_us">Contact Us</Link></li>
									</ul>
								</div>
								<div className="quick_left">
									<h3>Resources</h3>
									<ul>
										<li><Link href="/auth/sign-in">Join AartStudio</Link></li>
										<li><Link href="/">Get Paid for your work</Link></li>
										<li><Link href="/account/deliveryShipping">Delivery & Shipping</Link></li>
										<li><Link href="/">Blogs</Link></li>
										<li><Link href="/account/assistance">FAQ</Link></li>

									</ul>
								</div>
								<div className="quick_left">
									<h3>Subscribe Newsletter</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
									<div className="footersearch">
										<span className="fa fa-search"></span>
										<input type="email" placeholder="Your Email" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<section className="copyright">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<p>Copyright © <a href="#">Aart Studion</a> 2024. All rights reserved.</p>
						</div>
						<div className="col-sm-6">
							<ul className="top_socialmedia right_icon">
								<li><a href="#"><i className="fa fa-facebook"></i></a></li>
								<li><a href="#"><i className="fa fa-instagram"></i></a></li>
								<li><a href="#"><i className="fa fa-whatsapp"></i></a></li>
								<li><a href="#"><i className="fa fa-youtube-play"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</section>

		</>


	)
}
