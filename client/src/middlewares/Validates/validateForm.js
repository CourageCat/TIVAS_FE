const validatePassword = (password) => {
    const err = { password: "", number: 0 };
    if (password === "") {
        err.password = "Please fill out this field.";
        err.number++;
    } else if (password.length < 5) {
        err.password = "Password has a length of at least 5!";
        err.number++;
    }
    return {
        err: err.number === 0 ? 0 : 1,
        mess: err.password,
    };
};

const validateEmail = (email) => {
    const err = { email: "", number: 0 };
    const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (email === "") {
        err.email = "Please fill out this field.";
        err.number++;
    } else if (!patternEmail.test(email)) {
        err.email = "Email format is wrong!";
        err.number++;
    }
    return {
        err: err.number === 0 ? 0 : 1,
        mess: err.email,
    };
};

export const login = ({ loginValue, password }) => {
    const errors = {
        loginValue: "",
        email: false,
        password: "",
        numberErrors: 0,
    };

    const checkEmail = validateEmail(loginValue);
    const checkPassword = validatePassword(password);

    if (loginValue === "") {
        errors.loginValue = "Please fill out this field.";
        errors.numberErrors++;
    } else {
        if (checkEmail.err === 0) {
            errors.email = true;
        }
    }

    if (checkPassword.err === 1) {
        errors.numberErrors++;
        errors.password = checkPassword.mess;
    }
    return errors;
};

export const register = ({ fullName, username, password, confirmPassword }) => {
    const errors = {
        confirmPassword: "",
        numberErrors: 0,
    };

    const checkPassword = validatePassword(password);
    const checkConfirmPassword = validatePassword(confirmPassword);

    if (fullName === "") {
        errors.numberErrors++;
    }

    if (username === "") {
        errors.numberErrors++;
    }

    if (checkPassword.err === 1) {
        errors.numberErrors++;
    }

    if (checkConfirmPassword.err === 1) {
        errors.numberErrors++;
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Confirm passwords do not match";
        errors.numberErrors++;
    }

    return errors;
};
