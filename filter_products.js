export {Product, filterProducts, products}

class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity  = quantity;
        this.description = description;
    }
}


let apple = new Product('Яблоки', 149, 20, "Свежие, зеленые");
let chiken = new Product('Курица', 250, 15, "Мясо цыплека свежемороженное");
let banan = new Product('Банан', 79, 15, "Спелые баннаы из Эквадора");
let flour = new Product('Мука', 88, 20, "Мука пшеничная высший сорт");
let ketchup = new Product('Кетчуп', 120, 10, "Упаковка по 500гр");
let peperoni = new Product('Пеперони', 500, 3, "Итальянская пряная колбаса");
let salt = new Product('Соль', 50, 50, "Соль поваренная, помол №1");
let oil = new Product('Масло', 500, 10, "Масло оливковое");
let cheese = new Product('Сыр', 1200, 2, "Твердый итальянский сыр");

let products = [apple, chiken, cheese, banan, flour, ketchup, peperoni, salt, oil]

let actions = {
    "=": (fieldValue, requestValue) => fieldValue == +requestValue,
    ">": (fieldValue, requestValue) => fieldValue > +requestValue,
    "<": (fieldValue, requestValue) => fieldValue < +requestValue,
    ">=": (fieldValue, requestValue) => fieldValue >= +requestValue,
    "<=": (fieldValue, requestValue) => fieldValue <= +requestValue,
    "contains": (fieldValue, requestValue) => fieldValue.includes(requestValue),
    "ends": (fieldValue, requestValue) => fieldValue.endsWith(requestValue),
    "starts": (fieldValue, requestValue) => fieldValue.startsWith(requestValue), 
}


function filterProducts(request) {
    if (!request) {
        console.log("Пустой запрос")
        return;
    }
    let result = products.slice(0);
    for (let filter of request.split('&')) {
        let [_, field, action, value] = filter.match(/(\w+)-(\w+|[>=<]+)-?(.+)/)
        result = result.filter((product) => {
            return actions[action](product[field], value);
        })
    
    }
    return result;

}

