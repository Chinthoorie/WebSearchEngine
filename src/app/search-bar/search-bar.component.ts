import { Component, OnInit } from '@angular/core';
import {KwicService} from '../services/kwic-service/kwic.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  lines;
  orderedLines = [];
  csArray: any[];
  noiseRemovedArray: any[] = [];
  outputArray: any[];

  constructor(private kwicService: KwicService) { }

  ngOnInit() {
  }

  onClick() {
    this.orderedLines = [];
    this.csArray = [];
    this.noiseRemovedArray = [];
    this.outputArray = [];
    this.lines = this.lines.trim();
    if (this.lines !== null &&  this.lines !== '' && this.lines !== undefined) {
      const arr = [this.lines];
      this.kwicService.indexInput(arr).subscribe(data =>  {
        // this.orderedLines = data;
        this.csArray =  data[0];
        this.noiseRemovedArray = data[1];
        this.outputArray = data[2];
      });
    }
  }

}
