let celsius  =  Number(process.argv[2]);

let fahrenheit = (celsius * 9/5) + 32;
let kelvin = celsius + 273.15;

console.log("Conversor de Temperaturas");
console.log("Temperatura em Fahrenheit: ", fahrenheit);
console.log("Temperatura em Kelvin: ", kelvin);
