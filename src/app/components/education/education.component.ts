import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  constructor(private firestore: Firestore,  private router: Router, private fb: FormBuilder, private dataService: DataService  ) {}

  EducationForm = this.fb.group({
    educationDetails: this.fb.array([
      this.fb.group({
        degree: [''],
        specification: [''],
        institute: [''],
        location: [''],
        cgpa: [''],
      })
    ])
  });

  educationSubmit(){
    let value = { ...this.EducationForm.value };
    console.log(value);

    const educationCollection = collection(this.firestore, 'education');
  
      // Adding a new document to the collection and letting Firestore generate a unique ID
      addDoc(educationCollection , { ...value })
        .then((docRef) => {
          console.log('User data saved to Firestore with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error saving user data to Firestore: ', error);
        });
        // this.resetForm();
      this.dataService.setEducationData(value);
  }

  getControl() {
    return (this.EducationForm.get('educationDetails') as FormArray);
  }

  resetForm() {
    this.EducationForm.reset({
      educationDetails: [{}],
    });
  }

  addEducation() {
    this.getControl().push(
      this.fb.group({
        degree: [''],
        specification: [''],
        institute: [''],
        location: [''],
        cgpa: [''],
      })
    );
  }


}
