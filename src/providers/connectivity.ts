import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class Connectivity {
 
  onDevice: boolean;
  isConnected: boolean;
 
  constructor(public platform: Platform,public network: Network){
    this.onDevice = this.platform.is('cordova');
    this.isConnected = false || !this.onDevice;
    this.platform.ready().then(() => {

        this.network.onDisconnect().subscribe(() => {
            this.isConnected = false || !this.onDevice;
        });

        this.network.onConnect().subscribe(() => {
            this.isConnected = true || !this.onDevice;
        });
    });
  }
 
  isOnline(): boolean {
    return this.isConnected;
  }
}