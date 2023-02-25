import {CanActivateChild, Router} from "@angular/router";
import {CanActivate} from "@nestjs/common";
import {AuthHttpService} from "./auth-http.service";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    @Inject(AuthHttpService) private auth: AuthHttpService
  ) {
  }


  canActivate(): boolean {
    const token = this.auth.getToken()
    if (token) {
      return true;
    }

    this.router.parseUrl("/Login");
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
