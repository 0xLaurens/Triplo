import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AboutModule} from './pages/about/about.module';
import {ProjectHttpService} from './services/projects/project-http.service';
import {TuiRootModule} from '@taiga-ui/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommentHttpService} from './services/comments/comment-http.service';
import {UserService} from './services/user/user.service';
import {AuthHttpService} from './services/authentication/auth-http.service';
import {TaskHttpService} from './services/task/task-http.service';
import {ProjectModule} from './pages/project/project.module';
import {AuthInterceptor} from "./services/authentication/auth.interceptor";
import {UserHttpService} from "./services/user/user-http.service";
import {ProfileModule} from "./pages/profile/profile.module";
import {LikeHttpService} from "./services/likes/like-http.service";
import {AuthModule} from "./pages/auth/auth.module";
import {HomeModule} from "./pages/home/home.module";
import {NavbarModule} from "./shared/navbar/navbar.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    TuiRootModule,
    AboutModule,
    AuthModule,
    BrowserModule,
    HomeModule,
    AboutModule,
    ProfileModule,
    AppRoutingModule,
    ProjectModule,
    NavbarModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
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
  exports: [],
})
export class AppModule {
}
