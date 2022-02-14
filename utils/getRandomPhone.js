function randomPhone(){
    return ` ${randomNum()}${randomNum()}${randomNum()} ${randomNum()}${randomNum()} ${randomNum()}${randomNum()}`
}

function randomNum(a=0, b=9){
    return Math.round(Math.random()*(a-b) + b)
}

module.exports = { randomPhone }