import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutModule} from './pages/about/about.module';
import {AboutComponent} from './pages/about/about.component';
import {ProjectHttpService} from './services/projects/project-http.service';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
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
  TuiHintModule, TuiDataListModule, TuiNotificationModule,
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
import {AuthInterceptor} from "./services/authentication/auth.interceptor";
import {UserHttpService} from "./services/user/user-http.service";
import {ProfileModule} from "./pages/profile/profile.module";
import {LikeHttpService} from "./services/likes/like-http.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AboutModule,
    ProfileModule,
    ProjectModule,
    FormsModule,
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
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiNotificationModule,
  ],
  providers: [
    ProjectHttpService,
    CommentHttpService,
    UserService,
    AuthHttpService,
    UserHttpService,
    TaskHttpService,
    LikeHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [RegisterComponent],
})
export class AppModule {
}
