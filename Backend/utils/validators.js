exports.validateRegister = (username, email, password) => {

    if (!username || !email || !password) {
        return false;
    }

    return true;
};