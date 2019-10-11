import { Routes, RouterModule } from '@angular/router';

import { FinanceOverviewComponent } from './overview/overview.component';
import { FinanceImportBillsComponent } from './import-bills/import-bills.component';
import { FinanceApproveComponent } from './approve/approve.component';
import { FinancePayComponent } from './pay/pay.component';
import { FinanceSuppliersComponent } from './suppliers/suppliers.component';
import { FinanceBillsComponent } from './bills/bills.component';
import { FinanceRecurringBillsComponent } from './recurring-bills/recurring-bills.component';
import { FinancePaymentsComponent } from './payments/payments.component';
import { NgModule } from '@angular/core';
import { ReconcileBankDepositComponent } from './reconcile-bank-deposit/reconcile-bank-deposit.component';
import { DownloadBankDepositsFromQboComponent } from './download-bank-deposits-from-qbo/download-bank-deposits-from-qbo.component';
import { UploadBankDepositsFromCsvComponent } from './upload-bank-deposits-from-csv/upload-bank-deposits-from-csv.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: FinanceOverviewComponent },
    { path: 'import-bills', component: FinanceImportBillsComponent },
    { path: 'approve', component: FinanceApproveComponent },
    { path: 'pay', component: FinancePayComponent },
    { path: 'suppliers', component: FinanceSuppliersComponent },
    { path: 'bills', component: FinanceBillsComponent },
    { path: 'recurring-bills', component: FinanceRecurringBillsComponent },
    { path: 'payments', component: FinancePaymentsComponent },
    { path: 'reconcile_receivables/match_bank_deposits', component: ReconcileBankDepositComponent },
    { path: 'reconcile_receivables/download_bank_deosits_from_qbo', component: DownloadBankDepositsFromQboComponent },
    { path: 'reconcile_receivables/upload_bank_deposits_from_csv', component: UploadBankDepositsFromCsvComponent },

];
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class FinanceModuleRoutingModule { }
