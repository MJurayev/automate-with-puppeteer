const body = require('./request.model')
const dataJSON = require('./parse-data.json')
const Axios = require('axios').default
const fs = require('fs')
const axios = Axios.create({
    baseURL:'http://yoshbalansi.uz/api/api/v1'
})
const failFiles = fs.createWriteStream('./failed.txt')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC95b3NoYmFsYW5zaS51elwvYXBpXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0NDM0NzE5OCwiZXhwIjoxNjQ0Mzc1OTk4LCJuYmYiOjE2NDQzNDcxOTgsImp0aSI6IlFUU2R6OW11RnNPQ2hFeGgiLCJzdWIiOjI2MjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jv1NJwL5Wh8wTC8k609B0c5MxOdniTLSI1qUC_3X5kU'
function postData(data){
    if(!data)return
    axios.post('/surveys', data,
    {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res) => {
        console.log(res.data.data.survey.pin +" Kiritildi")
    }).catch(err=>{
        // failFiles.write(data)
        failFiles.write(data.passport + "\n")
        console.log(err.response.data.errors)
        console.log(data.passport + 'Kiritilmadi')
        console.log("-----------------------------------------")
    })

}

let counter = 0
const interval = setInterval(() => { 
    if(counter >= dataJSON.length){
        clearInterval(interval)
    }
    postData(dataJSON[counter])
    counter++
}, 1000)

// postData()