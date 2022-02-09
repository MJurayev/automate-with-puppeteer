const Axios = require('axios').default
const fs = require('fs')
const axios = Axios.create({
    baseURL:'http://yoshbalansi.uz/api/api/v1'
})
const getHumans = fs.createWriteStream('./humans.txt')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC95b3NoYmFsYW5zaS51elwvYXBpXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0NDM2Mjc0NywiZXhwIjoxNjQ0MzkxNTQ3LCJuYmYiOjE2NDQzNjI3NDcsImp0aSI6Ilh2cmNzaUtTYUpXNlh4czQiLCJzdWIiOjI2MjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.yA2Q8y-NkSAsjaCOkyvBKmjqW_SKBKH8W73-l4JL3uw'
function getData(pageId){
    if(!pageId)return
    axios.get(`/surveys?page=${pageId}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res) => {
        let users = res.data.data.surveys.data
         users.forEach(element => {
            getHumans.write(element.citizen.phone+" "+element.citizen.passport+ " " + element.citizen.pin + "\n")  
        })
    }).catch(err=>{
        // failFiles.write(data)
        console.log(err)
    })

}

let counter = 0
const interval = setInterval(() => { 
    if(counter >= 16){
        clearInterval(interval)
    }
    getData(counter)
    counter++
}, 500)

// postData()