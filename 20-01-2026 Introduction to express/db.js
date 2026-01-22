const USERS = [];

const findById = (id) => {
    let user = null;
    let index = null;
    for (let i = 0; i < USERS.length; i++) {

        if (USERS[i].id == id) {
            user = USERS[i];
            index = i;
            break;
        }
    }

    // if (user && index) return { index, user };
    if (user) return { index, user };

    return null;
};

module.exports = { USERS, findById };
