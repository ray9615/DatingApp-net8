import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
    private accountService = inject(AccountService);
    private toastr = inject(ToastrService);
    private router = inject(Router);
    // @Input() usersFromHomeComponet:any;
    @Output() cacelRegister = new EventEmitter();
    model:any = {}
    registerForm: FormGroup = new FormGroup({});
    validationErrors:string[] | undefined;

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(){
      this.registerForm = new FormGroup({
        username: new FormControl(Validators.required),
        password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
        confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')]),        
      });
      this.registerForm.controls['password'].valueChanges.subscribe({
          next:()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
      })
    }

    matchValues(matchTo:string):ValidatorFn{
      return (controll: AbstractControl)=>{
        return controll.value === controll.parent?.get(matchTo)?.value ? null 
        :{isMatching:true}
      }
    }

    register(){
      this.accountService.register(this.model).subscribe({
        // next: response => {
        //   console.log(response);
        //   this.cancel();
        // },
        next:_=>this.router.navigateByUrl('/members'),
        error:error=> this.validationErrors = error    
      })
      
    }

    cancel(){
      this.cacelRegister.emit(false);
      console.log('cancelled')
    }
}
