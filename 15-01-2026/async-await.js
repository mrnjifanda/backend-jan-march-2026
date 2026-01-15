const fs = require("fs")

const scrapGooglePage = async () => {
    const response = await fetch("https://google.com");
    
    const content = await response.text();
    fs.writeFile('new-google.html', content, (error, success) => {
        console.log(error);
        console.log(success);
    });
}

scrapGooglePage();
