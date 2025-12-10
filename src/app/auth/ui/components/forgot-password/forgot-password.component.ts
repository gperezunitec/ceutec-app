import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingController} from "@ionic/angular";
import {
  IonButton,
  IonButtons, IonContent,
  IonHeader,
  IonIcon, IonInput, IonItem, IonLabel, IonNote,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    NgClass,
    IonNote
  ]
})
export class ForgotPasswordComponent  implements OnInit {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly loadingController: LoadingController = inject(LoadingController);
  private readonly modalController: ModalController = inject(ModalController);

  loading: WritableSignal<HTMLIonLoadingElement | null> = signal(null);

  emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor() { }

  ngOnInit() {}

  get isEmailRequired(): boolean {
    const emailControl: AbstractControl | null= this.emailForm.get('email');
    return emailControl
      ? emailControl.hasError('required') && emailControl.touched
      : false;
  }

  get isEmailInvalid(): boolean {
    const emailControl: AbstractControl | null = this.emailForm.get('email');
    return emailControl
      ? emailControl.hasError('email') && emailControl.touched
      : false;
  }

  get isFormInvalid(): boolean{
    return this.emailForm.invalid;
  }

  async onSubmit(): Promise<void>{
    this.emailForm.markAllAsTouched();

    if (!this.isFormInvalid) {
      const email = this.emailForm.value.email;
      console.log('Formulario enviado:', email);

      this.loading.set(
        await this.loadingController.create({
          message: 'Enviando enlace...'
        })
      );

      await this.loading()?.present();

      setTimeout(async () => {
        await this.loading()?.dismiss();
        this.modalController.dismiss(email, 'sent');
      }, 1000);
    }
  }


  closeModal(): void {
    this.modalController.dismiss(null, 'cancel');
  }

}
