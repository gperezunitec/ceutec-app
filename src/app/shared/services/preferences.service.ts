import {inject, Injectable} from '@angular/core';
import {EncryptionService} from "./encryption.service";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private readonly _encryptionService: EncryptionService=inject(EncryptionService);

  /*Limpia todas las preferencias almacenadas */
  async clear(): Promise<void> {
    await Preferences.clear();
  }

  /*Obtiene una preferencia almacenada por su clave/key */
  async get<T>(key: string): Promise<T | null> {
    const encodedKey: string = this._encryptionService.encrypt(key);
    const { value } = await Preferences.get({ key: encodedKey });
    const decodedData = this._encryptionService.decrypt(value ?? '');
    return decodedData ? (JSON.parse(decodedData) as T) : null;
  }

  /*Elimina una preferencia almacenada por su clave/key */
  async remove(key: string): Promise<void> {
    try {
      const encodedKey: string = this._encryptionService.encrypt(key);
      await Preferences.remove({ key: encodedKey });
    } catch (error) {}
  }

  /*Almacena una preferencia con una clave/key y un valor */
  async set<T>(key: string, value: T): Promise<void> {
    const dataToEncode = JSON.stringify(value);
    const encodedData = this._encryptionService.encrypt(dataToEncode);
    const encodedKey: string = this._encryptionService.encrypt(key);

    await Preferences.set({
      key: encodedKey,
      value: encodedData,
    });
  }




}
