function JSONtoCSVConvertor() {
    this.convert = function (data, batch) {
        let returnObj = {};
        if (batch === 1) {
            returnObj.keys = Object.keys(data[0]).toString() + '\n';
            returnObj.valueSet = getKeyValues(data);
        }
        else {
            returnObj.valueSet = getKeyValues(data);
        }
        return returnObj;
    }
    
    function getKeyValues(data) {
        return data.map((x, i) => {
            return Object.values(x).toString() + '\n';
        })
    }
}




module.exports = JSONtoCSVConvertor; 