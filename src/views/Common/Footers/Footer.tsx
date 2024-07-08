import React from "react";
import Link from "next/link";

type Props = {};

export default function Footer({ }: Props) {
	return (
		// <footer>
		// 	<div classNameName="container">
		// 		<div classNameName="row footer_l">
		// 			<div classNameName="col-sm-3">
		// 				<h4>Artoz</h4>
		// 				<ul>
		// 					<li><a href="#">Home</a></li>
		// 					<li><a href="#">About Us</a></li>
		// 					<li><a href="#">art request </a></li>
		// 					<li><a href="#">artist & artisans </a></li>
		// 					<li><a href="#">Contact us</a></li>
		// 				</ul>
		// 			</div>
		// 			<div classNameName="col-sm-3">
		// 				<h4>Help Center</h4>
		// 				<ul>
		// 					<li><a href="#">Track Your Order</a></li>
		// 					<li><a href="#">The Nook Book</a></li>
		// 					<li><a href="#">Buying Guide</a></li>
		// 					<li><a href="#">Caring For Your Art</a></li>
		// 					<li><a href="#">FAQ Corner</a></li>
		// 				</ul>
		// 			</div>
		// 			<div classNameName="col-sm-3">
		// 				<h4>Chat With us</h4>
		// 				<ul>
		// 					<li>We are always here for you. Chat with us using the Chat bubble on your screen. </li>
		// 					<li>Talk to us on whatsapp : <a href="#">+91-7358792364</a></li>
		// 					<li>Email us - <a href="#">support@nookatyou.com</a></li>
		// 					<li><a href="#">Contact Form</a></li>
		// 				</ul>
		// 			</div>
		// 			<div classNameName="col-sm-3">
		// 				<h4>SUBSCRIBE</h4>
		// 				<p>Be the first to see our latest products, hottest sales and member exclusive discount codes.&nbsp;<strong>Sign up below to get your 10% off coupon</strong></p>
		// 				<form>
		// 					<input type="email" name="email" placeholder="Enter your email" />
		// 						<button><i classNameName="fa fa-envelope-o"></i></button>
		// 				</form>
		// 			</div>
		// 		</div>
		// 		<div classNameName="footer_b">
		// 			<img src="img/logo.png" alt="" />
		// 			<p>&#169;2023 AMOZZA. All Rights Reserved</p>
		// 		</div>
		// 	</div>
		// </footer>
		<footer>
			<div className="container">
				<div className="row">
					<div className="col-sm-3">
						<div className="footer_logo">
							<img src="img/AartStudio-footer.png" alt="" />
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
							<h4>Hotline : <a href="tel:(+62) 111 33 231">(+62) 111 33 231</a></h4>
						</div>
					</div>
					<div className="col-sm-9">
						<div className="footer_information">
							<div className="footer_information1">
								<div><i className="fa fa-phone"></i></div>
								<div>
									<h5>Phone</h5>
									<a href="tel:+62 478-2240-190">+62 478-2240-190</a>
								</div>
							</div>
							<div className="footer_information1">
								<div><i className="fa fa-envelope-open-o"></i></div>
								<div>
									<h5>Email</h5>
									<a href="mail:+info@aartstudio.com">info@aartstudio.com</a>
								</div>
							</div>
							<div className="footer_information1">
								<div><i className="fa fa-map-marker"></i></div>
								<div>
									<h5>Location</h5>
									<small>Kapten Japa West ST. 1190 DPS, Bali</small>
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
									<li><Link href="/job/post">Custom Artwork Request</Link></li>
									<li><Link href="/machining/listing">Artist & Artisans</Link></li>
									<li><Link href="/page/works">How it Works</Link></li>
									<li><Link href="/account/contact_us">Contact Us</Link></li>
								</ul>
							</div>
							<div className="quick_left">
								<h3>Resources</h3>
								<ul>
									<li><Link href="/auth/sign-in">Join AartStudio</Link></li>
									<li><Link href="/">Get Paid for your work</Link></li>
									<li><Link href="/">Delivery & Shipping</Link></li>
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
	)
}
