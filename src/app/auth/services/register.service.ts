import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {PreferencesService} from "../../shared/services/preferences.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {LoginDto} from "../dtos/login.dto";
import {TokenResponseDto} from "../dtos/token-response.dto";



const API_URL2 = `${environment.API_URL}auth/`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly _http:HttpClient=inject(HttpClient);
  private readonly _preferencesService:PreferencesService=inject(PreferencesService);
  private readonly _router:Router=inject(Router);
  private readonly _toastController:ToastController=inject(ToastController);


  create(model:LoginDto):void{
    this._http.post<TokenResponseDto>(`${API_URL2}create`,model).subscribe({
      next:(response:TokenResponseDto)=> {
        this._preferencesService.set('accessToken', response.accessToken);
        this.showToast('Inicio de sesión exitoso');

        this._router.navigate(['/home']);

      },
      error:()=>{
        this.showToast('Error al iniciar sesion');
      },
    });
  }


  async showToast(msg:string,error:boolean=false){
    const toast=await this._toastController.create({
      message: msg,
      duration:2000,
      color:error?'danger':'success',
      position:"top",
    });
    await toast.present();
  }

}
