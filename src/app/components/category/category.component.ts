import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  constructor(private categoryService : CategoryService) {  }

  categories: Category[] =[];

  ngOnInit(): void {
    this.categoryService
    .getCategories()
    .subscribe((response)=>{
      this.categories = response.data;
    })
  }

}
