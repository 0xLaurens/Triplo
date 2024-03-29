import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
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
import {AuthGuard} from "./services/guards/auth.guard";
import {ProfileDetailComponent} from "./pages/profile/profile-overview/profile-detail/profile-detail.component";
import {ProfileSettingsComponent} from "./pages/profile/profile-settings/profile-settings.component";
import {ProfileOverviewComponent} from "./pages/profile/profile-overview/profile-overview.component";
import {ProfileProjectsComponent} from "./pages/profile/profile-overview/profile-projects/profile-projects.component";
import {ProfileLikedComponent} from "./pages/profile/profile-overview/profile-liked/profile-liked.component";
import {
  ProjectDetailOverviewComponent
} from "./pages/project/project-detail/project-detail-overview/project-detail-overview.component";
import {
  ProjectDetailMembersComponent
} from "./pages/project/project-detail/project-detail-members/project-detail-members.component";
import {ProfileInviteComponent} from "./pages/profile/profile-overview/profile-invites/profile-invite.component";
import {ProjectSettingsComponent} from "./pages/project/project-settings/project-settings.component";
import {
  ProjectMembersManagementComponent
} from "./pages/project/project-settings/project-member-management/project-members-management.component";
import {
  ProjectDetailTasksComponent
} from "./pages/project/project-detail/project-detail-tasks/project-detail-tasks.component";
import {
  ProjectMembersInviteComponent
} from "./pages/project/project-settings/project-member-management/project-members-invite/project-members-invite.component";
import {ProjectMemberGuard} from "./services/guards/project-member.guard";
import {ProjectOwnerGuard} from "./services/guards/project-owner.guard";

const routes: Routes = [
    {path: "Profile/Settings", component: ProfileSettingsComponent, canActivate: [AuthGuard]},
    {
      path: 'Profile', component: ProfileOverviewComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        {path: "", component: ProfileDetailComponent},
        {path: "Projects", component: ProfileProjectsComponent},
        {path: "Liked", component: ProfileLikedComponent},
        {path: "Invites", component: ProfileInviteComponent},
      ]
    },

    {
      path: 'Profile/:userId', component: ProfileOverviewComponent, children: [
        {path: "", component: ProfileDetailComponent},
        {path: "Projects", component: ProfileProjectsComponent},
        {path: "Liked", component: ProfileLikedComponent},
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
    {path: 'Projects/Create', component: ProjectEditComponent},
    {
      path: 'Projects/:projectId', component: ProjectDetailComponent, children: [
        {path: '', component: ProjectDetailOverviewComponent},
        {
          path: 'Members', component: ProjectDetailMembersComponent,
        },
        {
          path: "Tasks",
          component: ProjectDetailTasksComponent,
          canActivate: [ProjectMemberGuard],
          canActivateChild: [ProjectMemberGuard],
          children: [
            {path: 'Create', component: TaskEditComponent},
          ]
        },
        {
          path: "Tasks/:taskId",
          component: TaskDetailComponent,
          canActivate: [ProjectMemberGuard],
          canActivateChild: [ProjectMemberGuard],
          children: [
            {path: 'Edit', component: TaskEditComponent},
            {path: 'Subtask/Create', component: TaskEditComponent},
            {path: 'Subtask/:subtaskId', component: TaskEditComponent}
          ]
        },
      ]
    },
    {
      path: 'Projects/:projectId/Settings',
      component: ProjectSettingsComponent,
      canActivate: [ProjectOwnerGuard],
      canActivateChild: [ProjectOwnerGuard],
      children: [
        {path: "", component: ProjectEditComponent},
        {
          path: "Members", component: ProjectMembersManagementComponent, children: [
            {path: "Invite", component: ProjectMembersInviteComponent}
          ]
        }
      ]
    },
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
