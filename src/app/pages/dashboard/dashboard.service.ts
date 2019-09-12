import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardPages } from './pages.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

   pagesChanged = new Subject<{}>();

    pages: DashboardPages = {
        newHome: 'homepage Content',
        newAbout: 'About Page Content',
        newStore: 'store Page Content',
        newHeader: 'Header Text',
        newFooter: 'footer Text'
    };

    constructor(private http: HttpClient) {}

    updatePages(target: string, footerText: string) {
        this.pages[target] = footerText;
        this.http.put(environment.firebase.databaseURL + '/pages.json', this.pages).subscribe();
        this.pagesChanged.next(this.pages);
    }

    updateAllPages(newContent: DashboardPages) {
        this.pages = newContent;
        this.http.put(environment.firebase.databaseURL + '/pages.json', this.pages).subscribe();
        console.log("Pages are " + JSON.stringify(this.pages));
        this.pagesChanged.next(this.pages);
    }

    getPages() {
        return this.http.get<{}>(environment.firebase.databaseURL + '/pages.json');
    }
}