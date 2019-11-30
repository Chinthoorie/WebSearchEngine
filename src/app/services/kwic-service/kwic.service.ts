import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataKey, DataStore} from '../../util/data-store.service';

@Injectable()
export class KwicService {

  private usersUrl: string;
  private wordsUrl: string;
  private resultsUrl: string;

  constructor(private http: HttpClient, private dataStore: DataStore) {
    this.usersUrl = 'http://localhost:8081/kwic/alphabetizer';
    this.wordsUrl = 'http://localhost:8081/kwic/autofill';
    this.resultsUrl = 'http://localhost:8081/kwic/search';
  }

  public indexInput(lines: string[]): Observable<string[][]> {

    let params = new HttpParams();
    params = params.append('lines', lines[0]);

    this.http.get<string[][]>(this.usersUrl, {params}).subscribe( res => {
      this.dataStore.set(DataKey.shiftedLines, res);
    });

    return this.dataStore.get(DataKey.shiftedLines, true);
  }

  public getWord(word: string) {

    let params = new HttpParams();
    params = params.append('word', word);

    this.http.get<string[]>(this.wordsUrl, {params}).subscribe( res => {
      this.dataStore.set(DataKey.autofillWords, res);
    });

    return this.dataStore.get(DataKey.autofillWords, true);
  }

  public getSearchResults(line: string, keyword: string): Observable<URL[]> {

    let params = new HttpParams();
    params = params.append('line', line);
    params = params.append('keyword', keyword);

    this.http.get<URL[]>(this.resultsUrl, {params}).subscribe( res => {
      this.dataStore.set(DataKey.urls, res);
    });

    return this.dataStore.get(DataKey.urls, true);
  }
}
