import Joi from "joi";

const testSchema = {
	email: Joi.string().required(),
	name: Joi.string().required(),
	age: Joi.number().required(),
};
export default { testSchema };
