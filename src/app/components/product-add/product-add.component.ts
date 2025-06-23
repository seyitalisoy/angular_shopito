import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService, private toastrService: ToastrService) {

  }


  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      categoryId: ["", Validators.required],
      productName: ["", Validators.required],
      price: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      picture: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel: Product = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe((response) => {
        this.toastrService.success(response.message, "Başarılı");

      },responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,
              responseError.error.Errors[i].PropertyName
            );         
          }
        }        
      });
    } else {
      this.toastrService.error("Formunuz eksik", "Ürün eklenmedi");
    }
  }

}
