import { Category } from './../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
// import {NgForm} from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  categories: any;
  product: any = {};
  id :any;
  
  constructor(
    private categoryService:CategoryService, 
    private productService:ProductService,
    private router:Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res)
    this.route.params.subscribe(data => {
      this.id = data.id
      this.productService.products.subscribe(items => {
        items.forEach(item => {
          if (item.id === data.id) {
            this.product = item
          }
        });
      })
    })
  }

  save(product) {
    if (this.id) this.productService.update(this.id , product)
    else this.productService.create(product)

    this.router.navigate(['/ManageProducts'])
  }

  delete() {
    this.productService.delete(this.id)
    
    this.router.navigate(['/ManageProducts'])
  }

}
