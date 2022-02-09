const reader = require('xlsx')
const fs = require('fs')
const CyrillicToTranslit = require('cyrillic-to-translit-js')
const { translitObject } = require('./translit/translitObject')

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
const genderIsTrue = ["O'g'li","O‘G‘LI"]
for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        res = validateInfo(res)
        res = translitObject(res)
        res.gender = genderIsTrue.includes(res.patronimic.split(' ')[1])
        console.log(res.gender)
        data.push(res)
    })
}
parseFile.write(JSON.stringify(data))
function validateInfo(res) {

    const educationalData = {
        'ўрта': 2,
        'олий': 4,
        'ўрта-махсус': 3
    }
    let nameArray = translit.transform(res['Ф.И.Ш']).split(' ')
    return {
        document_type: 2,
        passport: res['Паспорт'],
        pin: res['ЖШШИР'].toString(),
        first_name: nameArray[1],
        last_name: nameArray[0],
        patronimic: `${nameArray[2]} ${nameArray[3]}`,
        birth_date: res['Туғилган санаси'],
        phone: res['Телефон рақами'],
        address: res['Маҳалла номи'],
        employment_data: {
            holati: 9,
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
            holati: isNaN(Number(educationalData[res['Таълим маълумоти']])) ? 2 :Number(educationalData[res['Таълим маълумоти']]),
            maktabgacha_talim: "",
            umumiy_orta: {
                tugallangan: "",
                turi: ""
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
            muassasa_nomi: "",
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


