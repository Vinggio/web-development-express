class currency{
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

function getCSVData(): string {
    // Returns a row string with the CSV data (including the headers)
    const data = `id,currency,value
1,BTC,0.152
2,ETH,-0.024
3,BTC,1.137
4,BTC,-0.386
5,ETH,0.519`;
    return data;
}


function setMaxCurrencyValues(splittedLines: Array<string>): Map<string, number>{
    /*
    Parameters
    ----------
    splittedLines
        brute data of the currencies, e.g. ["1,BTC,0.152", "3,BTC,1.137"]

    Returns
    Set of the maximum values for each currency    
    */
    const convertBruteCurrencyToArray = (bruteCurrencyValue: string) => {
        let splittedCurrency: Array<string> = bruteCurrencyValue.split(",")
        let currencyName: string = splittedCurrency[1];
        let currencyValue: number = parseFloat(splittedCurrency[2]);
        return new currency(currencyName, currencyValue);
    }
    let currenciesArray: Array<currency> = splittedLines.map(convertBruteCurrencyToArray);
    let myCurrenciesMap: Map<string, number> = new Map();
    for(let currencyData of currenciesArray){
        let key: string = currencyData.name;
        let value: number = currencyData.value;
        let actualCurrencyValue = myCurrenciesMap.get(key);
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

let CSVData: string = getCSVData();

let splittedLines: Array<string> = CSVData.split("\n");

splittedLines.shift();  // lines without the headers


let currenciesMap: Map<string, number> = setMaxCurrencyValues(splittedLines);

let rowCurrenciesStr: string = "";

// Parsing the the string
for (let currency of currenciesMap){
    rowCurrenciesStr += currency[0] + ": " + currency[1] + ", ";
}
rowCurrenciesStr = rowCurrenciesStr.slice(0, -2); // delete the unwanted characters

console.log(rowCurrenciesStr); 