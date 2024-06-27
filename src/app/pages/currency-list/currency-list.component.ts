import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, Subject, catchError, debounceTime, of, switchMap, takeUntil, tap } from 'rxjs';

import { NbpService } from '../../services/nbp.service';
import { ComponentsModule } from '../../components/components.module';
import { ICurrencyRate, ITableExchangeRatesCurrency } from '../../interfaces/nbp.interface';
import { getCurrentDateFormatted } from '../../utils/date';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss'
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  public currencies$?: Observable<ITableExchangeRatesCurrency | null>;
  public currenciesRatesToday: ICurrencyRate[] = [];

  public filterDateFormControl: FormControl<string> = new FormControl();
  public noDataCurrenciesError: boolean = false;

  private destroy$ = new Subject<void>();
  public readonly maxDateFilter = getCurrentDateFormatted();

  constructor(
    private nbpService: NbpService,
  ) {}

  ngOnInit(): void {
    this.currencies$ = this.nbpService.getExchangeRates().pipe(tap(value => this.currenciesRatesToday = [...(value?.rates || [])]));
    this.onChangeDateFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByCurrency(_: any, currency: ICurrencyRate): string {
    return currency.code;
  }

  private onChangeDateFilter(): void {
    this.filterDateFormControl.valueChanges.pipe(
      debounceTime(200),
      switchMap(data => 
        this.nbpService.getExchangeRates(data).pipe(
          catchError(() => {
            this.noDataCurrenciesError = true;
            return of(null);
          }),
        )
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(
      data => {
        if (data) {
          this.noDataCurrenciesError = false;
        }
        this.currencies$ = of(data);
      }
    );
  }

}
