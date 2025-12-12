import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {PhotoDto} from "../dtos/photo.dto";
import {PreferencesService} from "../../shared/services/preferences.service";
import {Router} from "@angular/router";
import {LoginDto} from "../dtos/login.dto";
import {TokenResponseDto} from "../dtos/token-response.dto";



const API_URL = `${environment.API_URL}photos`;
const API_URL2 = `${environment.API_URL2}`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly _http:HttpClient=inject(HttpClient);
private readonly _preferencesService:PreferencesService=inject(PreferencesService);
private readonly _router:Router=inject(Router);
private readonly _toastController:ToastController=inject(ToastController);


photos:WritableSignal<PhotoDto[]>=signal<PhotoDto[]>([]);

login(model:LoginDto):void{
  this._http.post<TokenResponseDto>(`${API_URL2}auth/login`,model).subscribe({
    next:async (response:TokenResponseDto)=> {
      this._preferencesService.set('accessToken', response.accessToken);
      await this.showToast('Inicio de sesión exitoso');
      this._router.navigate(['/home']);

    },
    error: async (err) => {
      console.error('Error en el login:', err);
      await this.showToast('Error al iniciar sesion', true);
    },
  });
}




getPhotos():void{
  this._http.get<PhotoDto[]>(API_URL).subscribe({
    next:(photos: PhotoDto[]) => {
      console.log(photos);
      this.photos.set(photos);
      this.showToast('Estas son tus fotos');
    },
    error: () => {
      this.showToast('Error al cargar tus fotos');
    }
  })
}


  getPhotosById(id:number):void{
    this._http.get<PhotoDto[]>(`${API_URL}/${id}`).subscribe({
      next:(photos: PhotoDto[]) => {
        console.log(photos);
        this.photos.set(photos);
        this.showToast('Estas son tus fotos');
      },
      error: () => {
        this.showToast('Error al cargar tus fotos');
      }
    })
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
