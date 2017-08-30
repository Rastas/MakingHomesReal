import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Item } from '../../models/item';
import { Activations } from '../../providers/providers';
import { User } from '../../providers/providers';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  currentItems: Item[];

  constructor(
    public app: App,
    public user: User,
    public navCtrl: NavController,
    public activations: Activations) {

    if (!this.user.isLoggedIn()) {
      this.logout();
    }
  }

  ionViewDidLoad() {

    if (!this.user.isLoggedIn()) {
      this.logout();
    }

    console.log('user is logged in');

    this._getActivations();

  }

  _getActivations() {
    //query our items for the list
    this.activations.getActivations().map(res => res.json())
      .subscribe(res => {
        this.currentItems = res.Items.filter(function (item) {
          return item['IsComplete'] == true;
        });
      }, err => {
        console.error('ERROR', err);
      });
  }

  doRefresh(refresher) {

    this._getActivations();

    refresher.complete();
  }

  hasItems(): boolean {
    if (this.currentItems == undefined)
      return false;
    return this.currentItems.length > 0;
  }

  logout() {
    this.user.logout();
    this.app.getRootNavs()[0].push(LoginPage);
  }
}