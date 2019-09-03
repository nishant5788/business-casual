import { Component, OnInit, OnDestroy } from '@angular/core';
import { loginService } from 'src/app/pages/login/login.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss']
})
export class SiteNavigationComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private loginService: loginService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.userSubscription = this.loginService.user
    .subscribe(
      user => {
        this.isAuthenticated = !user? false : true;
      }
    );

  }

  onSearch(inputVal: HTMLInputElement) {
    this.router.navigate(['/search'], {relativeTo: this.route, queryParams: { query: inputVal.value }} );
  }

  onToggleNavigation() {
    document.getElementById("mainNavigation").classList.toggle('show');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.loginService.logout();
  }

}
