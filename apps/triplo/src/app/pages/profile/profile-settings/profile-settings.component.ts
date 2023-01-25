import {Component, Inject, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {Router} from "@angular/router";

@Component({
  selector: 'triplo-profile-settings',
  templateUrl: './profile-settings.component.html',
})
export class ProfileSettingsComponent implements OnInit {
  private userId: string | null;
  user$: Observable<UserInterface>;
  form!: FormGroup;
  loading = false;
  genders = ["Male", "Female", "Other"];

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private authService: AuthHttpService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserHttpService,
  ) {
  }

  async ngOnInit() {
    this.userId = this.authService.getUser()
    if (this.userId)
      this.user$ = this.userService.findUserById(this.userId)

    const formControls = {
      username: new FormControl({value: '', disabled: true}, []),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl([], [Validators.required])
    };
    this.form = this.fb.group(formControls)

    this.user$.subscribe(user => {
      this.form.controls['username'].setValue(user.username)
      this.form.controls['email'].setValue(user.email)
      this.form.controls['gender'].setValue(user.gender)
    })

  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const changes: Partial<UserInterface> = {
      ...this.form.value
    };

    this.loading = true;
    console.log(changes)
    if(this.userId)
      this.userService.updateUser(this.userId, changes).subscribe(
        user => {
          this.loading = false
          this.alertService.open(`Updated user: ${user.username}!`, {label: "Success!"}).subscribe()
          this.router.navigate(["/Profile"])
        }
      );
  }
}
