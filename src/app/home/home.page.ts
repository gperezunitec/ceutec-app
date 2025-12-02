import {Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import {LoginDto} from "../auth/dtos/Login";
import {JsonPipe} from "@angular/common";
import {LoginPage} from "../pages/login/login.page";
import {LoginPagePage} from "../auth/ui/pages/login-page/login-page.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, JsonPipe, IonButton, LoginPage, LoginPagePage],
})
export class HomePage implements OnInit {

  isActive:WritableSignal<boolean>=signal(false);
  firstName:WritableSignal<string>=signal("Wilmer");
  subTotal:WritableSignal<number>=signal(400);
  age:WritableSignal<number>=signal(0);
  years:WritableSignal<number[]>=signal([]);
  loginData:WritableSignal<LoginDto>=signal({email:"ejemplo@mail.com", password:"admin123"});

  taxes:Signal<number>=computed<number>(()=>{
    return 0.15*this.subTotal()
  })

  changeValues():void{
    this.years.update((value)=>[
      ...value,
      2002
    ])

    this.firstName.set("Diego");
    this.subTotal.set(1000);
  }

  ngOnInit():void{
    this.years.set([2020,2021,2022,2023])


    this.loginData.set({
      email:"ejemplo@mail.com",
      password:"12345",
    })

    this.loginData.update((value:LoginDto)=>{
      value.password="Admin12345"
      return value;
    })

  }
}
