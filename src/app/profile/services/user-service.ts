import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastController } from '@ionic/angular/standalone';
import { UserDto } from '../dtos/user';

const API_URL = `${environment.API_URL}user`;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _toastController: ToastController = inject(ToastController);
  user: WritableSignal<UserDto | null> = signal(null);

  getUser(): void {
    this._http.get<UserDto>(API_URL).subscribe({
      next: (response: UserDto) => {
        this.user.set(response);
      },
      error: () => {
        this.showToast('Error al obtener el usuario', true);
      },
    });
  }

  updateUser(user: UserDto): void {
    this._http.put<UserDto>(API_URL, user).subscribe({
      next: (response: UserDto) => {
        this.user.set(response);
      },
      error: () => {
        this.showToast('Error al actualizar el usuario', true);
      },
    });
  }

  async showToast(message: string, error: boolean = false) {
    const toast = await this._toastController.create({
      message,
      duration: 2000,
      color: error ? 'danger' : 'success',
      position: 'top',
    });
    await toast.present();
  }
}
