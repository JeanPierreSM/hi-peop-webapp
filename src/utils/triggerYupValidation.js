import * as yup from 'yup';

const triggerYupValidation = async (schema, errors, fieldName, fieldValue) => {
	try {
		await yup.reach(schema, fieldName).validate(fieldValue, { abortEarly: false });
		errors[fieldName] = '';
	} catch (error) {
		errors[fieldName] = error.errors[0];
	}
};

export default triggerYupValidation;
