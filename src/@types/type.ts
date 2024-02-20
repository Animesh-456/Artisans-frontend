export interface GetParams {
	params?: any;
	[key: string]: any;
}
export interface PostParams {
	params?: any;
	body?: any;
	[key: string]: any;
}

export interface UploadParams {
	params?: any;
	body?: any;
	file?: any;
	[key: string]: any;
}

export interface GetResponse {
	(d: { status?: any; message?: any; data?: any }): any;
}

export interface ProjectResponse {
	id: 378;
	[key: string]: any;
	project_name: "New Project";
	project_image: null;
	created: null;
	enddate: null;
	description: "test Comment";
	project_status: "0";
	visibility: "public";
	project_post_date: "2022-09-08";
	post_for: "1663311858";
	bids_count: 2;
	project_images: [
		{
			id: 2126;
			project_id: 378;
			project_name: "New Project";
			project_post_date: "2022-09-08";
			cust_id: 17257;
			sup_id: 0;
			attach_file: "166262065841617257.png";
			upload_date: "0000-00-00";
			approved: 0;
			country_code: 0;
			adminApprove: 0;
		},
		{
			id: 2125;
			project_id: 378;
			project_name: "New Project";
			project_post_date: "2022-09-08";
			cust_id: 17257;
			sup_id: 0;
			attach_file: "166262065841617257.png";
			upload_date: "0000-00-00";
			approved: 0;
			country_code: 0;
			adminApprove: 0;
		},
	];
	creator: {
		email: "test1@gmail.com";
		user_name: "harshuu";
	};
	reviews: [
		{
			id: 139,
			comments: "Tout est ok.",
			rating: 5,
			// "provider_rate1": 5,
			// "provider_rate2": 5,
			// "provider_rate3": 5,
			// "provider_rate4": 5,
			// "provider_rate5": 0,
			// "provider_rate6": 0,
			// "provider_rating_avg": 5,
			// "emp_rate1": 0,
			// "emp_rate2": 0,
			// "emp_rate3": 0,
			// "emp_rate4": 0,
			// "emp_rate5": 0,
			// "emp_rate6": 0,
			// "emp_rating_avg": 0,
			// "review_time": 1392321722,
			// "review_post_date": "0000-00-00 00:00:00",
			// "review_type": "",
			// "project_id": 427,
			// "buyer_id": 239,
			// "provider_id": 65,
			// "hold": "",
			// "buyer_status": "Submitted",
			// "provider_status": "",
			// "country_code": 1
		}
	];
	transaction: [
		{
			"amount": 100,
			"amount_gbp": 100
		}
	]
}

export interface ProjectDetails {
	id: 398;
	project_name: "asdgsadg";
	project_status: "0";
	buyer_complete_status: null;
	provider_complete_status: null;
	description: "asdgsad";
	expedition_day: null;
	expedition_day2: null;
	track_number: null;
	additional_description: null;
	project_image: null;
	project_categories: null;
	project_start: null;
	visibility: "public";
	start_bid: null;
	budget_min: 0;
	budget_max: 0;
	is_feature: null;
	is_urgent: null;
	is_hide_bids: null;
	creator_id: 17255;
	created: null;
	enddate: null;
	programmer_id: null;
	bid_select_date: null;
	unpaid_project_notify_date: null;
	checkstamp: null;
	buyer_rated: null;
	provider_rated: null;
	project_paid: null;
	project_award_date: null;
	project_award_date_format: null;
	project_fund_date_format: null;
	fund_release_date: null;
	notification_status: 0;
	attachment_url: null;
	image: null;
	first_upload: null;
	attachment_name: null;
	attachment_folder: null;
	is_private: 0;
	private_users: null;
	contact: null;
	salary: null;
	flag: 1;
	salarytype: null;
	escrow_due: null;
	city: null;
	zipcode: null;
	post_for: "1665990234";
	project_post_format_date: null;
	project_post_date: "2022-10-13";
	project_expiry_date: null;
	expired_notification_sent: "N";
	fund_notification_sent: "N";
	unpaid_project_notif: null;
	site_fr: 0;
	site_uk: 0;
	site_it: 0;
	country_code: 2;
	pro_job: 0;
	createdAt: "2022-10-13 12:33:54";
	updatedAt: "2022-10-13 12:33:54";
	bids_count: 2;
	project_images: [
		{
			id: 2233;
			project_id: 398;
			project_name: "asdgsadg";
			project_post_date: "2022-10-13";
			cust_id: 17255;
			sup_id: 0;
			attach_file: "Scr166564463480317255.png";
			upload_date: "0000-00-00";
			approved: 0;
			country_code: 0;
			adminApprove: 0;
		},
	];
	bids: [
		{
			id: 62204;
			project_id: 398;
			user_id: 17258;
			bid_days: 18;
			bid_hours: null;
			bid_file: null;
			bid_amount: 16;
			bid_amount_gbp: 20;
			bid_time: any;
			bid_desc: "asdgasdg";
			lowbid_notify: null;
			escrow_flag: null;
			no_offer: null;
			user: {
				email: "azeez@dqotsolutions.com";
				user_name: "test_supplier";
				pro_vat: any;
				pro_user: null;
				prof_pic: '';
				logo:'';
			};
		},
	];
	creator: {
		email: "test1@gmail.com";
		user_name: "harshuuuuuuuuuu";
	};
	programmer: {
		email: "fantasysquad.in@gmail.com";
		user_name: "test_supplier_2";
	};
	prebid_messages: [
		{
			id: 120621;
			project_id: 398;
			reply_for: null;
			from_id: 17260;
			to_id: 17255;
			buyer_message_status: null;
			programmer_message_status: null;
			provider_delete_status: null;
			buyer_delete_status: null;
			message: "asdgsdg";
			created: null;
			notification_status: "0";
			deluserid: null;
			attach_file: null;
			msg_type: "Q";
			createdAt: "2022-10-13 15:07:01";
			updatedAt: "2022-10-13 15:07:01";
			from: {
				email: "test_machinist@mail.com";
				user_name: "test_supplier_3";
			};
			reply: [
				{
					id: 120622;
					project_id: 398;
					reply_for: 120621;
					from_id: 17255;
					to_id: 17260;
					buyer_message_status: null;
					programmer_message_status: null;
					provider_delete_status: null;
					buyer_delete_status: null;
					message: "asgsdg";
					created: null;
					notification_status: "0";
					deluserid: null;
					attach_file: null;
					msg_type: "A";
					createdAt: "2022-10-13 15:07:09";
					updatedAt: "2022-10-13 15:07:09";
					from: {
						email: "test1@gmail.com";
						user_name: "harshuuuuuuuuuu";
					};
				},
				{
					id: 120623;
					project_id: 398;
					reply_for: 120621;
					from_id: 17255;
					to_id: 17260;
					buyer_message_status: null;
					programmer_message_status: null;
					provider_delete_status: null;
					buyer_delete_status: null;
					message: "asdgsaggsd";
					created: null;
					notification_status: "0";
					deluserid: null;
					attach_file: null;
					msg_type: "A";
					createdAt: "2022-10-13 16:00:01";
					updatedAt: "2022-10-13 16:00:01";
					from: {
						email: "test1@gmail.com";
						user_name: "harshuuuuuuuuuu";
					};
				},
			];
		},
	];
}

export interface UserDetails {
	id: 17256;
	refid: "0";
	country_code: null;
	user_name: "debraj_145678";
	name: "Debraj";
	surname: "Jhunsinfotech";
	address1: null;
	address2: null;
	description: null;
	company_name: null;
	company_number: null;
	role_id: 1;
	email: "debraj@jhuninfotech.com";
	paypal_email: null;
	profile_desc: null;
	service_desc: null;
	voter: null;
	prof_pic: null;
	prot_pic: null;
	pdf_file: null;
	account: "Individual";
	user_status: 0;
	activation_key: null;
	zcode: null;
	Squestion: null;
	answer: null;
	state: null;
	city: null;
	country_symbol: null;
	project_notify: null;
	bid_notify: null;
	message_notify: null;
	rate: null;
	logo: null;
	created: null;
	last_activity: null;
	user_rating: null;
	num_reviews: null;
	rating_hold: null;
	tot_rating: null;
	suspend_status: "0";
	ban_status: "0";
	admin_status: null;
	admin_status_uk: null;
	admin_status_it: null;
	job_fr: null;
	job_uk: null;
	job_it: null;
	choice: null;
	supLogin: null;
	lang: null;
	pro_user: 0;
	pro_vat: null;
	siren: null;
	mailchimp_id: null;
	nxtduedate: null;
	entrepreneur: null;
	bid_status: 1;
	country_code_country: any;
}

export interface CountryReponse {
	id: 237;
	country_symbol: "ZW";
	country_name: "Zimbabwe";
}

export interface MsgReponse {
	id: 61902;
	project_id: 398;
	reply_for: 0;
	from_id: 17258;
	to_id: 17255;
	buyer_message_status: null;
	programmer_message_status: null;
	provider_delete_status: null;
	buyer_delete_status: null;
	message: "dasdg";
	created: 1665662543;
	notification_status: "0";
	deluserid: null;
	attach_file: null;
	approve: null;
}

export interface BidsMsgResponse {
	id: 46862;
	project_id: 398;
	send_from: 17258;
	send_to: 17255;
	msg_box: "adgasdg";
	datetime: "2022-10-17 16:04:58";
	attachment: null;
	approve: null;
}

export interface MyMsgResponse {
	id: 61901;
	project_id: 398;
	reply_for: 0;
	from_id: 17255;
	to_id: 17258;
	buyer_message_status: null;
	programmer_message_status: null;
	provider_delete_status: null;
	buyer_delete_status: null;
	message: "sadgsd";
	created: 1665658162;
	notification_status: "0";
	deluserid: null;
	attach_file: null;
	approve: null;
	project: {
		project_name: "asdgsadg";
	};
	from: {
		email: "test1@gmail.com";
		user_name: "harshuuuuuuuuuu";
	};
	to: {
		email: "azeez@dqotsolutions.com";
		user_name: "test_supplier";
		
	};
}

export interface BalanceResponse{
	id:17490;
	user_id:17265;
	amount: number;
	amount_gbp: number;
}
