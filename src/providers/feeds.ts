import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Feeds {

    tenantId: number = 786;
    params: { filter: string } = { filter: '' };

    constructor(
        public http: Http,
        public api: Api,
        public user: User) {

    }

    getFeeds() {

        this.params.filter = JSON.stringify(['TenantID', '=', this.tenantId]);

        let result = this.api.get('content/10', this.params).share();

        return result;
    }
}