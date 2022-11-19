import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserListComponent} from './pages/user/user-list/user-list.component';
import {UserDetailComponent} from './pages/user/user-detail/user-detail.component';
import {UserEditComponent} from './pages/user/user-edit/user-edit.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HeroComponent} from './pages/home/hero/hero.component';
import {NgbDatepickerModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import { UserModule } from "./models/User/user.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    HeroComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    AppRoutingModule,
    NgbNavModule,
    UserModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
