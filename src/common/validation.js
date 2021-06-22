export function validate(data) {
    const error = {};

    for (let property in data) {
        if (property === "firstName") {
            if (data[property].trim() === "") error[property] = `First Name requiere`;
            if (data[property]) {
                const regex = /^[A-Za-z]+$/;
                if (!data[property].match(regex))
                    error[
                        property
                    ] = `Invalid first name, please enter only letters with no special charcters or numbers`;
            }
        }
        if (property === "lastName") {
            if (data[property].trim() === "") error[property] = `Last Name requiere`;
            if (data[property]) {
                const regex = /^[A-Za-z]+$/;
                if (!data[property].match(regex))
                    error[
                        property
                    ] = `Invalid last name, please enter only letters with no special charcters or numbers`;
            }
        }

        if (property === "email") {
            if (data[property].trim() === "") error[property] = `Email Name requiere`;
            if (data[property]) {
                const regex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
                if (!regex.test(data[property]))
                    error[
                        property
                    ] = `Invalid email format, please make sure to write a valid email`;
            }
        }
        if (property === "password") {
            if (data[property].trim() === "") error[property] = `Password requiere`;
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
            if (!regex.test(data[property]))
                error[property] =
                " Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.";
        }

        if (property === "passwordConfirm") {
            if (data[property].trim() === "") error[property] = `Password requiere`;
            if (data.password !== data[property])
                error[
                    property
                ] = `Passwords do not match, please make sure you typed same password`;
        }
    }
    return Object.keys(error).length === 0 ? "" : error;
}

export function validateProperty({ name, value }, passwordCheck = "") {
    if (name === "firstName") {
        if (value.trim() === "") return `First Name requiere`;
        if (value) {
            const regex = /^[A-Za-z]+$/;
            if (!value.match(regex))
                return `Invalid first name, please enter only letters with no special charcters or numbers`;
        }
    }

    if (name === "lastName") {
        if (value.trim() === "") return `Last Name requiere`;
        if (value) {
            const regex = /^[A-Za-z]+$/;
            if (!value.match(regex))
                return `Invalid last name, please enter only letters with no special charcters or numbers`;
        }
    }

    if (name === "email") {
        if (value.trim() === "") return `Email requiere`;
        if (value) {
            const regex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
            if (!regex.test(value))
                return `Invalid email format, please make sure to write a valid email`;
        }
    }

    if (name === "password") {
        if (value.trim() === "") return `Password requiere`;
        if (value) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
            if (!regex.test(value))
                return " Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.";
        }
    }

    if (name === "passwordConfirm") {
        if (value.trim() === "") return `Password Confirmation requiere`;
        else if (value !== passwordCheck) {
            return `Password do not match, please make sure you typed the same password..`;
        }
    }
}