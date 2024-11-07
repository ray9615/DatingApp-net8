import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    private accountService = inject(AccountService);
    private toastr = inject(ToastrService);
    // @Input() usersFromHomeComponet:any;
    @Output() cacelRegister = new EventEmitter();
    model:any = {}
    
    register(){
      this.accountService.register(this.model).subscribe({
        next: response => {
          console.log(response);
          this.cancel();
        },
        error:error=> this.toastr.error(error.error)      
      })
      
    }

    cancel(){
      this.cacelRegister.emit(false);
      console.log('cancelled')
    }
}
