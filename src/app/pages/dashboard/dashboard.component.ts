import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    const test = this.dashboardService.pages.footer;
  }


  onEditFooter(form: NgForm) {
    const value = form.value.editfooter;
    this.dashboardService.updateFooter(value);
    this.dashboardService.storePages();
  }

}
