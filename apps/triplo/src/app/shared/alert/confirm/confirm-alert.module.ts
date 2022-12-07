import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiButtonModule, TuiModeModule} from '@taiga-ui/core';
import {TuiSelectModule} from '@taiga-ui/kit';
import {ConfirmAlertComponent} from "./confirm-alert.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiModeModule,
    TuiSelectModule,
  ],
  declarations: [ConfirmAlertComponent],
  exports: [ConfirmAlertComponent],
})
export class ConfirmAlertModule {
}
