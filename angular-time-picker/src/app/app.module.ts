import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DecimalPipe, CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TimePickerModule } from './time-picker/time-picker.module';

@NgModule({
   declarations: [ AppComponent ],
   imports: [
      CommonModule,
      BrowserModule,
      TimePickerModule
   ],
   providers: [ DecimalPipe ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
