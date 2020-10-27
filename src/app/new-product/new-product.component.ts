import { Category } from './../category.model';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.route.params.subscribe((data) => {
      const {title,category,price,imageURL} = data
      this.id = data.id
      this.product = {title, category,price, imageURL}
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
