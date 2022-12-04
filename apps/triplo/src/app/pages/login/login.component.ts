import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthHttpService} from "../../services/authentication/auth-http.service";

@Component({
  selector: 'triplo-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
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
    const login = this.form.value;
  }
}
