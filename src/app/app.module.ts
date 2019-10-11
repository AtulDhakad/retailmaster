import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupByPipe } from './group-by.pipe';
import { SharedService } from './services/shared.service';
import { SidenavService } from './services/sidenav.service';
import { LoginComponent } from './view/login/login.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { SidenavMegamenuComponent } from './view/sidenav-megamenu/sidenav-megamenu.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SidenavMegamenuComponent,
        GroupByPipe,
        NavbarComponent,
    ],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        AppRoutingModule,
        ToastrModule.forRoot({ preventDuplicates: true, enableHtml: true, }),

    ],
    providers: [SidenavService, SharedService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
