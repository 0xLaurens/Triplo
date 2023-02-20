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
import {LoginComponent} from "./pages/auth/login/login.component";
import {TaskDetailComponent} from "./components/tasks/task-detail/task-detail.component";
import {TaskEditComponent} from "./components/tasks/task-edit/task-edit.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AuthGuard} from "./services/authentication/auth.guard";
import {ProfileDetailComponent} from "./pages/profile/profile-detail/profile-detail.component";
import {ProfileSettingsComponent} from "./pages/profile/profile-settings/profile-settings.component";
import {ProfileOverviewComponent} from "./pages/profile/profile-overview/profile-overview.component";
import {ProfileProjectsComponent} from "./pages/profile/profile-projects/profile-projects.component";
import {ProfileLikedComponent} from "./pages/profile/profile-liked/profile-liked.component";
import {
  ProjectDetailOverviewComponent
} from "./pages/project/project-detail/project-detail-overview/project-detail-overview.component";
import {
  ProjectDetailMembersComponent
} from "./pages/project/project-detail/project-detail-members/project-detail-members.component";

const routes: Routes = [
    {
      path: 'Users', component: UserListComponent, canActivate: [AuthGuard], children: [
        {path: 'create', component: UserEditComponent, canActivate: [AuthGuard]},
        {path: ':id/edit', component: UserEditComponent, canActivate: [AuthGuard]},
        {path: ':id', component: UserDetailComponent, canActivate: [AuthGuard]},
      ]
    },
    {path: "Profile/Settings", component: ProfileSettingsComponent, canActivate: [AuthGuard]},


    {
      path: 'Profile', component: ProfileOverviewComponent, canActivate: [AuthGuard], children: [
        {path: "", component: ProfileDetailComponent, canActivate: [AuthGuard]},
        {path: "Projects", component: ProfileProjectsComponent, canActivate: [AuthGuard]},
        {path: "Liked", component: ProfileLikedComponent, canActivate: [AuthGuard]},
      ]
    },

    {
      path: 'Profile/:id', component: ProfileOverviewComponent, canActivate: [AuthGuard], children: [
        {path: "", component: ProfileDetailComponent, canActivate: [AuthGuard]},
        {path: "Projects", component: ProfileProjectsComponent, canActivate: [AuthGuard]},
        {path: "Liked", component: ProfileLikedComponent, canActivate: [AuthGuard]},
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
    {path: 'Projects/Create', component: ProjectEditComponent, canActivate: [AuthGuard]},
    {
      path: 'Projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard], children: [
        {path: '', component: ProjectDetailOverviewComponent},
        {path: 'Members', component: ProjectDetailMembersComponent},
      ]
    },
    {path: 'Projects/:id/Edit', component: ProjectEditComponent, canActivate: [AuthGuard]},

    {path: 'Projects/:projectId/Task/Create', component: TaskEditComponent, canActivate: [AuthGuard]},
    {path: 'Projects/:projectId/Task/:taskId', component: TaskDetailComponent, canActivate: [AuthGuard]},
    {path: 'Projects/:projectId/Task/:taskId/Edit', component: TaskEditComponent, canActivate: [AuthGuard]},
    {path: 'Projects/:projectId/Task/:taskId/Subtask/Create', component: TaskEditComponent, canActivate: [AuthGuard]},
    {
      path: 'Projects/:projectId/Task/:taskId/Subtask/:subtaskId',
      component: TaskDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'Projects/:projectId/Task/:taskId/Subtask/:subtaskId/Edit',
      component: TaskEditComponent,
      canActivate: [AuthGuard]
    },
    {path: 'Task/:id/Subtask/:subtaskId/Edit', component: TaskEditComponent, canActivate: [AuthGuard]},
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent}

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
