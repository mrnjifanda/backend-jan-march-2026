const fs = require('node:fs');
const mongoose = require('mongoose');

const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

fs.mkdir('./SEVEN', (error) => {
    if (error) throw error;

    const fileContent = "Seven Academy " + getCurrentDate();
    fs.writeFile('./SEVEN/new_file.txt', fileContent, (err) => {
        if (err) throw err;
        console.log("Good, Folder and file created !!!");
    });
});