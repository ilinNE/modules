export {add, substract, multiply, divide} 


function add(a, b) {
    let singA = a[0];
    let signB = b[0];
    if (singA == '-' && signB == '-') {
        return '-' + addPositive(a.slice(1), b.slice(1))
    } else if (singA == '-') {
        return substractPositive(b, a.slice(1));
    } else if (signB == '-') {
        return substractPositive(a, b.slice(1));
    } else {
        return addPositive(a,b);
    }
}


function substract(a, b) {
    let singA = a[0];
    let signB = b[0];
    if (singA == '-' && signB == '-') {
        return substractPositive(b.slice(1), a.slice(1))
    } else if (singA == '-') {
        return '-' + addPositive(a.slice(1), b);
    } else if (signB == '-') {
        return addPositive(a, b.slice(1));
    } else {
        return substractPositive(a,b);
    }
}

function multiply(a, b) {
    if (isBigger(b, a)) {
        [a, b] = [b, a];
    }
    let singA = a[0];
    let signB = b[0];
    let sign = '-'
    if ((singA == '-' && signB == '-') || (singA != '-' && signB != '-')) {
        sign = ''
    }
    a = a.replace(/^-/, '')
    b = b.replace(/^-/, '')    
    let result = '0'
    while (0 < b) {
        if (isEven(b)) {
            a = add(a, a)
            b = divOnTwo(b)
        } else {
            b = b.replace(/\d$/,(a) => (+a - 1).toString())
            result = add(result, a)
        }
    }
    return sign + result
}


function divide(a, b, precision=20) {
    let singA = a[0];
    let signB = b[0];
    let sign = '-'
    if ((singA == '-' && signB == '-') || (singA != '-' && signB != '-')) {
        sign = ''
    }
    a = a.replace(/^-/, '')
    b = b.replace(/^-/, '')  
    let [quotient, remainder] = divMod(a, b)
    if (remainder == '0' || precision == 0) {
        return sign + quotient;
    } 
    let fraction = '.'
    for (let i = 0; i < precision; i++) {
        remainder += '0';
        let quot;
        [quot, remainder] = divMod(remainder, b);
        fraction += quot;
        if (remainder == '0') break;
    }    
    return sign + quotient + fraction;
}


function addPositive(a, b) {
    if (a == '0') return b;
    if (b == '0') return a;
    if (b.length > a.length) {
        [a, b] = [b, a];
    }
    a = reverse(a);
    b = reverse(b) + '0'.repeat(a.length - b.length);
    let result = ''
    let reminder = 0
    for (let i = 0; i < a.length; ++i) {
        let digit = +a[i] + +b[i] + reminder
        if (digit > 9) {
            digit = digit - 10;
            reminder = 1;
        } else {
            reminder = 0;
        }
        result += digit
    }
    if (reminder != 0) result += reminder
    return reverse(result)
}

function substractPositive(a, b) {
    if (a == b) return '0';
    let sign = ''
    if (isBigger(b, a)) {
        [a, b] = [b, a];
        sign = '-'
    }
    a = reverse(a);
    b = reverse(b) + '0'.repeat(Math.abs(a.length - b.length));
    let result = ''
    let reminder = 0
    for (let i = 0; i < a.length; ++i) {
        let digit = +a[i] - +b[i] + reminder
        if (digit < 0) {
            digit += 10;
            reminder = -1;
        } else {
            reminder = 0;
        }
        result += digit
    }
    return  sign + reverse(result).replace(/^0+/,'')
}


function divMod(a, b) {
    if (a == b) return ['1', '0'];
    if (isBigger(b, a)) return ['0', a];
    if (b == '0') throw "Division by zero"
    if (a == '0') return ['0', '0']
    let lenA = a.length;
    let lenB = b.length;
    let n = a.slice(0, lenB);
    let result = '0'
    for (let i = lenB; i <= lenA; ++i) {
        let digit = 0;
        while (isBigger(n, b) || n == b) {
            n = substract(n, b);
            digit += 1
        }
        result += digit
        n = (n != '0') ? n + a[i] : a[i]
    }
    if (!n) {
        n = '0'
    } else {
        n = n.replace(/undefined/, '')
    }

    return [result.replace(/^0+/,''), n]
}

function reverse(str) {
    return str.split('').reverse().join('')
}

function isBigger(a, b) {
    if (a.length > b.length) {
        return true;
    } else if (b.length > a.length) {
        return false;
    } else {
        return (a > b)
    }
}

function divOnTwo(a) {
    let result = '';
    let reminder = 0;
    for (let i = 0; i < a.length; ++i) {
        let n = +a[i];
        if (n % 2 == 0) {
            result = result + (n / 2 + reminder);
            reminder = 0;
        } else {
            result = result + (~~(n / 2) + reminder);
            reminder = 5;
        }
    }
    return result.replace(/^0+/,'');
}

function isEven(a) {
    return (+a.at(-1) % 2 == 0)
}
