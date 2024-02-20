import Joi from "joi";
import test from "../schema/test";
import Toast from "../../helpers/Toast";
import common from "../../helpers/common";

const toast = new Toast();

export function perfTest(test) {
	const start = performance.now();
	test();
	const end = performance.now();
	let time = (end - start).toFixed(3);
	console.log("time-took: ", time);
	return time;
}

export const Pick = (keys, object) => {
	if (keys.length === 0) {
		return object;
	}
	const subset = Object.fromEntries(
		keys
			.filter((key) => key in object) // line can be removed to make it inclusive
			.map((key) => [key, object[key]]),
	);

	return subset;
};

export const Validate = (keys, obj, body) => {
	let pick = Pick(keys, obj);
	let schema = Joi.object(pick).validate(body);
	if (schema.error) {
		toast.error(schema.error.message);
		return false;
	}
	let data = schema.value;
	return data;
};
