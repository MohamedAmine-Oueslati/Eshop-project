import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products:any;

  constructor(private productService:ProductService,) { }

  ngOnInit(): void {
    this.productService.products.subscribe(res => this.products = res)
  }

}
