import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { ITableExchangeRatesCurrency } from '../interfaces/nbp.interface';

@Injectable({
  providedIn: 'root',
})
export class NbpService {
  private readonly apiUrl = 'https://api.nbp.pl/api/exchangerates/tables/A/';

  constructor(private http: HttpClient) {}

  public getExchangeRates(date: string = ''): Observable<ITableExchangeRatesCurrency> {
    const url = date ? `${this.apiUrl}${date}/?format=json` : `${this.apiUrl}?format=json`;
    return this.http.get<ITableExchangeRatesCurrency[]>(url).pipe(
      map(response => response[0]),
    );
  }

}
