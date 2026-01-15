const fs = require('fs');
// How to use Promise
fetch('https:// google.com')
    .then(response => response.text())
    .then(content => {
        fs.writeFile('google.html', content, (error, success) => {
            console.log(error);
            console.log(success);
        });
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        console.log("End action");
    })

// How to create your own promise:
const getUser = () => {
    return new Promise((resolve, reject) => {
        const success = true;
        if (success) {
            resolve({ id: 1, name: 'Jean' })
        } else {
            reject("Error: Failed")
        }
    });
};

getUser()
    .then(user => console.log("User found: ", user))
    .catch(error => console.log(error))