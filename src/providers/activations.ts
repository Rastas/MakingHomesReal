import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Activations {

    gameId: number = 35;
    params: { filter: string } = { filter: '' };
    activationsFilter: { profileId: number, gameId: number } = {
        profileId: 0,
        gameId: this.gameId
    };

    completionFilter: { profileId: number, challengeId: number, Code: string } = {
        profileId: 0,
        challengeId: 0,
        Code: ''
    };

    constructor(
        public http: Http,
        public api: Api,
        public user: User) {

    }

    complete(challengeId: number, code: string) {

        this.completionFilter.profileId = this.user.profile.ProfileId;
        this.completionFilter.challengeId = challengeId;
        this.completionFilter.Code = code;

        let result = this.api.get('simplequery/1538', this.completionFilter).share();

        return result;

    }

    getActivations() {

        this.activationsFilter.profileId = this.user.profile.ProfileId;

        let result = this.api.get('query/1536', this.activationsFilter).share();

        return result;
    }

    getActivation(imageId: string) {

        this.params.filter = JSON.stringify([['GameID', '=', this.gameId], 'and', ['AnswerText', '=', imageId]]);

        let result = this.api.get('entity/133733', this.params).share();

        return result;
    }
}