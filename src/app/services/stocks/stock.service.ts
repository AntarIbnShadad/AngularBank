import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyItem, StockItem } from '../../interfaces/interfaces';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}


  
  getCurrency(): Observable<CurrencyItem[]> {
    const currencies: CurrencyItem[] = [
      { symbol: 'USD/EUR', price: 0.93, change: +0.01 },
      { symbol: 'USD/JPY', price: 154.26, change: -0.12 },
      { symbol: 'GBP/USD', price: 1.24, change: +0.02 },
      { symbol: 'EUR/JPY', price: 165.87, change: -0.21 },
      { symbol: 'AUD/USD', price: 0.66, change: +0.01 },
      { symbol: 'USD/CHF', price: 0.91, change: +0.01 },
      { symbol: 'USD/CAD', price: 1.36, change: -0.02 },
      { symbol: 'NZD/USD', price: 0.60, change: +0.00 },
      { symbol: 'EUR/GBP', price: 0.84, change: -0.01 },
      { symbol: 'USD/TRY', price: 32.55, change: +0.45 },
      { symbol: 'USD/SAR', price: 3.75, change: 0.00 },
      { symbol: 'USD/KWD', price: 0.31, change: 0.00 },
      { symbol: 'USD/INR', price: 83.10, change: -0.14 },
      { symbol: 'USD/CNY', price: 7.23, change: +0.01 },
      { symbol: 'USD/MXN', price: 17.21, change: -0.04 },
      { symbol: 'USD/ZAR', price: 18.91, change: +0.10 },
      { symbol: 'USD/NOK', price: 10.77, change: +0.03 },
      { symbol: 'USD/SEK', price: 10.50, change: -0.02 },
      { symbol: 'USD/DKK', price: 6.91, change: +0.01 },
      { symbol: 'USD/PLN', price: 4.06, change: -0.01 },
      { symbol: 'USD/HKD', price: 7.84, change: 0.00 },
      { symbol: 'USD/SGD', price: 1.34, change: +0.01 },
      { symbol: 'USD/THB', price: 36.50, change: +0.12 },
      { symbol: 'USD/TWD', price: 31.40, change: -0.10 },
      { symbol: 'USD/PKR', price: 278.55, change: -1.23 },
      { symbol: 'USD/BDT', price: 109.50, change: +0.11 },
      { symbol: 'USD/MYR', price: 4.69, change: +0.02 },
      { symbol: 'USD/IDR', price: 16021, change: +23 },
      { symbol: 'USD/VND', price: 24300, change: +50 },
      { symbol: 'USD/EGP', price: 30.90, change: +0.01 },
      { symbol: 'USD/RUB', price: 92.45, change: -0.35 }
    ];
    return of(currencies);
  }

  getStocks(): Observable<StockItem[]> {
    const stocks: StockItem[] = [
      { symbol: 'AAPL', price: 185.45, change: +1.21 },
      { symbol: 'TSLA', price: 217.35, change: -3.12 },
      { symbol: 'GOOGL', price: 129.52, change: +0.78 },
      { symbol: 'MSFT', price: 324.12, change: -1.03 },
      { symbol: 'AMZN', price: 112.84, change: +0.12 },
      { symbol: 'NFLX', price: 422.12, change: +2.33 },
      { symbol: 'NVDA', price: 795.30, change: -4.21 },
      { symbol: 'META', price: 294.85, change: +1.14 },
      { symbol: 'BA', price: 184.13, change: -0.45 },
      { symbol: 'ORCL', price: 109.21, change: +0.91 },
      { symbol: 'INTC', price: 34.21, change: +0.03 },
      { symbol: 'PEP', price: 167.45, change: -1.23 },
      { symbol: 'KO', price: 58.41, change: -0.15 },
      { symbol: 'DIS', price: 98.51, change: +0.85 },
      { symbol: 'TSM', price: 120.01, change: +2.03 },
      { symbol: 'UBER', price: 59.85, change: +0.58 },
      { symbol: 'BABA', price: 74.23, change: -2.14 }
    ];

    return of(stocks);
  }

  getStocksApi(): Observable<StockItem[]> {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];

    const query = symbols.join(',');
    const url = `https://financialmodelingprep.com/api/v3/quote/${query}?apikey=demo`; // free key: "demo"

    return this.http.get<any[]>(url).pipe(
      map((data) =>
        data.map(item => ({
          symbol: item.symbol,
          price: item.price,
          change: item.change
        }))
      )
    );
  }
}
