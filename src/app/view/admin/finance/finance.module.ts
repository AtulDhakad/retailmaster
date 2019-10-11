import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinanceModuleRoutingModule } from './finance.routes';
import { FinanceOverviewComponent } from './overview/overview.component';
import { FinanceImportBillsComponent } from './import-bills/import-bills.component';
import { FinanceApproveComponent } from './approve/approve.component';
import { FinancePayComponent } from './pay/pay.component';
import { FinanceSuppliersComponent } from './suppliers/suppliers.component';
import { FinanceBillsComponent } from './bills/bills.component';
import { FinanceRecurringBillsComponent } from './recurring-bills/recurring-bills.component';
import { FinancePaymentsComponent } from './payments/payments.component';
import { FinanceHeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FinanceService } from '../../../services/finance.service';
import { ReconcileBankDepositComponent } from './reconcile-bank-deposit/reconcile-bank-deposit.component';
import { AppMaterialModuleModule } from 'src/app/app-material-module/app-material-module.module';
import { DownloadBankDepositsFromQboComponent } from './download-bank-deposits-from-qbo/download-bank-deposits-from-qbo.component';
import { UploadBankDepositsFromCsvComponent } from './upload-bank-deposits-from-csv/upload-bank-deposits-from-csv.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GridFilterPipe } from 'src/app/pipes/grid.filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppMaterialModuleModule,
        FinanceModuleRoutingModule,
        NgxDropzoneModule,
        ModalModule.forRoot()
    ],
    declarations: [
        FinanceHeaderComponent,
        FinanceOverviewComponent,
        FinanceImportBillsComponent,
        FinanceApproveComponent,
        FinancePayComponent,
        FinanceSuppliersComponent,
        FinanceBillsComponent,
        FinanceRecurringBillsComponent,
        FinancePaymentsComponent,
        ReconcileBankDepositComponent,
        DownloadBankDepositsFromQboComponent,
        UploadBankDepositsFromCsvComponent,
        GridFilterPipe
    ],
    providers: [FinanceService]
})
export class FinanceModule { }
