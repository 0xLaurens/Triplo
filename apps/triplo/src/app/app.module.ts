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
import { FormsModule } from '@angular/forms';
import { AboutModule } from './pages/about/about.module';
import { AboutComponent } from './pages/about/about.component';
import { ProjectHttpService } from './services/projects/project-http.service';
import { ProjectModule } from './pages/project/project.module';
import {
  TuiAlertModule,
  TuiRootModule,
  TuiDialogModule,
  TuiThemeNightModule,
  TuiModeModule, TuiLinkModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './components/comment/comment.component';
import {TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    CommentComponent,
  ],
  imports: [
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
  ],
  providers: [ProjectHttpService],
  bootstrap: [AppComponent],
  exports: [
    CommentComponent
  ]
})
export class AppModule {}
