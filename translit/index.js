const uzb = ["a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z", "o‘", "g‘", "sh", "ch", "ye", "yo", "‘"]
const cyr = ["а", "б", "д", "э", "ф", "г", "ҳ", "и", "ж", "к", "л", "м", "н", "о", "п", "қ", "р", "с", "т", "у", "в", "х", "й", "з", "ў", "ғ", "ш", "ч", "е", "ё", "ъ"]
console.log(uzb.length, cyr.length)
function replacer(word) {
    const tokens = word.split('')

    for (let i = 0; i < tokens.length; i++) {
        if (cyr.includes(tokens[i])) {
            let indexLetter = cyr.indexOf(tokens[i])
            tokens[i] = uzb[indexLetter]
        }else if(cyr.includes(tokens[i].toLowerCase())){
            let indexLetter = cyr.indexOf(tokens[i].toLowerCase())
            tokens[i] = uzb[indexLetter].toUpperCase()
        }
    }
    return tokens.join('')
}

module.exports = {replacer}