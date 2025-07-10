import { Component } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navi',
  imports: [CartSummaryComponent, RouterLink],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {

}
