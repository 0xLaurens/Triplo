import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Component({
  selector: 'triplo-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private fb: FormBuilder,
    private auth: AuthHttpService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  login() {
    const cred = this.form.value;

    this.auth.login(cred.email, cred.password)
      .subscribe(
        () => {
          this.router.navigateByUrl("/");
        },
        err => {
          this.alertService.open("Login failed!", {label: "Error", status: TuiNotification.Error}).subscribe()
        }
      )
  }
}
