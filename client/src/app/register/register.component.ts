import { Component, EventEmitter, inject,input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent, 
    FormsModule, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
    private accountService = inject(AccountService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    @Output() cacelRegister = new EventEmitter();
    registerForm: FormGroup = new FormGroup({});
    maxDate = new Date();
    validationErrors:string[] | undefined;

    ngOnInit(): void {
        this.initializeForm();
        this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
    }

    initializeForm(){
      this.registerForm = this.fb.group({
        gender:['male'],
        username:['',Validators.required],
        knownAs:['',Validators.required],
        dateOfBirth:['',Validators.required],
        city:['',Validators.required],
        country:['',Validators.required],
        password:['',[
            Validators.required
            ,Validators.minLength(4)
            ,Validators.maxLength(8)
          ]],
        confirmPassword:['',
          [
            Validators.required,
            this.matchValues('password')
          ]],        
      });
      this.registerForm.controls['password'].valueChanges.subscribe({
          next:()=> 
            this.registerForm.controls['confirmPassword']
          .updateValueAndValidity()
      })
    }

    matchValues(matchTo:string):ValidatorFn{
      return (controll: AbstractControl)=>{
        return controll.value === controll.parent?.get(matchTo)?.value ? null 
        :{isMatching:true}
      }
    }

    register(){
      // this.accountService.register(this.model).subscribe({       
      //   next:_=>this.router.navigateByUrl('/members'),
      //   error:error=> this.validationErrors = error    
      // })
      const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
      this.registerForm.patchValue({dateOfBirth:dob});
      if (this.registerForm.valid) {
        this.accountService.register(this.registerForm.value).subscribe({
          next: () => this.router.navigateByUrl('/members'),
          error: error => this.validationErrors = error
        });
      }
    }

    cancel(){
      this.cacelRegister.emit(false);
      console.log('cancelled')
    }

    private getDateOnly(dob:string | undefined){
      if(!dob) return ;
      return new Date(dob).toISOString().slice(0,10);
    }
}
