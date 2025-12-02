import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {PhotoDto} from "../dtos/photo.dto";



const API_URL = `${environment.API_URL}photos`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly _http:HttpClient=inject(HttpClient);
private readonly _toastController:ToastController=inject(ToastController);
photos:WritableSignal<PhotoDto[]>=signal<PhotoDto[]>([]);

getPhotos():void{
  this._http.get<PhotoDto[]>(API_URL).subscribe({
    next:(photos: PhotoDto[]) => {
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
    duration:5000,
    color:error?'danger':'success',
    position:"top",
  });
  await toast.present();
}


}
