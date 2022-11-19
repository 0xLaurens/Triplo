import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {UserListComponent} from "./pages/user/user-list/user-list.component";
import {UserDetailComponent} from "./pages/user/user-detail/user-detail.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {HeroComponent} from "./pages/home/hero/hero.component";
import {AboutComponent} from "./pages/about/about.component";

const routes: Routes = [
  {
    path: 'Users', component: UserListComponent, children: [
      {path: 'create', component: UserEditComponent},
      {path: ':id/edit', component: UserEditComponent},
      {path: ':id', component: UserDetailComponent},
    ]
  },
  {path: '', component: HeroComponent},
  {path: 'About', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
