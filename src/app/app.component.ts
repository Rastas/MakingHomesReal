import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core'

import { User } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MakingHomesReal {

  rootPage: any;

  constructor(private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private user: User,
    public storage: Storage) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {

        if (hasSeenTutorial) {

          if (this.user.isLoggedIn()) {

            this.rootPage = HomePage;

          } else {

            this.rootPage = LoginPage;

          }

        } else {

          this.rootPage = TutorialPage;

        }
      });

    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}

