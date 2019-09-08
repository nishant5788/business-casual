import { Component, OnInit } from '@angular/core';
import { loginService } from 'src/app/pages/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
