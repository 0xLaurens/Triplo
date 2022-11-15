import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'triplo-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})

export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: "Home",
        routerLink: "/"
      },
      {
        label: "Users",
        routerLink: "Users"
      }
    ]
  }

  ngOnInit(): void {
  }
}


