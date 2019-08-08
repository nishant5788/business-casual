import { Component, OnInit, AfterViewInit } from '@angular/core';
import { loginService } from './pages/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Business Casual';
  isLoading = true;


  constructor(private loginService: loginService){}


  ngOnInit() {
    this.loginService.autoLogin();
  }

}
