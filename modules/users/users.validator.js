export default {
    email: [check_length, check_format],
    active: [check_options]
};

function check_length(value) {
    console.log(value.length)
    if (value.length < 10 || value.length > 100) {
        throw 'email no cumple longitud';
    }
}

function check_format(value) {
    if (value.indexOf('@') < 0) {
        throw 'Formato incorrecto';
    }
}

function check_options(value) {
    if (value !== "si" && value !== "no") {
        throw "Valor en active incorrecto";
    }
    
}