import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/currency-list/currency-list.component').then(m => m.CurrencyListComponent),
    },
];
