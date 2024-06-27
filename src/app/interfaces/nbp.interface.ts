export interface ITableExchangeRatesCurrency {
    effectiveDate: string;
    no: string;
    table: string; // enum A/B/C
    rates: ICurrencyRate[];
}

export interface ICurrencyRate {
    code: string;
    currency: string;
    mid: number;
}

export interface ICurrencyFlag {
    code: string;
    country: string;
    countryCode: string;
    flag: string;
    name: string;
}