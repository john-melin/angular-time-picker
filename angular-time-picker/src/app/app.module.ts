import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DecimalPipe, CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { WheelBlockModule } from './time-picker/wheel-block/wheel-block.module';
import { WheelBlockComponent } from './time-picker/wheel-block/wheel-block.component';

@NgModule({
   declarations: [
      AppComponent,
      TimePickerComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      OverlayModule,
      TextMaskModule,
      WheelBlockModule,
   ],
   providers: [ DecimalPipe ],
   entryComponents: [ WheelBlockComponent ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
