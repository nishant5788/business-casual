import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerText: string;

  constructor(private dashboardService: DashboardService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.dashboardService.pagesChanged.subscribe(
      (resData) => {
        this.updatingFooter(resData, 'newFooter');
      }
    );

    this.dashboardService.getPages().subscribe(
      resData => {
        this.updatingFooter(resData, 'newFooter');
      }
    );
    
  }

  updatingFooter(receivingData: {}, target: string) {
    this.footerText = receivingData[target];
  }

}
