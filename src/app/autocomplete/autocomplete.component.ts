import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Pipe,
  PipeTransform,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterViewInit {

  @Input() suggestions: string[];
  @Output() selectOption = new EventEmitter();
  @Output() dismiss: EventEmitter<any> = new EventEmitter();

  @ViewChild('textInput', {read: ViewContainerRef, static: false}) textInput: ViewContainerRef;

  text: string;
  suggestionsVisible = true;
  focusIndex = -1;

  filter: FilterPipe = new FilterPipe();

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    this.textInput.element.nativeElement.focus();
    this.textInput.element.nativeElement.select();
  }

  doSelectOption(option) {
    this.selectOption.emit(option);
    this.suggestionsVisible = false;
    this.focusIndex = -1;
    this.text = option;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dismiss.emit();
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleGlobalKeyboardEvent(event: KeyboardEvent) {
    const key = event.keyCode;

    switch (key) {
      case 27: // ESCAPE
        this.suggestionsVisible = false;
        break;
    }
  }

  @HostListener('keyup', ['$event'])
  handleLocalKeyboardEvent(event: KeyboardEvent) {
    const key = event.keyCode;
    switch (key) {
      case 27: // ESCAPE
        this.suggestionsVisible = false;
        break;
      case 38: // UP
        if (this.focusIndex > 0) {
          this.focusIndex--;
        }
        break;
      case 40: // DOWN
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        }
        break;
      case 13: // ENTER
        if (this.focusIndex >= 0) {
          this.doSelectOption(this.filter.transform(this.suggestions, this.text)[this.focusIndex]);
        } else {
          this.doSelectOption(this.text);
        }
        break;
    }
  }
}

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!filter) {
      return [];
    }

    return items.filter(item => {
      return item.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  }
}
