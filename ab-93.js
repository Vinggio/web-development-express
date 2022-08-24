

function getCSVData(){
    // Returns a row string with the CSV data (including the headers)
    const data = `id,currency,value
1,BTC,0.152
2,ETH,-0.024
3,BTC,1.137
4,BTC,-0.386
5,ETH,0.519`;
    return data;
}

//function convertBruteCurrencyToArray(bruteCurrencyValue){
    /**
     * Parameters
     * ----------
     * bruteCurrencyValue
     *  brute data, e.g. "1,BTC,0.152"
     * 
     * Returns
     * -------
     * data in an array form, e.g. ["BTC", 0.152]
     */
    
    


function setMaxCurrencyValues(splittedLines){
    /*
    Parameters
    ----------
    splittedLines
        brute data of the currencies, e.g. ["1,BTC,0.152", "3,BTC,1.137"]

    Returns
    Set of the maximum values for each currency    
    */
    const convertBruteCurrencyToArray =  (bruteCurrencyValue) => {
        splittedCurrency = bruteCurrencyValue.split(",")
        return [splittedCurrency[1], parseFloat(splittedCurrency[2])];
    }
    currenciesArray = splittedLines.map(convertBruteCurrencyToArray);
    console.log(currenciesArray);
    let myCurrenciesMap = new Map();
    for(let currencyData of currenciesArray){
        console.log(currencyData);
        key = currencyData[0];
        value = currencyData[1];
        actualCurrencyValue = myCurrenciesMap.get(key);
        if (actualCurrencyValue == undefined){
            myCurrenciesMap.set(key, value);
            continue;
        } 
        if (actualCurrencyValue < value && actualCurrencyValue){
            myCurrenciesMap.set(key, value);
        }
    }
    return myCurrenciesMap;
}

let CSVData = getCSVData();

splittedLines = CSVData.split("\n")

splittedLines.shift();  // lines without the headers


currenciesMap = setMaxCurrencyValues(splittedLines);

let rowCurrenciesStr = ""

// Parsing the the string
for (let currency of currenciesMap){
    rowCurrenciesStr += currency[0] + ": " + currency[1] + ", ";
}
rowCurrenciesStr = rowCurrenciesStr.slice(0, -2); // delete the unwanted characters

console.log(rowCurrenciesStr);