const body = require('./request.model')
const dataJSON = require('./parse-data.json')
const Axios = require('axios').default
const https = require('https')

const fs = require('fs')
const axios = Axios.create({
    baseURL: 'https://yoshbalansi.uz/api/api/v1'
})
const failFiles = fs.createWriteStream('./failed.txt')
const httpsAgent = new https.Agent({
    rejectUnauthorized:false,
    minVersion: 'TLSv1.2'
})
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveW9zaGxhcmJhbGFuc2kudXpcL2FwaVwvYXBpXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDQ2MTQxNjIsImV4cCI6MTY0NDY0Mjk2MiwibmJmIjoxNjQ0NjE0MTYyLCJqdGkiOiJTVGRhV21xZ01zNm00YklxIiwic3ViIjoyNjIyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.0AQmichjkrTlS99xRvkiCGRPs9iFxo_rZrL2wvKAewM'
function postData(data) {
    if (!data) return
    axios.post('/surveys', data,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': `access_token=${token}; access_token_time=1644642963229`,
                'Host': 'yoshlarbalansi.uz',
                'Origin': 'https://yoshlarbalansi.uz',
                'Referer': 'https://yoshlarbalansi.uz/surveys/create',
                // 'Content-Type': 'application/json',
                // 'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"`,
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': "Windows",
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same-origin',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'
            },
            httpsAgent:httpsAgent
    }).then((res) => {
            console.log("%c" + data.document_number + " Kiritildi", 'color: green')
            console.log("-----------------------------------------")

        }).catch(err => {
            // failFiles.write(data)
            // console.log(err)
            // failFiles.write(data.document_number + "\n")
            console.log(err.response.data)
            console.log("%c" + data.document_number + 'Kiritilmadi', 'color:red')
            console.log("-----------------------------------------")
        })

}

let counter = 0
let allCount = dataJSON.length
const interval = setInterval(() => {
    if (counter >= allCount) {
        clearInterval(interval)
    }
    console.log(counter +`/` + allCount)
    postData(dataJSON[counter])
    counter++
}, 500)

// postData()