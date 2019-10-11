import {Component, OnInit, Input, HostBinding, EventEmitter, 
    Output, AfterContentChecked, AfterViewChecked, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-tag-input',
  templateUrl: './taginput.component.html',
  styleUrls: ['./taginput.component.scss']
})
export class TaginputComponent implements OnInit, AfterViewInit {
  @Input() placeholder: string = 'Add a tag';
  @Input() items: Array<string>;
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @Output() tagRemoved: EventEmitter<string> = new EventEmitter();
  @HostBinding('class.ng2-tag-input-focus') isFocussed;

  public tagsList: Array<string>;
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;

  constructor() {}

  ngOnInit() {
    if (this.items) {
      this.tagsList = this.items;
    }
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode, 2);
  }

  ngAfterViewInit() {
    // If the user passes an undefined variable to ngModel this will warn
    // and set the value to an empty array
    if (!this.tagsList) {
      // console.warn('TagInputComponent was passed an undefined value in ngModel. Please make sure the variable is defined.');

      this.tagsList = new Array<string>();
      this.onChange(this.tagsList);
    }
  }

  inputChanged(event) {
    const key = event.keyCode;
    switch (key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13: // Enter
        // this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      default:
        this._resetSelected();
        break;
    }
  }

  inputBlurred(event) {
    // this.addOnBlur && this._addTags([this.inputValue]);
    this.isFocussed = false;
  }
  inputFocused(event) {
    this.isFocussed = true;
  }

  inputPaste(event) {
    const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    const pastedString = clipboardData.getData('text/plain');
    const tags = this._splitString(pastedString);
    const tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    tagString = tagString.trim();
    const tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private _addTags(tags: string[]) {
    const validTags = tags.filter((tag) => this._isTagValid(tag));
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {
    this.tagsList.splice(this.tagsList.indexOf(tagIndexToRemove), 1);
    this._resetSelected();
    this.tagRemoved.emit(tagIndexToRemove);
    // this.onChange(this.tagsList);
  }

  private _handleBackspace(value?: any) {
    if (!this.inputValue.length && this.tagsList.length) {
      //   if (!isBlank(this.selectedTag)) {
      //     this._removeTag(this.selectedTag);
      //   }
      //   else {
      //     this.selectedTag = this.tagsList.length - 1;
      //   }
    }
  }

  private _resetSelected(value?: any) {
    this.selectedTag = null;
  }

  private _resetInput(value?: any) {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => {};

  onTouched: (value) => any = () => {};

  writeValue(value: any) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }


}
