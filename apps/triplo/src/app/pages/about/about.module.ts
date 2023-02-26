import {NgModule} from '@angular/core';
import {AboutUserstoriesComponent} from "./about-userstories/about-userstories.component";
import {AboutProjectComponent} from "./about-project/about-project.component";
import {AboutEntityComponent} from "./about-entity/about-entity.component";
import {AboutComponent} from "./about.component";

@NgModule({
  declarations: [
    AboutComponent,
    AboutProjectComponent,
    AboutEntityComponent,
    AboutUserstoriesComponent,
  ],
  exports: [
    AboutComponent,
    AboutProjectComponent,
    AboutEntityComponent,
    AboutUserstoriesComponent,
  ],
  imports: [],
  providers: [],
  bootstrap: [AboutComponent],
})
export class AboutModule {
}
