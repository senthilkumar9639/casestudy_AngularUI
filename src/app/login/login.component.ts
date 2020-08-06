import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  screenName: String;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  login() : void {
   
    this.loginService.checkLogin(this.username, this.password).subscribe(x => {
      this.screenName = x.screenNo;
      if(this.screenName!==''){
        this.router.navigate(["/" + this.screenName]);
      }
      else{
        alert("Invalid credentials");
      }
    });
  }
}
