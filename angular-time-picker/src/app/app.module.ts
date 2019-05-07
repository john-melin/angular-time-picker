import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TimePickerModule } from './time-picker/time-picker.module';

@NgModule({
   declarations: [ AppComponent ],
   imports: [
      CommonModule,
      BrowserModule,
      TimePickerModule
   ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
