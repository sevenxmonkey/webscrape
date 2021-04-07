const request = require("request-promise");
const cheerio = require("cheerio")
const fs = require("fs");

async function main(){
    const html = await request.get("https://codingwithstefan.com/table-example/")
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    buildJSON($);
    // $('body > table > tbody > tr').each((index, element) => {
    //     const obj1 = $(element).find("td")[0]
    //     const obj1Content = $(obj1).text();
    //     if(obj1Content){
    //         console.log(obj1Content)
    //     }
    // })
}

function buildJSON($){
    const arr = [];
    for(let i = 2; i <= 6; i++){
        const Company = $(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text();
        const Contact = $(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text();
        const Country = $(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text();
        arr.push({Company, Contact, Country});
    }
    console.log(arr);
}

main()