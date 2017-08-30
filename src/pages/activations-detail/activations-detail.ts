import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Item } from '../../models/item';
import { User } from '../../providers/providers';
import { Activations } from '../../providers/providers';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition } from '@ionic-native/google-maps';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

declare var google: any;
declare const CraftARSDK: any;

@Component({
  selector: 'page-activations-detail',
  templateUrl: 'activations-detail.html',
})
export class ActivationsDetailPage {

  @ViewChild('map') mapElement;
  map: any;
  currentItem: Item;
  loading: any;
  itemScanned: boolean;
  imageId: string;
  watcher;

  constructor(
    public app: App,
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public activations: Activations,
    navParams: NavParams,
    public user: User,
    public platform: Platform) {

    if (!this.user.isLoggedIn()) {
      this.logout();
    }

    this.currentItem = navParams.get('item');
    this.itemScanned = false;

  }

  logout() {
    this.user.logout();
    this.app.getRootNavs()[0].push(LoginPage);
  }

  ionViewCanEnter() {
    return this.user.isLoggedIn();
  }

  ionViewWillLeave() {
    if (this.watcher)
      this.watcher.unsubscribe();
  }

  _showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Validating Activation'
    });

    this.loading.present();
  }

  _startWatching() {
    //reset selected activation image
    this.itemScanned = false;
    this.imageId = '';
    localStorage.setItem('ImageId', '');
    //start watching local storage
    this.watcher = Observable.timer(0, 1000).subscribe(t => {
      if (this.imageId !== localStorage.getItem('ImageId')) {
        this.imageId = localStorage.getItem('ImageId').substring(0, 20);
        this._loadActivation();
      } else {
        console.log('no change');
      }
    });
  }

  _loadActivation() {

    this._showLoader();

    //stop the watcher
    this.watcher.unsubscribe();

    this.activations.getActivation(this.imageId)
      .map(res => res.json())
      .subscribe(res => {

        this.currentItem = res.Items[0];

        this.activations.complete(this.currentItem['ChallengeID'], this.imageId)
          .map(res => res.json())
          .subscribe(res => {

            this.currentItem['IsComplete'] = true;

            this.loading.dismiss();
            this.itemScanned = true;

          }, err => {

            console.error('ERROR', err);
            this.loading.dismiss();
            this.itemScanned = false;

          });


      }, err => {
        console.error('ERROR', err);
        this.loading.dismiss();
        this.itemScanned = false;
      });

  }

  startScan() {

    this._startWatching();

    CraftARSDK.startView(this.success, this.error, {
      "loadUrl": "craft-scan.html"
    });
  }

  success() {
    console.log('Successfully initialized');
  }

  error() {
    console.log('failed to initialize');
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {

    try {
      let coOrds = this.currentItem['ExtraContent'];
      let fields = coOrds.split(',');

      let latLng = new google.maps.LatLng(fields[0], fields[1]);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        zoomControl: false,
        fullScreenControl: false,
        scaleControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    }
    catch (e) {
    }
  }
}
