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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutModule} from './pages/about/about.module';
import {AboutComponent} from './pages/about/about.component';
import {ProjectHttpService} from './services/projects/project-http.service';
import {
  TuiAlertModule,
  TuiRootModule,
  TuiDialogModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiLinkModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiSvgModule,
  TuiHintModule, TuiDataListModule,
} from '@taiga-ui/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  TuiCarouselModule, TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiInputTagModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiPaginationModule, TuiSelectModule,
  TuiTagModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import {CommentHttpService} from './services/comments/comment-http.service';
import {UserService} from './services/user/user.service';
import {LoginComponent} from './pages/auth/login/login.component';
import {AuthHttpService} from './services/authentication/auth-http.service';
import {TaskHttpService} from './services/task/task-http.service';
import {ProjectModule} from './pages/project/project.module';
import {RegisterComponent} from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    ProjectModule,
    BrowserAnimationsModule,
    AboutModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    AppRoutingModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiLinkModule,
    TuiTagModule,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiFieldErrorPipeModule,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiSvgModule,
    TuiHintModule,
    TuiInputTagModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiMarkerIconModule,
    TuiDataListWrapperModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
  ],
  providers: [
    ProjectHttpService,
    CommentHttpService,
    UserService,
    AuthHttpService,
    TaskHttpService,
  ],
  bootstrap: [AppComponent],
  exports: [RegisterComponent],
})
export class AppModule {
}
