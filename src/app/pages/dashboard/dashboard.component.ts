import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { DashboardPages } from './pages.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Dashboardpages: DashboardPages = {
    newHome: '',
    newAbout: '',
    newStore: '',
    newHeader: '',
    newFooter: '',
    productsToShow: 0
};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getPages().subscribe(
      (pages: DashboardPages) => {
        this.Dashboardpages.newHeader = pages.newHeader;
        this.Dashboardpages.newFooter = pages.newFooter;
        this.Dashboardpages.productsToShow = pages.productsToShow;
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.dashboardService.updateAllPages(value);
  }

}
