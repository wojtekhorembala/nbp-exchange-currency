import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { ICurrencyRate } from '../../interfaces/nbp.interface';

@Component({
  selector: 'app-currency-exchange-form',
  templateUrl: './currency-exchange-form.component.html',
  styleUrl: './currency-exchange-form.component.scss'
})
export class CurrencyExchangeFormComponent implements OnInit {

  @Input('currencies') public set setCurrencies(data: ICurrencyRate[]) {
    this._currencies = data;
    if (this._currencies) {
      this._currencies.unshift({ code: 'PLN', currency: 'złoty', mid: 1 });
    }
  }

  public _currencies: ICurrencyRate[] = [];
  public result: string = '0';
  public amountFormControl: FormControl<number> = new FormControl();
  public fromCurrencyCode: string = 'PLN';
  public toCurrencyCode: string = 'EUR';

  ngOnInit(): void {
    this.onChangeAmountValue();
  }

  private onChangeAmountValue(): void {
    this.amountFormControl.valueChanges
    .pipe(
      debounceTime(300),
    )
    .subscribe({
      next: () => this.convertCurrency(),
    });
  }

  public convertCurrency(amount: number = this.amountFormControl.value): void {
    if (amount && amount > 0) {
      const toRate = this._currencies.find(rate => rate.code === this.toCurrencyCode)?.mid || 1;
      this.result = ((amount * 1) / toRate).toFixed(2);
      return;
    }
    this.result = '0';
  }

}
