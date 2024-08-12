import Joi from "joi";
const check = {
	role: Joi.number().required(),
	check: Joi.boolean().required(),
	email: Joi.string().required(),
};
const customer_register = {
	role: Joi.number().required(),
	check: Joi.boolean().required(),
	account: Joi.string().required(),
	name: Joi.string().required(),
	surname: Joi.string().required(),
	user_name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
		}),
	confirm_password: Joi.any()
		.equal(Joi.ref("password"))
		.required()
		.messages({ "any.only": "{{#label}} does not match" }),
                 SIREN: Joi.required(),
	         company_name: Joi.required(),
		 pro_user: Joi.required(),
		 show_modal: Joi.required(),
};

const supplier_register = {
	role: Joi.number().required(),
	check: Joi.boolean().required(),
	user_name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
		}),
	password_confirmation: Joi.any()
		.equal(Joi.ref("password"))
		.required()
		.messages({ "any.only": "{{#label}} does not match" }),
	name: Joi.string().required(),
	surname: Joi.string().required(),
	address1: Joi.string().required(),
	zcode: Joi.string().required(),
	city: Joi.string().required(),
	company_name: Joi.string().required(),
	company_number: Joi.string().required(),
	Squestion: Joi.string().required(),
	answer: Joi.string().required(),
	category: Joi.string().required(),
};

const login = {
	email_username: Joi.string().required(),
	password: Joi.string().required(),
};

const update = {
	name: Joi.string().required(),
	surname: Joi.string().required(),
	user_name: Joi.string().required(),
	zcode: Joi.required(),
	city: Joi.required(),
	country_code: Joi.number().required(),
	address1: Joi.required(),
	description: Joi.required(),
	service_desc: Joi.required(),
	tva:Joi.required(),
	company_name: Joi.required(),
	siren: Joi.required(),
	prof_pic: Joi.required(),
	prot_pic: Joi.required()
};

const editAddress = {
	name: Joi.string().required(),
	zcode: Joi.string().required(),
	city: Joi.string().required(),
	address1: Joi.string().required(),
};

const change_password = {
	old_password: Joi.string().required(),
	new_password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
		.required()
		.messages({
			"string.pattern.base":
				"New Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
		}),
	password_confirmation: Joi.any()
		.equal(Joi.ref("new_password"))
		.required()
		.messages({ "any.only": "{{#label}} does not match" }),
};

const updateBalance = {
	balance: Joi.number().required(),
	method: Joi.string().required(),
	val: Joi.number().required(),
};

export default {
	check,
	customer_register,
	supplier_register,
	login,
	update,
	change_password,
	editAddress,
	updateBalance

};
