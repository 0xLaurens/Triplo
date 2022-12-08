import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {Router} from "@angular/router";
import {TuiValidationError} from "@taiga-ui/cdk";


@Component({
  selector: 'triplo-register',
  templateUrl: './register.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegisterComponent implements OnInit {
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
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      passwordConfirm: new FormControl("", Validators.required)
    }, {validators: this.passwordMatchingValidator})
  }

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    return password?.value === passwordConfirm?.value ? null : {passwd: new TuiValidationError(`Passwords have to match`),};
  }


  get f() {
    return this.form.controls;
  }

  register() {
    const cred = this.form.value;
    this.auth.register(cred.email, cred.password).subscribe(
        () => {
          this.router.navigateByUrl("/Login");
        },
        err => {
          this.alertService.open("Registration failed!", {label: "Error", status: TuiNotification.Error}).subscribe()
        });
  }
}
