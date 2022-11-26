import {NgModule} from "@angular/core";
import {ProjectOverviewComponent} from "./project-overview/project-overview.component";
import {ProjectCardListComponent} from "./project-card-list/project-card-list.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectHttpService} from "../../services/projects/project-http.service";
import {CommonModule} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiAlertModule, TuiAlertService, TuiRootModule} from "@taiga-ui/core";


@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent
  ],
  exports: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent
  ],
  imports: [
    TuiRootModule,
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
    ReactiveFormsModule,
    TuiAlertModule
  ],
  providers: [ProjectHttpService]
})

export class ProjectModule {}