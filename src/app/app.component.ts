import { Component, OnInit } from '@angular/core';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { loginService } from './pages/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Business Casual';

  constructor(
    private loginService: loginService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private titleService: Title
    ){
      this.setTitle();
    }


  ngOnInit() {
    this.loginService.autoLogin();
  }


  setTitle() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route: any) => route.data)).subscribe((event) => {
        this.titleService.setTitle(event['title']);
      })
    }

}
