import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from '../../components/navi/navi.component';
import { CategoryComponent } from '../../components/category/category.component';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule,RouterOutlet,NaviComponent,CategoryComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
