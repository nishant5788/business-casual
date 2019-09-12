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

  headerText: string;
  footerText: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getPages().subscribe(
      (pages: DashboardPages) => {
        this.headerText = pages.newHeader;
        this.footerText = pages.newFooter;
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.dashboardService.updateAllPages(value);
  }

}
