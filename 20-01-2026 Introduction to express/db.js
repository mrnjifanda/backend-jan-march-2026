const USERS = [];

const findById = (id) => {
    let user = null;
    for (let i = 0; i < USERS.length; i++) {
        if (USERS[i].id === id) {
            user = USERS[i];
            break;
        }

        continue;
    }

    return user;
};

module.exports = { USERS, findById };
