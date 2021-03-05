export function checkForm(values, type) {
	let errors = {};

    if (type === "calendar") {
        if (!values.name.trim())
            errors.name = "Name required"
        if (!values.description.trim())
            errors.description = "Description required"
    }

    if (type === "event") {
        console.log(values.start)
        console.log(values.start.length)
        if (values.start.length <= 1)
            errors.start = "Start time required"
        if (values.start && (!Object.prototype.toString.call(new Date(values.start)) === "[object Date]" || !isNaN(values.start)))
            errors.start = "Start date is required"
        if (values.end && (!Object.prototype.toString.call(new Date(values.end)) === "[object Date]" || isNaN(values.end)))
            errors.end = "End date is required"
        if (!values.title.trim())
            errors.title = "Title required"
        if (!values.description.trim())
            errors.description = "Description required"
        if (["Arrangement", "Task", "Reminder"].includes(values.type))
            errors.type = "Invalid Event type"
    }
	

	return errors;
}