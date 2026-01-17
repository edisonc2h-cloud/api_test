export default {
    email: [check_length, check_format],
    phone: [check_length_phone]
};

function check_length(value) {
    if (value.length < 10 || value.length > 100) {
        throw 'email no cumple longitud';
    }
}

function check_format(value) {
    if (value.indexOf('@') < 0) {
        throw 'Formato incorrecto';
    }
}

function check_length_phone(value) {
    if (value.length < 10 || value.length > 100) {
        throw 'Número de telefono no cumple longitud';
    }
}