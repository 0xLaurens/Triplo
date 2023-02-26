import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiDialog} from '@taiga-ui/cdk';
import {TuiAlertOptions} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'triplo-alert-confirm',
  templateUrl: `confirm-alert.template.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAlertComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialog<TuiAlertOptions<void>, boolean>,
  ) {
  }

  ok(): void {
    this.context.completeWith(true);
  }

  cancel(): void {
    this.context.completeWith(false);
  }
}
