import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextMaskModule } from 'angular2-text-mask';

import { TimePickerComponent } from './time-picker.component';
import { WheelBlockModule } from './wheel-block/wheel-block.module';
import { WheelBlockComponent } from './wheel-block/wheel-block.component';

@NgModule({
   declarations: [ TimePickerComponent ],
   imports: [
      OverlayModule,
      TextMaskModule,
      WheelBlockModule,
   ],
   exports: [ TimePickerComponent ],
   providers: [ DecimalPipe ],
   entryComponents: [ WheelBlockComponent ],
})
export class TimePickerModule { }
