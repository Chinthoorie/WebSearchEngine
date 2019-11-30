import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent, FilterPipe } from './autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AutocompleteComponent
  ],
  declarations: [
    AutocompleteComponent,
    FilterPipe
  ]
})
export class AutocompleteModule {
}
