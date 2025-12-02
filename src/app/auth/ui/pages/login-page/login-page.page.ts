import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.css'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule, ReactiveFormsModule, NgOptimizedImage]
})
export class LoginPagePage {

  private readonly formBuilder:FormBuilder=inject(FormBuilder);
  loginForm:FormGroup=this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
  });

get isEmailRequired():boolean{
  const emailControl=this.loginForm.get('email');
  return emailControl?emailControl.hasError('required')&& emailControl.touched:false;
}


  get isEmailInvalid():boolean{
    const emailControl=this.loginForm.get('email');
    return emailControl?emailControl.hasError('email')&& emailControl.touched:false;
  }


  get isPasswordRequired():boolean{
    const passwordControl=this.loginForm.get('password');
    return passwordControl?passwordControl.hasError('required')&& passwordControl.touched:false;
  }


  get isFormInvalid():boolean{
  return this.loginForm.invalid;
  }

onSubmit():void {

}



}
