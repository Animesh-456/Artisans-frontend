import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";

const LastJobPictures = () => {
	return (
		<div className='container last_job'>
			<div>
				<h1>last job pictures</h1>
			</div>
			<Swiper
				slidesPerView={1}
				spaceBetween={20}
				loop={true}
				pagination={{
					clickable: true,
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				modules={[Pagination, Autoplay]}
				className='mySwiper'>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic.png' />
						</figure>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic1.png' />
						</figure>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic2.png' />
						</figure>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic.png' />
						</figure>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic1.png' />
						</figure>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='how-wrks-inn'>
						<figure>
							<img src='/img/pic2.png' />
						</figure>
					</div>
				</SwiperSlide>
			</Swiper>

			<div className='all_request_button'>
				<a href='#'>
					Check more pics <i className='fa fa-angle-right' />
				</a>
			</div>
		</div>
	);
};

export default LastJobPictures;
