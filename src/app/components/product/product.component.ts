import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CommonModule,VatAddedPipe,FormsModule,FilterPipe],
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  filterText : string="";

  constructor(private productService: ProductService,
    private activedRoute: ActivatedRoute,private toastrService:ToastrService) { }

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

  addToCart(product:Product){
    this.toastrService.success("Sepete Eklendi",product.productName);
  };


}
