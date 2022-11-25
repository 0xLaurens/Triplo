import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {UserListComponent} from "./pages/user/user-list/user-list.component";
import {UserDetailComponent} from "./pages/user/user-detail/user-detail.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {HeroComponent} from "./pages/home/hero/hero.component";
import {AboutComponent} from "./pages/about/about.component";
import {AboutUserstoriesComponent} from "./pages/about/about-userstories/about-userstories.component";
import {AboutProjectComponent} from "./pages/about/about-project/about-project.component";
import {AboutEntityComponent} from "./pages/about/about-entity/about-entity.component";
import {ProjectOverviewComponent} from "./pages/project/project-overview/project-overview.component";
import {ProjectDetailComponent} from "./pages/project/project-detail/project-detail.component";

const routes: Routes = [
  {
    path: 'Users', component: UserListComponent, children: [
      {path: 'create', component: UserEditComponent},
      {path: ':id/edit', component: UserEditComponent},
      {path: ':id', component: UserDetailComponent},
    ]
  },
  {path: '', component: HeroComponent},
  {
    path: 'About', component: AboutComponent, children: [
      {path: 'Project', component: AboutProjectComponent},
      {path: 'Entity', component: AboutEntityComponent},
      {path: 'UserStories', component: AboutUserstoriesComponent}
    ]
  },
  {path: 'Projects', component: ProjectOverviewComponent},
  {path: 'Projects/:id', component: ProjectDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
