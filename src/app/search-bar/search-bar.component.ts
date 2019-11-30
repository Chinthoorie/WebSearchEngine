import { Component, OnInit } from '@angular/core';
import {KwicService} from '../services/kwic-service/kwic.service';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DataKey, DataStore} from '../util/data-store.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  lines;
  line = '';
  orderedLines = [];
  csArray: any[];
  noiseRemovedArray: any[] = [];
  outputArray: any[];

  constructor(private kwicService: KwicService, private dataStore: DataStore) { }

  myControl = new FormControl();
  options: string[] = [];
  results: string[] = [];
  filteredOptions: Observable<string[]>;
  wordsObsv: Subscription = new Subscription();
  resultsObsv: Subscription = new Subscription();

  ngOnInit() {

    this.wordObserver();
    this.resultsObserver();
    // this.options = [ 'software', 'food', 'ut', 'soft', 'softw'];
    console.log(this.options);
    this.kwicService.getWord('');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  displayFn(word?: string): string | undefined {
    return word ? word : '';
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let dummy = this.options ? this.options.filter(option => option.toLowerCase().includes(filterValue)) : [];
    console.log(dummy);
    return dummy;
  }

  private wordObserver() {
    this.dataStore.set(DataKey.autofillWords, null, true);
    this.wordsObsv = this.dataStore.get(DataKey.autofillWords).subscribe( data => {
      this.options = data;
      // console.log(this.options);
      this.wordsObsv.unsubscribe();
    });

  }

  private resultsObserver() {
    this.dataStore.set(DataKey.urls, null, true);
    this.resultsObsv = this.dataStore.get(DataKey.urls).subscribe( data => {
      this.results = data;
      console.log('this.results', this.results);
      this.resultsObsv.unsubscribe();
    });

  }

  onClick() {
    // this.orderedLines = [];
    // this.csArray = [];
    // this.noiseRemovedArray = [];
    // this.outputArray = [];
    this.line = this.myControl.value;
    this.line = this.line.trim();
    if (this.line !== null &&  this.line !== '' && this.line !== undefined) {
      this.resultsObserver();
      this.kwicService.getSearchResults(this.line);
    }
  }

}
