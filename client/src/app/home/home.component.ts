import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   registerMode = false;

   registerToggle(){
    this.registerMode = !this.registerMode
   }
   cancelRegisterMode(event:boolean){
     this.registerMode = event;
   }
  //  getUsers(){
  //   this.http.get('http://localhost:5208/api/User').subscribe({
  //     next: response => this.users = response,
  //     error: error => console.log(error),
  //     complete:()=> console.log('完成')
      
  //   })
  //}

}
