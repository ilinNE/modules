export {add, substract, multiply, divide} 

function add(a, b) {
    return (BigInt(a) + BigInt(b)).toString();
}

function substract(a, b) {
    return (BigInt(a) - BigInt(b)).toString();
}

function multiply(a, b) {
    return (BigInt(a) * BigInt(b)).toString();
}

function divide(a, b, precision=20) {
    let dividend = BigInt(a);
    let divider = BigInt(b);
    let quotient = (dividend / divider).toString();
    let remainder = dividend % divider;
    if (remainder == 0) {
        return quotient;
    } 
    let fraction = '.'
    for (let i = 0; i < precision; i++) {
        remainder *= 10n
        fraction += (remainder / divider).toString();
        remainder = remainder % divider;
        if (remainder == 0) break;
    }    
    return quotient + fraction;
    
}

let a = '23242350000000000000000000000'
let b = '17000'
console.log(divide(a, b, 300));
