import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$: Observable<firebase.User>


  constructor(private afAuth:AngularFireAuth ,private firestore:AngularFirestore, private route: ActivatedRoute) { 
       this.user$ = afAuth.authState

  }

  googleLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
    localStorage.setItem('returnUrl', returnUrl? returnUrl:"/")
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  login(email,password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
    localStorage.setItem('returnUrl', returnUrl? returnUrl:"/")
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }

  async register(username,email,password){
    this.afAuth.createUserWithEmailAndPassword(email,password).then(user => console.log(user))
    await this.afAuth.onAuthStateChanged(function(user) {
      // if(email === "wesamin@live.com") {
      //   user.updateProfile({displayName:username,photoURL:"true"})
      // } else {
        user.updateProfile({displayName:username})
      // }
    })
  }

  getUser(uid) {
    return this.firestore.collection('Users').doc(uid).snapshotChanges()
  }

  logout(){
      this.afAuth.signOut()
  }
}
