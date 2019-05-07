import { NgModule } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';

import { TimeWheelComponent } from './time-wheel/time-wheel.component';
import { TimeWheelOptionComponent } from './time-wheel/time-wheel-option/time-wheel-option.component';
import { WheelBlockComponent } from './wheel-block.component';

@NgModule({
   imports: [ CommonModule ],
   declarations: [
      TimeWheelOptionComponent,
      TimeWheelComponent,
      WheelBlockComponent
   ],
   exports: [ WheelBlockComponent ],
   providers: [ DecimalPipe ],
})
export class WheelBlockModule { }
