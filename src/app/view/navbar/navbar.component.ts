import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  dropDownOpen: boolean = false;

  constructor(private router: Router) {}

  logout(): void {
    this.dropDownOpen = false;
    this.router.navigate(['/login']);
  }

  openDropDown(): void {
    this.dropDownOpen = true;
  }

  @HostListener('document:click', ['$event'])
  closeDropDown($event): void {
    if (!$event.isProfileDropDown) {
      this.dropDownOpen = false;
    }
  }
}
