import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports: [CommonModule, RouterLink],
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  constructor(private categoryService : CategoryService) {  }

  categories: Category[];
  isLoading : boolean = true;
  currentCategory : Category;

  ngOnInit(): void {
    this.categoryService
    .getCategories()
    .subscribe({
      next : (response)=>{
        this.categories = response.data;
        this.isLoading = false;
      },
      error : (error)=>{
        this.isLoading = false;
        console.error("Categories not found",error);
      }
    });
  }

  setCurrentCategory(category:Category){
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category: Category){
    if (category == this.currentCategory) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllCategoryClass(){
    if (!this.currentCategory) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
