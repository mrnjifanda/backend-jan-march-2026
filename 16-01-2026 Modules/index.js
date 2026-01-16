const fs = require('node:fs');

fs.readFile('./data.txt', 'utf8', (error, content) => {
    if (error) throw error;
    console.log(content)
});

const myNewContent = "Hello, World";
fs.writeFile("./data.txt", myNewContent, (error) => {
    if (error) throw error;
    console.info('Data has been written !!!')
});
