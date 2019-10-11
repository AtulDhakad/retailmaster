
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Nav } from './models/nav';
import { SharedService } from './services/shared.service';
import { SidenavService } from './services/sidenav.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
    currentYear: number;
    navs: Nav[] = [];
    url: string = '';
    openMegaMenu: boolean = false;
    selectedNavItem: Nav = {};
    selectedIndex: number = undefined;
    isLogin: boolean = false;
    currentRoute: string = '';
    currentModule: string = '';
    isFullScreenStore: boolean = false;
    modules: string[] = ['dashboard', 'sales', 'channels'];
    routerSubscription: Subscription;
    notifierSubscription: Subscription;

    title = 'retailmaster';
    constructor(private sidenavService: SidenavService, private router: Router, private sharedService: SharedService) {
        this.getMenuItem();
        this.routerSubscription = this.router.events.subscribe(evt => {
            if (evt instanceof NavigationEnd) {
                this.refreshMainApp();
            }
        });
        this.notifierSubscription = this.sharedService.getFullScreenNotifier().subscribe(data => {
            this.isFullScreenStore = data;
        });
    }

    ngOnInit(): void {
        const date = new Date();
        this.currentYear = date.getUTCFullYear();
        this.sidenavService.itemMessage.subscribe(message => {
            this.getMenuItem();
        });
    }

    getMenuItem() {
        this.sidenavService.getNavItems().subscribe(navs => {
            return this.navs = navs;
        });
    }

    onOpenMegaMenu(idx: number): void {
        if (!this.openMegaMenu) {
            this.selectedNavItem = this.navs[idx];
            this.openMegaMenu = true;
            this.selectedIndex = idx;
        }
    }

    updateMegaMenu(i: number): void {
        if (this.openMegaMenu) {
            this.selectedNavItem = this.navs[i];
            this.selectedIndex = i;
        }
    }

    closeMegaMenu($event): void {
        this.selectedNavItem = {};
        this.openMegaMenu = false;
        this.selectedIndex = undefined;
    }

    hasRoute(nav, url): boolean {
        let isFound = false;
        nav.submenu.forEach(menu => {
            menu.submenu.forEach(leafMenu => {
                if (leafMenu.route === url) {
                    isFound = true;
                }
            });
        });
        return isFound;
    }
    extractRoute(url: string): void {
        const u: any = url.split('/');
        if (u[1]) {
            this.currentRoute = url; // "/" + u[1];
            const idx: number = this.modules.indexOf(u[1]);
            if (idx >= 0) {
                this.currentModule = this.modules[idx];
            } else {
                this.currentModule = '';
            }
        }
    }

    private refreshMainApp(): void {
        this.url = this.router.url;
        if (this.url === '/login') {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
        this.extractRoute(this.url);
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
        if (this.notifierSubscription) {
            this.notifierSubscription.unsubscribe();
        }
    }

}
