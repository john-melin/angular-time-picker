import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerOverlayComponent } from './time-picker/time-picker-overlay/time-picker-overlay.component';
import { TimeUnitWheelComponent } from './time-picker/time-picker-overlay/time-unit-wheel/time-unit-wheel.component';
import { TimeUnitWheelOptionComponent } from './time-picker/time-picker-overlay/time-unit-wheel/time-unit-wheel-option/time-unit-wheel-option.component';

@NgModule({
   declarations: [
      AppComponent,
      TimeUnitWheelOptionComponent,
      TimeUnitWheelComponent,
      TimePickerOverlayComponent,
      TimePickerComponent
   ],
   imports: [
      BrowserModule,
      OverlayModule,
      ScrollingModule,
      TextMaskModule
   ],
   providers: [ DecimalPipe ],
   entryComponents: [ TimePickerOverlayComponent ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
