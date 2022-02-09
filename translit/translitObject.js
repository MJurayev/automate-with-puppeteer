const { replacer} = require('./index')

function translitObject(obj){
    const tempObj = {}
    for(let props in obj){
        let value = obj[props]
        tempObj[props] =typeof value === 'string' ? replacer(value) : value
    }
    return tempObj
}

module.exports = { translitObject }