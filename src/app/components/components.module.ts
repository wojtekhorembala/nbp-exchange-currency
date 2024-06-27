import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyComponent } from './currency/currency.component';
import { CurrencyExchangeFormComponent } from './currency-exchange-form/currency-exchange-form.component';

const components = [
  CurrencyComponent,
  CurrencyExchangeFormComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
