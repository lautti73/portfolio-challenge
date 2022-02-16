// Construct a simple Portfolio class that has a collection of Stocks
// and a "Profit" method that receives 2 dates and returns the profit 
// of the Portfolio between those dates. Assume each Stock has a "Price"
// method that receives a date and returns its price. 

// Bonus Track: make the Profit method return the "annualized return"
// of the portfolio between the given dates.


class Stock {
    constructor(company) {
        this.stockHist = [];
        this.company = company;
    }

    addStockHist(date, price) {
        this.stockHist.push({ date, price });
    }

    getPrice(date) {
        const stock = this.stockHist.find( e => e.date.getTime() == date.getTime() );
        return stock.price;
    }
}

class Portfolio {
    constructor(stock) {
        this.stock = stock;
    }

    // Cumulative Return = (Last price / Initial price - 1)
    cumulativeReturn( finalPrice, initPrice) {
        return (finalPrice / initPrice - 1);
    }

    // Annualized Return  = (1 + Cumulative Return) ** 365 / DaysHeld - 1 
    getProfit(finalDate, initDate) {
        const cumulativeReturn = this.cumulativeReturn( this.stock.getPrice( finalDate ), this.stock.getPrice( initDate ) );
        // ( 1000 miliseconds * 3600 seconds (60 mins * 60 seconds) * 24 hours ) it gives me the total quantity of miliseconds on a day.
        const DaysHeld = Math.ceil(( finalDate.getTime() - initDate.getTime() ) / ( 1000 * 3600 * 24 ) );
        const annualizedReturn = (1 + cumulativeReturn) ** (365 / DaysHeld) - 1;
        return annualizedReturn;
    }
}

const stock = new Stock('Fintual');
stock.addStockHist(new Date('2021-09-15'), 10);
stock.addStockHist(new Date('2022-02-14'), 100);


const portfolio = new Portfolio(stock);
console.log(portfolio.getProfit(new Date('2022-02-14'), new Date('2021-09-15')));
