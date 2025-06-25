import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private authService:AuthService) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    });
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        localStorage.setItem("token",response.data.token);
      },errorResponse=>{
        this.toastrService.error("api hatası",errorResponse.error), // must be refactored
        console.log(errorResponse);
      })
    }else{
      this.toastrService.error("Email veya şifre eksik");
    }
  }

}
