var currency = /** @class */ (function () {
    function currency(name, value) {
        this.name = name;
        this.value = value;
    }
    return currency;
}());
function getCSVData() {
    // Returns a row string with the CSV data (including the headers)
    var data = "id,currency,value\n1,BTC,0.152\n2,ETH,-0.024\n3,BTC,1.137\n4,BTC,-0.386\n5,ETH,0.519";
    return data;
}
function setMaxCurrencyValues(splittedLines) {
    /*
    Parameters
    ----------
    splittedLines
        brute data of the currencies, e.g. ["1,BTC,0.152", "3,BTC,1.137"]

    Returns
    Set of the maximum values for each currency
    */
    var convertBruteCurrencyToArray = function (bruteCurrencyValue) {
        var splittedCurrency = bruteCurrencyValue.split(",");
        var currencyName = splittedCurrency[1];
        var currencyValue = parseFloat(splittedCurrency[2]);
        return new currency(currencyName, currencyValue);
    };
    var currenciesArray = splittedLines.map(convertBruteCurrencyToArray);
    var myCurrenciesMap = new Map();
    for (var _i = 0, currenciesArray_1 = currenciesArray; _i < currenciesArray_1.length; _i++) {
        var currencyData = currenciesArray_1[_i];
        var key = currencyData.name;
        var value = currencyData.value;
        var actualCurrencyValue = myCurrenciesMap.get(key);
        if (actualCurrencyValue == undefined) {
            myCurrenciesMap.set(key, value);
            continue;
        }
        if (actualCurrencyValue < value && actualCurrencyValue) {
            myCurrenciesMap.set(key, value);
        }
    }
    return myCurrenciesMap;
}
var CSVData = getCSVData();
var splittedLines = CSVData.split("\n");
splittedLines.shift(); // lines without the headers
var currenciesMap = setMaxCurrencyValues(splittedLines);
var rowCurrenciesStr = "";
// Parsing the the string
for (var _i = 0, currenciesMap_1 = currenciesMap; _i < currenciesMap_1.length; _i++) {
    var currency_1 = currenciesMap_1[_i];
    rowCurrenciesStr += currency_1[0] + ": " + currency_1[1] + ", ";
}
rowCurrenciesStr = rowCurrenciesStr.slice(0, -2); // delete the unwanted characters
console.log(rowCurrenciesStr);
