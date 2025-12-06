import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {IonicModule, LoadingController} from "@ionic/angular";
import {authGuard} from "../../../../shared/guards/auth-guard";
import {AuthService} from "../../../services/auth.service";
import {PhotoDto} from "../../../dtos/photo.dto";
import {LoginDto} from "../../../dtos/login.dto";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.css'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule, ReactiveFormsModule, NgOptimizedImage]
})
export class LoginPagePage {

  private readonly _authService: AuthService=inject(AuthService);
  private readonly formBuilder:FormBuilder=inject(FormBuilder);
  private readonly loadingController: LoadingController = inject(LoadingController);
  loading: WritableSignal<HTMLIonLoadingElement | null> = signal(null);

  loginForm:FormGroup=this.formBuilder.group({
    identifier: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    method: [0],
  });


  photos:WritableSignal<PhotoDto[]>=this._authService.photos;

get isEmailRequired():boolean{
  const emailControl=this.loginForm.get('email');
  return emailControl?emailControl.hasError('required')&& emailControl.touched:false;
}


  get isEmailInvalid():boolean{
    const emailControl=this.loginForm.get('email');
    return emailControl?emailControl.hasError('email')&& emailControl.touched:false;
  }


  get isPasswordRequired():boolean{
    const passwordControl:AbstractControl|null=this.loginForm.get('password');
    return passwordControl?passwordControl.hasError('required')&& passwordControl.touched:false;
  }


  get isFormInvalid():boolean{
  return this.loginForm.invalid;
  }


  async onSubmit(): Promise<void> {
    if (!this.isFormInvalid) {
      const login: LoginDto = this.loginForm.value as LoginDto;
      this.loading.set(
        await this.loadingController.create({
          message: 'Iniciando sesión...',
        })
      );
      await this.loading()?.present();
      this._authService.login(login);


      setTimeout(async () => {
        await this.loading()?.dismiss();
      }, 5000);
    }
  }


}
