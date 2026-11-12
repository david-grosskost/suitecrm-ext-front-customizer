import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import {CurrencyFormatter} from 'core';

// front-customizer: loaded by SuiteCRM 8 when the interface starts (module
// federation, declared by config/extension.php), it puts the currency symbol
// after the amount: 67 300,00 €.
//
// SuiteCRM formats with Angular's locale, then swaps the separators itself,
// assuming English ones ("," groups, "." decimals) and putting the user's
// instead. So the locale keeps the English separators: only the position of
// the symbol changes (currency pattern "#,##0.00 ¤").
const LOCALE = 'en-suitecrm-symbol-after';

const symbolAfter = (data: unknown[]): unknown[] => data.map(entry => Array.isArray(entry)
    ? entry.map(value => value === '¤#,##0.00' ? '#,##0.00 ¤' : value)
    : entry);

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class ExtensionModule {
    // SuiteCRM 8.10.2 creates the module (createNgModule) but never calls
    // init(): the work is done here, when it is loaded at start.
    constructor(protected currencyFormatter: CurrencyFormatter) {
        registerLocaleData(symbolAfter(localeEn as unknown[]), LOCALE);
        this.currencyFormatter.locale = LOCALE;
        console.info('front-customizer : chargé, symbole monétaire après le montant');
    }

    init(): void {
    }
}
