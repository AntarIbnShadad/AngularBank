import { Component, Input } from '@angular/core';
import { StockItem } from '../../interfaces/interfaces';
import { StockService } from '../../services/stocks/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chyron',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chyron.component.html',
})
export class ChyronComponent {
  stocks: StockItem[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStocks();
    setInterval(() => this.loadStocks(), 60000); // refresh every 60 seconds
  }

  loadStocks(): void {
    this.stockService.getCurrency().subscribe((data) => {
      this.stocks = data;
    });
  }

  isUp(change: number): boolean {
    return change >= 0;
  }

}
