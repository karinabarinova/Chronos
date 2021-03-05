export function checkForm(values, type) {
	let errors = {};

    if (type === "calendar") {
        if (!values.name.trim())
            errors.name = "Name required"
        if (!values.description.trim())
            errors.description = "Description required"
    }
	

	return errors;
}