import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPagePage  {

  private readonly formBuilder:FormBuilder=inject(FormBuilder);
  registerForm:FormGroup=this.formBuilder.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    phone:['', Validators.required],
  });


  get isEmailRequired():boolean{
    const emailControl=this.registerForm.get('email');
    return emailControl?emailControl.hasError('required')&& emailControl.touched:false;
  }


  get isEmailInvalid():boolean{
    const emailControl=this.registerForm.get('email');
    return emailControl?emailControl.hasError('email')&& emailControl.touched:false;
  }


  get isPasswordRequired():boolean{
    const passwordControl=this.registerForm.get('password');
    return passwordControl?passwordControl.hasError('required')&& passwordControl.touched:false;
  }


  get isFormInvalid():boolean{
    return this.registerForm.invalid;
  }

  onSubmit():void {

  }

}
