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
import {ProjectEditComponent} from "./pages/project/project-edit/project-edit.component";
import {LoginComponent} from "./pages/login/login.component";
import {TaskDetailComponent} from "./components/tasks/task-detail/task-detail.component";
import {TaskEditComponent} from "./components/tasks/task-edit/task-edit.component";

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
    {path: 'Projects/Create', component: ProjectEditComponent},
    {path: 'Projects/:id', component: ProjectDetailComponent},
    {path: 'Projects/:id/Edit', component: ProjectEditComponent},
    {path: 'Projects', component: ProjectOverviewComponent},

    {path: 'Projects/:projectId/Task/Create', component: TaskEditComponent},
    {path: 'Projects/:projectId/Task/:taskId', component: TaskDetailComponent},
    {path: 'Projects/:projectId/Task/:taskId/Edit', component: TaskEditComponent},
    {path: 'Projects/:projectId/Task/:taskId/Subtask/Create', component: TaskEditComponent},
    {path: 'Projects/:projectId/Task/:taskId/Subtask/:subtaskId', component: TaskDetailComponent},
    {path: 'Projects/:projectId/Task/:taskId/Subtask/:subtaskId/Edit', component: TaskEditComponent},
    {path: 'Task/:id/Subtask/:subtaskId/Edit', component: TaskEditComponent},
    {
      path: 'Login', component: LoginComponent
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
