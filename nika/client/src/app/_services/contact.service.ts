import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../app.globals';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    url;
    constructor(private  http: HttpClient,  private config: AppGlobals) {
        this.url = config.url;
    }

    sendMail(form): any {
        return this.http.post(`${this.url}/api/contact`, form.value);
    }
}
