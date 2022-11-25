import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './models/User/user.module';
import { FormsModule } from '@angular/forms';
import { AboutModule } from './pages/about/about.module';
import { AboutComponent } from './pages/about/about.component';
import {ProjectHttpService} from "./services/projects/project-http.service";
import {ProjectModule} from "./pages/project/project.module";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
  ],
  imports: [
    AboutModule,
    ProjectModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    AppRoutingModule,
    NgbNavModule,
    UserModule,
    NgbDatepickerModule,
  ],
  providers: [ProjectHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
