import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    translate: TranslateService,
    public storage: Storage,
    public navParams: NavParams) {

    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/SA-Homeloans-img-3.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/SA-Homeloans-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/SA-Homeloans-img-2.png',
          }
        ];
      });
      
  }

  startApp() {
    this.navCtrl.push(LoginPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }


  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
