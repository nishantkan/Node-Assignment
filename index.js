const fs = require('fs');
const request = require('request');
let jsonToCsv = require('./jsonToCsv');
const options = require('./authConfig.json');

let fileName = `output/testOutput_${Date.parse(new Date)}.csv`;
let csvWriter = fs.createWriteStream(fileName);
var writer = require('csv-write-stream')();
writer.pipe(csvWriter);

let j2c = new jsonToCsv();

function responseAPI(options, pgNo) {
    return new Promise((resp, rej) => {
        options.qs = { page_number: pgNo };
        request(options, function (err, res) {
            if (err) {
                console.dir(err)
                rej(err);
            }
            if (res.statusCode !== 404) { resp(res); }
            else { resp(res); }
        })
    })
}

//////////////////////////

let dataOver = false, pgNo = 1;
function callFetch(pgNo) {
    return responseAPI(options, pgNo).then((resp) => {
        if (resp.statusCode !== 404) {
            let addArr = JSON.parse(resp.body)
            addArr = addArr.map((x, i) => {
                return {
                    id: x.id,
                    first_name: x.first_name,
                    last_name: x.last_name,
                    email: x.email,
                    gender: x.gender,
                    ip_address: x.ip_address,
                    address: x.address.street + ' ' + x.address.City + ' ' + x.address.State + ' ' + x.address.Country
                }
            })
            addArr.forEach((x) => {
                writer.write(x);
            })
            pgNo++
            return callFetch(pgNo).then(() => { });
        }
        else if (resp.statusCode === 404) {
            dataOver = true;
            writer.end();
        }
    }).catch((err) => {
        console.log('err', err);
        process.exit();
    });
}



//*******************************************************

callFetch(pgNo).then((x) => {
    console.log('wrote all data to file');
    process.exit();
});

module.exports = { callFetch: callFetch, fileName: fileName };






