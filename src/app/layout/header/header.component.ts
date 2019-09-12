import { Component, OnInit } from '@angular/core';
import { loginService } from 'src/app/pages/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerText: string = "Business Casual";
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private loginService: loginService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private http: HttpClient
    ) { }

  ngOnInit() {

    this.userSubscription = this.loginService.user
    .subscribe(
      user => {
        this.isAuthenticated = !user? false : true;
      }
    );


        this.dashboardService.pagesChanged.subscribe(
      (resData) => {
        this.updatingHeader(resData, 'newHeader');
      }
    );

    this.dashboardService.getPages().subscribe(
      resData => {
        this.updatingHeader(resData, 'newHeader');
      }
    );

  }

    updatingHeader(receivingData: {}, target: string) {
    this.headerText = receivingData[target];
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




// footerText: string;

//   constructor(private dashboardService: DashboardService,
//     private http: HttpClient
//     ) { }

//   ngOnInit() {
//     this.dashboardService.pagesChanged.subscribe(
//       (resData) => {
//         this.updatingFooter(resData, 'newFooter');
//       }
//     );

//     this.dashboardService.getPages().subscribe(
//       resData => {
//         this.updatingFooter(resData, 'newFooter');
//       }
//     );
    
//   }

//   updatingFooter(receivingData: {}, target: string) {
//     this.footerText = receivingData[target];
//   }
