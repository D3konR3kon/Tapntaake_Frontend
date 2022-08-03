import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm: any = {
    name: null,
    email: null,
    password: null,
    img: null,
  }

  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''

  

  constructor(private router: Router, private location : Location, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const { name, email, password, img } = this.userForm

    this.authService.register(name, email, password, img)
      .subscribe({
        next: data => {
          console.log(data)
          this.isSuccessful = true
          this.isSignUpFailed = false
        },
        error: err => {
          this.errorMessage = err.error.message
          this.isSignUpFailed = true
        }
      })
      this.router.navigate(['/home'])
  }
}
