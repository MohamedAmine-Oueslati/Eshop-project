import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
// import {NgForm} from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  categories: any;
  
  constructor(
    private categoryService:CategoryService, 
    private productService:ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res)
  }

  save(product) {
    console.log(product)
    this.productService.create(product)
    this.router.navigate(['Products'])
  }

}
