import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {

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

}