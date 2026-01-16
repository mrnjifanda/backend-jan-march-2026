// let myApp = "Hello App!";
// console.log("START APP: ", myApp);

// setTimeout(() => {
//     myApp = "Hello Updated App!"; 
//     console.log("MIDDLE APP: ", myApp);
// }, 2000);

// console.log("END APP: ", myApp);


function sayHello(name, callback) {
    console.log("Presentation message ...");
    setTimeout(() => {
        callback(name)
    }, 5000);
}

// sayHello('Richel', function(name) {
//     console.log("Hello " + name);
// });

function greeting(name) {
    console.log("Hello " + name);
}

sayHello('Richel', greeting);

sayHello('John', function(name) {
    console.log("Hi " + name + ", welcome!");

    const convertName = name.toUpercase();
});



// name and age are parameters
// function testFunction(name, age) {
//     console.log("Name: " + name + ", Age: " + age);
// }

// Richel and 30 are arguments
// testFunction("Richel", 30);
