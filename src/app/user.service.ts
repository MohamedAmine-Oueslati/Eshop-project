import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:AngularFirestore) { }
 
  save(user:firebase.User) {
    // this.db.object('/users/' + user.uid).update({
    //   name: user.displayName ,
    //   email: user.email
    // })
    return this.firestore.collection('Users').add({
      name: user.displayName ,
      email: user.email
    })
  }
}
