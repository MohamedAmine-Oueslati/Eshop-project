import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:any = {};

  constructor(private auth :AuthService) { }

  ngOnInit(): void {
  }

  Register(data) {
    this.auth.register(data.username,data.email,data.password)
  }
  
}
