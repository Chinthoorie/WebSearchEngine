import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import {KwicService} from './services/kwic-service/kwic.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [ KwicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
