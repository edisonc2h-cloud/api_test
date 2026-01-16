export default {
    price: [check_price]
};

function check_price(value) {
    console.log(value)
    if (parseFloat(value) <= 0) {
        throw 'valor debe ser mayor a cero';
    }
}