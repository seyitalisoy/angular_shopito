import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from "./components/navi/navi.component";
import { CategoryComponent } from "./components/category/category.component";


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NaviComponent, CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

}


