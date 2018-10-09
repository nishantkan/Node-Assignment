const should = require('should');
const { callFetch, fileName } = require('../index');
const request = require('request');
const options = require('../authConfig.json');

describe('urlTest', function () {
    before(() => {
        options.qs = { page_number: 1 };
    });
    it('correct url', (done) => {
        request(options, function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    })

    it('incorrect url', (done) => {
        options.url = `http://interviewapi20170221095727.azurewebsites.net/api/user`;
        request(options, function (err, res) {
            res.statusCode.should.equal(404);
            done();
        });
    })

    after(() => {
        options.url = `http://interviewapi20170221095727.azurewebsites.net/api/users`;
    })
})


describe('test', () => {
    let pgNo, accArr;
    before(async () => {
        pgNo = 1;
        accArr = [];
        await callFetch(pgNo)
    })
    it('count', () => {
        let fs = require('fs');
        let p = require('path').resolve(__dirname, `../${fileName}`)
        let text = fs.readFileSync(p).toString();
        let lines = text.split('\n');
        let newlines_count = lines.length - 1;
        newlines_count.should.equal(3001);

        let firstLine = lines[1].toString();
        let firstLineStr = `1,Pattin,Skydall,pskydall0@squarespace.com,Male,118.244.211.39,Anzinger Utica New York United States`;
        firstLine.should.equal(firstLineStr);

    });

});
