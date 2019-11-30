import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KwicService} from './services/kwic-service/kwic.service';
import { HttpClientModule} from '@angular/common/http';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {DataStore} from './util/data-store.service';
import {AutocompleteModule} from './autocomplete/autocomplete.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    AutocompleteModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [ KwicService, DataStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
