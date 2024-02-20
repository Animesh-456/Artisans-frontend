import Joi from "joi";
const add = {
	project_name: Joi.string().required(),
	description: Joi.string().required(),
	visibility: Joi.string().required(),
	post_for: Joi.number().required(),
};

const question = {
	project_id: Joi.string().required(),
	message: Joi.string().required(),
};

const answer = {
	id: Joi.string().required(),
	message: Joi.string().required(),
};
const add_payment = {
	project_id: Joi.string().required(),
	amount: Joi.number().required(),
};

const get_temp = {
	project_ids: Joi.array().min(1).required(),
};

const add_bid = {
	bid_desc: Joi.string().required(),
	bid_amount: Joi.number().allow("").required(),
	bid_amount_gbp: Joi.number().allow("").required(),
	bid_days: Joi.number().required(),
	project_id: Joi.number().required(),
	user_id: Joi.number().required(),
};

const update_bid = {
	bid_desc: Joi.string().required(),
	bid_amount: Joi.number().allow("").required(),
	bid_amount_gbp: Joi.number().allow("").required(),
	bid_days: Joi.number().required(),
	project_id: Joi.number().required(),
	user_id: Joi.number().required(),
};

const send_msg = {
	project_id: Joi.number().required(),
	to_id: Joi.number().required(),
	message: Joi.string().required(),
};

const send_bid_msg = {
	project_id: Joi.number().required(),
	send_to: Joi.number().required(),
	msg_box: Joi.string().required(),
};

const review_machinist = {
	project_id: Joi.string().required(),
	comments: Joi.string().required(),
	provider_rate1: Joi.number().required(),
	provider_rate2: Joi.number().required(),
	provider_rate3: Joi.number().required(),
	provider_rate4: Joi.number().required(),
};

const send_shipping = {
	project_id: Joi.number().required(),
	to_id: Joi.number().required(),
	message: Joi.string().required(),
	date: Joi.date().required(),
	from_id: Joi.number().required(),
	tracking_no: Joi.number().required(),
};


const add_desccomment = {
	project_id: Joi.string().required(),
	description: Joi.string().required(),
}

export default {
	add,
	question,
	answer,
	get_temp,
	add_bid,
	update_bid,
	send_msg,
	send_bid_msg,
	add_payment,
	review_machinist,
	send_shipping,
        add_desccomment,
};
