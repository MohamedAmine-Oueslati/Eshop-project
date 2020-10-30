import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Observable<Category[]>

  constructor(private firestore:AngularFirestore) {
    this.categories = this.firestore.collection('Categories').valueChanges()
   }

  getCategories () {
    return this.categories
  }
}
