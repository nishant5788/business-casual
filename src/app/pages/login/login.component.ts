import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, loginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true;
  error = null;

  constructor(private loginService: loginService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;


    authObs = this.loginService.login(email, password);

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigate(['/dashboard']);
      },
      errorMsg => {
        console.log("Error MSG" + errorMsg);
        this.error = errorMsg;
      }
    );

    
    form.reset();


  }

}
