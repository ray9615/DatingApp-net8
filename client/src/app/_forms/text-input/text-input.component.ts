import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './text-input.component.html'
})
export class TextInputComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    // Not needed as we're using [formControl]
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}