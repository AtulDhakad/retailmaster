
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from '../../models/nav';

@Component({
    selector: 'app-sidenav-megamenu',
    templateUrl: './sidenav-megamenu.component.html',
    styleUrls: ['./sidenav-megamenu.component.scss']
})
export class SidenavMegamenuComponent implements OnInit, OnChanges, OnDestroy {
    @Input() item: Nav = {};
    @Input() open: boolean;
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private router: Router) { }

    ngOnChanges(changes: any): void {
        this.item = this.item || {};
    }

    navigate(route: string): void {
        console.log('route', route);
        this.router.navigate([route]);
    }

    closeMegaMenu(): void {
        this.open = false;
        this.onClose.emit(true);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.onClose.unsubscribe();
    }
}
