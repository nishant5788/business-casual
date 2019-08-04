import { Component, OnInit, OnDestroy } from '@angular/core';
import { loginService } from 'src/app/pages/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss']
})
export class SiteNavigationComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(private loginService: loginService) { }

  ngOnInit() {

    this.userSubscription = this.loginService.user
    .subscribe(
      user => {
        this.isAuthenticated = !user? false : true;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.loginService.logout();
  }

}
