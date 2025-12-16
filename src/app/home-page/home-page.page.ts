import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ActionPerformed, PushNotifications, PushNotificationSchema, Token} from "@capacitor/push-notifications";
import {UserDto} from "../profile/dtos/user";
import {UserService} from "../profile/services/user-service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePagePage implements OnInit {

  private readonly _userService: UserService = inject(UserService);
  user: WritableSignal<UserDto | null> = this._userService.user;


 initNotifications():void{
   PushNotifications.requestPermissions().then(result => {
     if (result.receive==='granted') {
       PushNotifications.register();
     }
   });

   PushNotifications.addListener('registration',(token:Token)=>{
     if (this.user()){
       let userData: UserDto = this.user() as UserDto;
       userData.fcmToken=token.value;
       this._userService.updateUser(userData);
     }
     console.log('Push Success ',token.value);
   })

   PushNotifications.addListener(
     'pushNotificationReceived',
     (notification: PushNotificationSchema) => {
       console.log('Push received: ', notification);
     }
   );

   PushNotifications.addListener(
     'pushNotificationActionPerformed',
     (action: ActionPerformed) => {
       console.log('Push action performed: ', action);
     }
   );


 }


  constructor() { }

  ngOnInit() {
   this.initNotifications();
  }

}
