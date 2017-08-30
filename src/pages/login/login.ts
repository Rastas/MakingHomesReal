import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  LoginForm: FormGroup;
  submitAttempt: boolean = false;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.LoginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
    });

  }

  ionViewWillEnter() {
    if (this.user.isLoggedIn())
      this.navCtrl.push(HomePage);
  }

  _showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  showMessage(message: string) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  login() {

    this.submitAttempt = true;

    if (this.LoginForm.valid) {

      this._showLoader();

      let msisdn = this.LoginForm.get('username').value;
      msisdn = '27' + msisdn.split('').reverse().join('').substring(0, 9).split('').reverse().join('');

      console.log(msisdn);

      // Attempt to login in through our User service
      this.user.detect({ username: msisdn }).subscribe((resp) => {

        this.loading.dismiss();

        if (this.user.isLoggedIn()) {

          this.navCtrl.push(HomePage);

        } else {

          console.log('failed login');
          // Unable to sign up
          this.showMessage(this.loginErrorString);

        }

      }, (err) => {

        this.loading.dismiss();

        // Unable to sign up
        this.showMessage(this.loginErrorString);

      });

    } else {

      this.loading.dismiss();

      // Invalid form values
      this.showMessage(this.loginErrorString);
    }

  }

}
