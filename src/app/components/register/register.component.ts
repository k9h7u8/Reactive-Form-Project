import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private firestore: Firestore,  private router: Router, private dataService: DataService ) {}

  repeatPass: string= 'none';

  registerForm = new FormGroup({
    first_name: new FormControl("", [Validators.required, Validators.minLength(2), 
    Validators.pattern("[a-zA-Z].*")]),
    last_name: new FormControl("", [Validators.required, Validators.minLength(2), 
      Validators.pattern("[a-zA-Z].*")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]),
    gender: new FormControl("", [Validators.required]),
    pwd: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    rpwd: new FormControl(""),
  });

  registerSubmit(){
    let value = { ...this.registerForm.value };
    console.log(value)

    if(this.pwd.value == this.rpwd.value){
      // Creating a Firestore collection reference
      const usersCollection = collection(this.firestore, 'users');
  
      // Adding a new document to the collection and letting Firestore generate a unique ID
      addDoc(usersCollection, { ...value })
        .then((docRef) => {
          console.log('User data saved to Firestore with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error saving user data to Firestore: ', error);
        });
        //data
        this.dataService.setRegisterData({...value});
    }else{
      this.repeatPass ='inline';
    }
  }

  //Get method
  get firstName(): FormControl{
    return this.registerForm.get("first_name") as FormControl;
  }

  get lastName(): FormControl{
    return this.registerForm.get("last_name") as FormControl;
  }

  get email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get mobile(): FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }

  get gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }

  get pwd(): FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }

  get rpwd(): FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }

}