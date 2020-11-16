import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:AngularFirestore) { }
 
  save(user:firebase.User) {
    return this.firestore.collection('Users').add({
      name: user.displayName ,
      email: user.email
    })
  }
}
