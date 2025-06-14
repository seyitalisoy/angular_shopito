import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CommonModule,VatAddedPipe],
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activedRoute.params.subscribe(params=>{
      if(params["categoryId"]) {
        this.getProductsByCategoryId(params["categoryId"]);
      }else{
        this.getProducts();  
      }
    })

  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error("Products not found:", error);
      }
    });
  }
  
    getProductsByCategoryId(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error("Products not found:", error);
      }
    });
  }


}
