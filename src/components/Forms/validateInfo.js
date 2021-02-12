export function validateRegisteredEmail(values) {
	let errors = {};

	if (!values.token.trim()) {
		errors.token = "Token required"
	}

	return errors;

}

export function validateInfoRegistration(values) {
		let errors = {};
	
		if (!values.login.trim())
			errors.login = 'Username required';

		if (!values.fullName.trim())
			errors.fullName = "Name required"
	
		if (!values.email)
			errors.email = 'Email required';
		else if (!/\S+@\S+\.\S+/.test(values.email))
			errors.email = 'Email address is invalid';

		if (!values.password)
			errors.password = 'Password is required';
		else if (values.password.length < 6)
			errors.password = 'Password needs to be 6 characters or more';
		
	
		if (!values.repeat_password)
			errors.repeat_password = 'Password is required';
		else if (values.repeat_password !== values.password)
			errors.repeat_password = 'Passwords do not match';
		
		return errors;
}

export function validateInfoLogin(values) {
	let errors = {};
	
	if (!values.login.trim())
		errors.login = 'Username required';
	

	if (!values.email) 
		errors.email = 'Email required';
	else if (!/\S+@\S+\.\S+/.test(values.email)) 
		errors.email = 'Email address is invalid';
	
	if (!values.password)
		errors.password = 'Password is required';

	return errors;
}

export function validateInfoResetPassword(values) {
	let errors = {};

	if (!values.email)
		errors.email = 'Email required';
	else if (!/\S+@\S+\.\S+/.test(values.email))
		errors.email = 'Email address is invalid';

	return errors;
}

export function validateInfoResetPasswordConfirm(values) {
	let errors = {};

	if (!values.token)
		errors.token = "Token required"

	if (!values.password)
		errors.password = 'Password is required';
	else if (values.password.length < 6)
		errors.password = 'Password needs to be 6 characters or more';

	if (!values.repeat_password)
		errors.repeat_password = 'Password is required';
	else if (values.repeat_password !== values.password)
		errors.repeat_password = 'Passwords do not match';

	return errors;
}


