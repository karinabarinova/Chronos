export function checkForm(values, type) {
    let errors = {};
    let participants = null;
    if (values.participants) {
        participants = values.participants.split(' ')
    }
    if (participants) {
        errors.participants = participants.map(user => {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(user)
        })
    }

    if (type === "calendar") {
        if (!values.name.trim())
            errors.name = "Name required"
        if (!values.description.trim())
            errors.description = "Description required"
        if (errors.participants && errors.participants.includes(false))
            errors.participants = "Invalid Email Address"
        else
            delete errors.participants
    }

    if (type === "event") {
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
        if (errors.participants && errors.participants.includes(false))
            errors.participants = "Invalid Email Address"
        else
            delete errors.participants
    }
	

	return errors;
}