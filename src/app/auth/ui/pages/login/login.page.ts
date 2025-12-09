import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {PhotoDto} from "../../../dtos/photo.dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  private readonly _authservice:AuthService=inject(AuthService);
  photos:WritableSignal<PhotoDto[]>=this._authservice.photos;

  constructor() {
    console.log('LoginPage');

  }

  ngOnInit() {
  }

  async onSubmit():Promise<void> {
    this._authservice.getPhotos();
  }

}
