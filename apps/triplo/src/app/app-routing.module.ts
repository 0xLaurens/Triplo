import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {UserListComponent} from "./pages/user/user-list/user-list.component";
import {UserDetailComponent} from "./pages/user/user-detail/user-detail.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {HeroComponent} from "./pages/home/hero/hero.component";

const routes: Routes = [
  {
    path: 'Users', component: UserListComponent, children: [
      {path: ':id', component: UserDetailComponent},
      {path: ':id/edit', component: UserEditComponent}
    ]
  },
  { path: '', component: HeroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
