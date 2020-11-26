import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = {};

  constructor(private auth :AuthService) { }

  ngOnInit(): void {
  }

  googleLogin() {
    this.auth.googleLogin()
  }

  Login(data) {
    this.auth.login(data.email,data.password).then(user => console.log(user))
  }

}
