import axios, {
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from "axios";
import env from "../config/api";
import common from "../helpers/common";
import Router from "next/router";

class Client {
	public BaseURL: string;
	public headers: any;
	public params: any;
	public ignorePaths: any;
	public test: boolean;

	constructor(options: any = {}) {
		this.BaseURL = "http://localhost:4000/";
		this.headers = options.headers || {};
		this.headers["Content-Type"] = "application/json";
		axios.defaults.timeout = 12000;
		this.params = {};
		this.ignorePaths = [
			"auth/login",
			"auth/test",
			"auth/register",
			"auth/generate-new-password",
			"auth/forgot-username",
			"auth/send-mobile-otp",
			"auth/get-otp",
			"auth/verify-mobile-otp",
			"project/list",
			"auth/google-login",
			"auth/register",
			"auth/forgot-password",
			"/public",
			"/send-test-notification",
			"auth/verify-otp",
			"auth/send-otp",
			"project/add-temp",
			"project/detail",
			"project/get-my-temp",
			"project/image-list",
			"project/all-lists",
			"project/project-gallery",
			"project/all-reviews",
			"project/review-proj",

			"project/public-me",
			"project/public-profile-total-jobs",
			"project/public-user-reviews",
			"project/public-profile-api",
			"project/offer-reviews-feedback",
			"project/project_finalise_image",
			"project/get-additional-comment",
			"project/page-details",
			"project/project-detail-seo",
			"project/public-profile-finalised-image",
			"project/paypal-transaction-complete",
			// "project/create-order",
			"project/deposit-fund",
			"project/get-art",



		];

		this.test = false;
	}

	setHeader(key, value) {
		this.headers[key] = value;
		return this;
	}

	setAuth(url) {
		let user: any = localStorage.getItem("user");
		if (user != null && !this.ignorePaths.includes(url)) {
			user = JSON.parse(user);
			this.headers["Authorization"] = "Bearer " + user.token;
		}
	}

	async get(url, params) {
		try {
			this.headers = {};
			this.setAuth(url);

			url = env.base_url + url;
			params = { ...params } || {};

			const response = await axios.get(url, {
				params: params,
				headers: this.headers,
			});
			const status = response.status == 200;

			if (status) {
				if (this.test) {
					common.JSONstringify(response.data);
				}
				return response.data;
			}
		} catch (e) {
			if (e?.response?.status == 401) {
				Router.push("/auth/sign-in");
				localStorage.removeItem("user");
			}
			return e;
		}
	}

	async post(url, body, params) {
		try {
			this.headers = {};
			this.headers["Content-Type"] = "application/json";
			this.setAuth(url);

			url = env.base_url + url;
			console.log(url);
			params = { ...params } || {};
			body = body || {};
			const response = await axios.post(url, body, {
				params: params,
				headers: this.headers,
			});
			const status = response.status == 200;

			if (status) {
				if (this.test) {
					common.JSONstringify(response.data);
				}
				return response.data;
			}
		} catch (e) {
			if (e?.response?.status == 401) {
				Router.push("/auth/sign-in");
				localStorage.removeItem("user");
			}
			return e;
		}
	}




	async uploadFile(url, body, params) {
		try {
			this.headers = {};
			this.headers["Content-Type"] = "multipart/form-data";
			this.setAuth(url);

			url = env.base_url + url;

			body = body || {};
			params = { ...params } || {};

			const response = await axios.post(url, body, {
				params: params,
				headers: this.headers,
			});
			const status = response.status == 200;

			if (status) {
				if (this.test) {
					common.JSONstringify(response.data);
				}
				return response.data;
			}
		} catch (e) {
			if (e?.response?.status == 401) {
				Router.push("/auth/sign-in");
				localStorage.removeItem("user");
			}
			return e;
		}
	}
}

export default Client;
