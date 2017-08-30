import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers/providers';
import { FeedPage } from '../feed/feed';
import { AboutPage } from '../about/about';
import { ActivationsListPage } from '../activations-list/activations-list';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = ActivationsListPage;
  tab2Root: any = FeedPage;
  tab3Root: any = AboutPage;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController,
    public user: User,
    public app: App,
    public translateService: TranslateService) {

      if (!this.user.isLoggedIn()) {
        this.logout();
      }

    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });

    if(!this.user.isLoggedIn()){
      this.user.logout();
      this.navCtrl.push(LoginPage);
    }

  }

  logout() {
    this.user.logout();
    this.app.getRootNavs()[0].push(LoginPage);
  }

}
