import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
	BalanceResponse,
	CountryReponse,
	MyMsgResponse,
	ProjectDetails,
	UserDetails,
} from "../@types/type";

// storage atoms
const storage = {
	user: atomWithStorage<UserDetails | any>("user", null),
	project: atomWithStorage("project", null),
	job_tab: atomWithStorage("job_tab", 1),
	all_notif: atomWithStorage("all_notif", []),
	loginmodal: atomWithStorage("loginmodal", false),
	project_id: atomWithStorage("project_id", null),
	project_data: atomWithStorage<ProjectDetails | any>("project_data", null),
	project_status: atomWithStorage("project_state", 1),
	radio_login: atomWithStorage("radio_login", null),
};

// api atoms
const project = {
	api: {
		list: atom([]),
		list_msgs: atom([]),
		list_msg_meta: atom(false),
		my_msgs: atom([]),
		list_bid_msgs: atom([]),
		latest: atom([]),
		allreviews: atom([]),
		all_list: atom([]),
		project_gallery: atom([]),
		steps_completed_supplier: atom([]),
		customer_releasepayment_checkbox: atom([]),
		my_temp: atom(false),
		inbox_count: atom(false),
		get_additional_comment: atom([]),
		list_opt: atom({
			page: 0,
			limit: 10,
			total_pages: 0,
			total_count: 0,
			search: null,
		}),
		gallery_opt: atom({
			page: 0,
			limit: 10,
			total_pages: 0,
			total_count: 0,
			search: null,
		}),
		detail: atom<ProjectDetails | any>(0),
		others: atom(0),

		my: atom([]),
		my_opt: atom({
			page: 0,
			limit: 1000,
			total_pages: 0,
			total_count: 0,
			search: null,
			status: 1,
		}),
		reviews: atom([]),
		my_project: atom([]),

		public_profile_project: atom([]),
		public_profile_finalised_image: atom([]),
		public_me: atom<UserDetails | any>(false),
		total_jobs: atom(false),
		public_user_reviews: atom([]),
		offer_reviews_feedback: atom([]),
		get_art: atom([]),
		get_portfolio_art: atom([]),
		get_category_subcategory: atom([]),
		kyc_details: atom([]),
		commision_rate: atom([]),


		my_proj_opt: atom({
			page: 0,
			limit: 10,
			total_pages: 0,
			total_count: 0,
			search: null,
			status: 1,

		}),
		invoices: atom([]),
		project_finalise_image: atom([]),

		reviewed_projects: atom([]),
		notifs: atom([]),
		project_review: atom([]),
		rev_proj_opt: atom({
			page: 0,
			limit: 10,
			total_pages: 0,
			total_count: 0,
			search: "",
			status: 1,
		}),
	},
};

const auth = {
	api: {
		me: atom<UserDetails | any>(false),
		delivery_contacts: atom<UserDetails | any>(false),
		countries: atom<Array<CountryReponse> | any>([]),
		machanic_details: atom<UserDetails | any>(false),
		user_balance: atom<BalanceResponse | any>(false),
		update_balance: atom<BalanceResponse | any>(false),
		user_projects: atom([]),
		user_spent: atom([])
	},
};

// modal atoms

const modal = {
	project_help: atom(false),
	review_machinist: atom(false),
	create_offer: atom(false),
	slct_mchnst: atom(false),
	art_delete: atom(false),
	confirm_project: atom(false),
	img_viewer: atom(false),
	edit_profile_pic: atom(false),
	paypal_email: atom(false),
	edit_portfolio_pic: atom(false),
	edit_art_modal: atom(false)
};

export default { storage, project, modal, auth };
