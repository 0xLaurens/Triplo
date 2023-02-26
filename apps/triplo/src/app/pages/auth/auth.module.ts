import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule, TuiInputPasswordModule,
  TuiIslandModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiButtonModule,
  TuiErrorModule, TuiLinkModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AsyncPipe, CommonModule} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputPasswordModule,
    TuiNotificationModule,
    TuiButtonModule,
    RouterLinkWithHref,
    TuiLinkModule
  ],
})

export class AuthModule {}
