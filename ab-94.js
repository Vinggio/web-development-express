import moment from 'moment'

async function getBitcoinPrices(startDate, endDate){
    /**
     * Parameters
     * ----------
     * startDate: str, date that you want to start looking for the prices, YYYY-MM-DD
     * endDate: str, date that you want to end looking for the prices, YYYY-MM-DD
     * 
     * Returns
     * -------
     * Parsed JSON with date as key and the close price as the value
     * e.g. {"2021-01-01": 29391.775, "2021-01-02": 32198.48}
     */
    let ApiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + startDate + "&end=" + endDate;
    let result = await fetch(ApiUrl);
    let BitcointPriceIndexJson = await result.json();
    return BitcointPriceIndexJson["bpi"];
}

let startDate = "2021-01-01";
let endDate = "2021-03-01";

let BitcointPriceIndex = await getBitcoinPrices(startDate, endDate);
console.log(BitcointPriceIndex);
let maxValue = 0;
let dateOfMax = "";

for(let date in BitcointPriceIndex){
    let value = BitcointPriceIndex[date];
    if (value > maxValue){
        maxValue = value; 
        dateOfMax = date;
    }
}

let MaxDateYYYYDoFormat = moment(dateOfMax, 'YYYY-MM-DD').format('MMMM Do');

console.log(MaxDateYYYYDoFormat);
