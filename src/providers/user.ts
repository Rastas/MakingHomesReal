import { Injectable } from '@angular/core';
import { Http, ResponseOptions, RequestOptions } from '@angular/http';
import { Api } from './api';
import { Profile } from '../models/profile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class User {

    profile: Profile;
    applicationId: number = 910;

    constructor(public http: Http, public api: Api) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    isNewUser(): boolean {
        if(this.profile == undefined)
            return false;

        return this.profile.IsNewUser;
    }

    isLoggedIn(): boolean {
        if(this.profile == undefined){
            return false;
        }

        return this.profile.ProfileId > 0
    }

    detect(accountInfo: any) {
        
        this.profile = null;

        let result = this.api.post('audience/mobile/' + this.applicationId + '/detectorregister', accountInfo).share();

        result.map(res => res.json())
            .subscribe(profile => {
                // If the API returned a successful response, mark the user as logged in
                if (profile.ProfileId > 0) {
                    this._loggedIn(profile);
                }
            }, err => {
                console.error('ERROR', err);
            });

        return result;
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.profile = null;
        localStorage.clear();
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(profile) {
        this.profile = profile;
        localStorage.setItem('profile', JSON.stringify(profile));
    }
}