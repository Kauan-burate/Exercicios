function validarNumbers(a, b) {
    if(typeof a == "number"){
        console.log( a, " É numero");
    } else{
        console.log(a, " Não é numero");
    } 
    if(typeof b == "number"){
        console.log(b, " É numero");
    } else{
        console.log(b, " Não é numero");
    }
}

module.exports = {
    validarNumbers
};