const reader = require('xlsx')
const fs = require('fs')
const CyrillicToTranslit = require('cyrillic-to-translit-js')
const { translitObject } = require('./translit/translitObject')
const { normalizeDate } = require('./utils/normalize-data')
const { randomPhone } = require('./utils/getRandomPhone')

const file = reader.readFile('./test_data.xlsx')

const sheets = file.SheetNames
console.log(sheets)
const translit = new CyrillicToTranslit({
    preset: 'ru'
})
let data = []

const parseFile = fs.createWriteStream('./parse-data.json')

// let mustCols = [
//     'Яшаш манзили',
//     'Ф.И.Ш',
//     'Паспорт',
//     'ЖШШИР',  
//     'Туғилган санаси',
//     'Телефон рақами',
//     'Таълим маълумоти',
//     'Ишлаш истаги',
//     'Сабаблари',
//     'Оилавий ҳолати',
//     'Яшаш жойи бўйича',
//     'Бошқа ижтимоий ҳолати'
// ]
const genderIsTrue = ["erkak", "o'g'il", "o`g`il", "o`g`li", "o'g'li","o'g‘il","o‘g'il"]
var count = 0
for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    
    temp.forEach((res) => {
        if(count > 218){
            return
        }
        if(!isNaN(Number(res['T/R']))){
            if(Date.now()%30 !== 1){
                console.log(count++)
            res = validateInfo(res)
            console.log(res)
            // res = translitObject(res)
            // console.log(res.gender)
            data.push(res)
            };
            
        }
        
    })

    // console.log(temp)
}
parseFile.write(JSON.stringify(data))
function validateInfo(res) {

    if(!res )return
    let nameArray = translit.transform(res["O'quvchining familiyasi,ismo va sharifi"]).split(' ').filter(element => element)
    let gender = genderIsTrue.includes(res["Jinsi"].toLowerCase())
    console.log(res["Tug'ilgan kuni,oyi,yili"])
    return {
        document_type: 1,
        passport:"",
        pin: "",
        gender:gender ,
        first_name: nameArray[1],
        last_name: nameArray[0],
        patronimic: `${nameArray[2] || res["Otasi yoki onasining familiyasi,ismi va sharifi"].split(' ')[1]}  ${gender ? "o'g'li" : 'qizi'}`,
        birth_date: normalizeDate(res["Tug'ilgan kuni,oyi,yili"]),
        phone: `91 ${randomPhone()}`,
        address:  "Navro'z mfy Navro'z qishlog'i",
        document_number:`I-QD ${randomPhone().replace(' ', '')}`,
        employment_data: {
            holati: 6,
            migrasiyaga: {
                turi: "",
                respublika: "",
                viloyat: "",
                ish_joyi: "",
                lavozimi: "",
                ketgan_muddati: "",
                talim_muassasasi: "",
                bosqichi: "",
                ish_yoki_oqish_joyi: "",
                lavozimi_yoki_bosqichi: ""
            },
            talimda: {
                davlat_muassasa: "",
                turi: ""
            },
            boshqa_rasmiy_tarmoqda: "",
            ishlash_istagi_yoq: "",
            tashkilot_nomi: "",
            lavozimi: "",
            muassasa_nomi: "",
            bosqichi_sinfi: "",
            fakulteti: "",
            yonalishi: "",
            qoshimcha_izoh: ""
        },
        educational_data: {
            holati: 2,
            maktabgacha_talim: "",
            umumiy_orta: {
                tugallangan: 0,
                turi: 1
            },
            professional_talim: {
                tugallangan: "",
                turi: ""
            },
            oliy_talim: {
                tugallangan: "",
                turi: ""
            },
            oliy_talimdan_keyingi_talim: "",
            muassasa_nomi: `${46 + Date.now()%2 } -maktab`,
            mutaxassisligi: "",
            tamomlagan_vaqti: ""
        },
        family_data: {
            holati: ""
        },
        social_data: {
            ijtimoiy_himoyaga_muhtojlar: {
                holati: [],
                yetim: ""
            },
            alohida_nazoratda_turuvchilar: [],
            nogironligi_bor: {
                guruhi: "",
                turi: ""
            },
            ijtimoiy_komak_boyicha: [],
            ijtimoiy_faol_yosh: [],
            iqtidori_boyicha: [],
            erishgan_yutuqlari_boyicha: {
                daraga: "",
                turi: []
            }
        },
        healty_data: {
            salomatligi: 1,
            surunkali_kasallikk_turi: ""
        },
        youthnotebook_data: {
            tavsiya_etiladi: 0,
            sababi: ""
        },
        additional_info: ""
    }
}


