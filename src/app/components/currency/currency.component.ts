import { Component, Input, OnInit } from '@angular/core';

import { ICurrencyFlag, ICurrencyRate } from '../../interfaces/nbp.interface';
import { FLAGS } from '../../utils/currency-flags';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent implements OnInit {

  @Input() public data?: ICurrencyRate;

  public flagData?: ICurrencyFlag;
  public readonly polandFlag: ICurrencyFlag = FLAGS.get('PLN');

  constructor() {}

  ngOnInit(): void {
    this.getFlagCurrency();
  }

  private getFlagCurrency(): void {
    this.flagData = FLAGS.get(this.data?.code);
  }

}
