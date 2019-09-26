import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class KwicService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/kwic/alphabetizer';
  }

  public indexInput(lines: string[]): Observable<string[][]> {

    let params = new HttpParams();
    params = params.append('lines', lines[0]);

    return this.http.get<string[][]>(this.usersUrl, {params});
  }
}
