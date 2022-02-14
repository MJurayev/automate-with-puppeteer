function normalizeDate(dataString){
    const dateArray = dataString.trim().split(',')
    let month = null
    let year = null
    let day = null
    let newDate = []
    for(let i=0; i < 3; i++){
        if(dateArray[i].length === 4){
            year = dateArray[i]
        }else
        newDate.push(dateArray[i])
    }
    newDate.unshift(year)

    if(newDate[1]>12){
        let temp = newDate[1]
        newDate[1] = newDate[2]
        newDate[2] = temp
    }
    newDate = newDate.map(element => {
        if(element.toString().length < 2)return `0${element}`
        return element
    })
    return newDate.join('-')
}
module.exports = { normalizeDate }
// console.log(normalizeDate('2015,08,24'))