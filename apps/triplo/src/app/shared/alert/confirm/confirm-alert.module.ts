import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiAlertModule, TuiButtonModule, TuiModeModule} from '@taiga-ui/core';
import {TuiSelectModule} from '@taiga-ui/kit';
import {ConfirmAlertComponent} from "./confirm-alert.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiModeModule,
    TuiSelectModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  declarations: [ConfirmAlertComponent],
  exports: [ConfirmAlertComponent],
})
export class ConfirmAlertModule {
}
