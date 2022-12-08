import {Component, Inject, OnInit} from '@angular/core';
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'triplo-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})

export class NavbarComponent implements OnInit {
  $loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = this.auth.getToken()
    if (token) {
      this.auth.$loggedInStatus.next(true)
    }
    this.auth.$loggedInStatus.subscribe(value => this.$loggedIn.next(value));
  }

  signOut() {
    this.auth.signOut()
    this.auth.$loggedInStatus.next(false);
    this.router.navigate(["/"])
  }
}


