import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void { }

  signOut(): void {
    localStorage['loggedInUser'] = undefined;
    this.router.navigate(['/login']);
  }

  openProfileMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
}
