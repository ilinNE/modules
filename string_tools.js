export { capitalize, fixSpaces, countWords, countUniqueWords }

function capitalize(str) {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
}

function fixSpaces(str) {
    let expression = / *[.,!?:; ]+ */g;
    let replacer = function(subSting) {
        return subSting.trim() + ' '
    };
    return str.replace(expression, replacer).trim();
}

function countWords(str) {
    return str.match(/[\p{L}\p{Pc}-]+/gu).length;
}

function countUniqueWords(str) {
    let words = str.toLowerCase().match(/[\p{L}\p{Pc}-]+/gu);
    let result = words.reduce((result, word) => {
        (result[word] += 1) || (result[word] = 1);
        return result;
    }, {})
    return result;
}
