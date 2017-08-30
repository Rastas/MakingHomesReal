import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Activations } from '../../providers/providers';

import { ActivationsDetailPage } from '../activations-detail/activations-detail';
import { User } from '../../providers/providers';
import { Item } from '../../models/item';

import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-activations-list',
  templateUrl: 'activations-list.html',
})

export class ActivationsListPage {

  currentItems: Item[];

  constructor(public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public user: User,
    public activations: Activations) {

      if (!this.user.isLoggedIn()) {
        this.logout();
      }

  }

  logout() {
    this.user.logout();
    this.app.getRootNavs()[0].push(LoginPage);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ActivationsDetailPage, {
      item: item
    });
  }

  ngOnInit() {

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
        this.currentItems = res.Items;
      }, err => {
        console.error('ERROR', err);
      });
  }

  doRefresh(refresher) {

    this._getActivations();

    refresher.complete();
  }

}
