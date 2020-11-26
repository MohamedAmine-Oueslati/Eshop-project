import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth:AuthService, private router:Router) { }

  canActivate() {
    // return this.auth.user$.map(user => {
    //   console.log(user.photoURL)
    //   if (user.photoURL === "true") { return true}
    //     return false;
    // })
  }
}
