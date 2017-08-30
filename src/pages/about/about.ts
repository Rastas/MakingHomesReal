import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';

import { LoginPage } from '../login/login';
import { TutorialPage } from '../tutorial/tutorial';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild(Nav) nav: Nav;

  constructor(public app: App, 
    public navCtrl: NavController, 
    public user: User) {

    if (!this.user.isLoggedIn()) {
      this.logout();
    }
    
  }

  logout() {
    this.user.logout();
    this.app.getRootNavs()[0].push(LoginPage);
  }

  tutorial() {
    this.app.getRootNavs()[0].push(TutorialPage);
  }

  terms() {
    this.app.getRootNavs()[0].push(TermsPage);
  }
}