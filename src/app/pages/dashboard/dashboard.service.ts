import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    pagesChanged = new Subject<{}>();

    pages = {
        home: 'homepage Content',
        about: 'About Page Content',
        store: 'store Page Content',
        header: 'Header Text',
        footer: 'footer Text'
    };


    constructor(private http: HttpClient) {}


    updateFooter(footerText: string) {
        this.pages.footer = footerText;
        this.pagesChanged.next(this.pages);
    }


    storePages() {
    this.http.put('https://businesscasual-2d842.firebaseio.com/pages.json', this.pages)
    .subscribe(responseData => {
     console.log(responseData);
   });
    }
}