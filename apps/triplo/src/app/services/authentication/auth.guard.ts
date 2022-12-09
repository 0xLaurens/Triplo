import {Router, UrlTree} from "@angular/router";
import {CanActivate} from "@nestjs/common";
import {AuthHttpService} from "./auth-http.service";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(AuthHttpService) private auth: AuthHttpService
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  canActivate(): boolean | UrlTree {
    const token = this.auth.getToken()
    if (token) {
      return true;
    }

    return this.router.parseUrl("/Login");
  }
}
