import {CanActivateChild, Router} from "@angular/router";
import {CanActivate} from "@nestjs/common";
import {AuthHttpService} from "../authentication/auth-http.service";
import {Inject, Injectable} from "@angular/core";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    @Inject(AuthHttpService) private auth: AuthHttpService,
    @Inject(TuiAlertService) private alertService: TuiAlertService
  ) {
  }


  canActivate(): boolean {
    const token = this.auth.getToken()
    if (token) {
      return true;
    }

    this.alertService.open('You need to be logged in to access this page!', {
      label: "Warning!",
      status: TuiNotification.Warning,
      autoClose: 5000
    }).subscribe()
    this.router.navigate(["/Login"]);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
