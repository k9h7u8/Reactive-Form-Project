import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private registerData: any;
  private educationData: any;

  setRegisterData(data: any): void {
    this.registerData = data;
  }

  getRegisterData(): any {
    return this.registerData;
  }

  setEducationData(data: any): void {
    this.educationData = data;
  }

  getEducationData(): any {
    return this.educationData;
  }
}
