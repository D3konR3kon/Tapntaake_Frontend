import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userForm:any = FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("");
  number: FormControl = new FormControl("");
	honeypot: FormControl = new FormControl('') // we will use this to prevent spam
  message: FormControl = new FormControl('')
  
  

  submitted: boolean = false; // show and hide the success message
	isLoading: boolean = false; // disable the submit button if we're loading
	responseMessage?: string; // the response message to show to the user
  servicefee  = 2
  totalAmount = JSON.parse(`${localStorage.getItem('Total')}`)
  totalItems:any 
  dataForm = JSON.parse(`${localStorage.getItem('form')}`)
  totalItem:any
  
  constructor(private router : Router, private cartService: CartService, private http: HttpClient,private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: this.name,
      email: this.email,
      message: this.message,
      number: this.number,
      honeypot: this.honeypot,
      
    });
   }

   

  ngOnInit(): void {
   console.log(this.dataForm)
   this.totalItems = JSON.parse(`${localStorage.getItem('for')}`)? JSON.parse(`${localStorage.getItem('for')}`): []
   console.log(this.totalItems)
  }
//   signIn() {
//     let formData = JSON.parse(`${localStorage.getItem('users')}`);
//     let exist = formData.length && 
//     JSON.parse(`${localStorage.getItem('formData')}`).some((data: any) =>{data.email == this.email && data.password == this.password});
//     if(!exist){
//         alert("Incorrect login credentials");
//     }
//     else{
//       this.router.navigate(['/home'])
//     }
   
// }
resetting() {
  this.userForm.reset()
}
onSubmit(): void {
  console.log("Just Testing")
  setTimeout(() => {
    window.location.replace('/thankyou')
  }, 3500);
  if (this.userForm.status == "VALID" && this.honeypot.value == "") {
    this.userForm.disable(); // disable the form if it's valid to disable multiple submissions
    var formData: any = new FormData();
   
    formData.append("name", this.userForm.get("name")?.value);
    formData.append("number", this.userForm.get("number")?.value);
    formData.append("email", this.userForm.get("email")?.value);
    formData.append("total", this.totalAmount + this.servicefee);
    
    this.totalItems.map((item: any) => {
      formData.append("item", item.name)
      formData.append("quantity", item.qty)

    })
    
    // formData.append("total", this.totalItems.name);
    
    
    
    this.isLoading = true; // sending the post request async so it's in progress
    this.submitted = false; // hide the response message on multiple submits
    this.http.post("https://script.google.com/macros/s/AKfycbyWolx3O1O978sIiYm94R3OA1wPqb5Xzny9dRx9yS4t04-YOg6wogEvm5oKGX6Q0Zfn/exec", formData).subscribe(
      (response:any) => {
        // choose the response message
        if (response["result"] == "success") {
          this.responseMessage = "Thanks for the message! I'll get back to you soon!";
        } else {
          this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
        }
        this.userForm.enable(); // re enable the form after a success
        this.submitted = true; // show the response message
        this.isLoading = false; // re enable the submit button
        console.log(response);
      },
      (error) => {
        this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
        this.userForm.enable(); // re enable the form after a success
        this.submitted = true; // show the response message
        this.isLoading = false; // re enable the submit button
        console.log(error);
      }
    );
  }
}
}