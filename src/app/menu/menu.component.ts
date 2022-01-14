import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChosenDishesService } from '../chosen-dishes.service';
import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentCurrency: string='EUR';
  amount:number = 0;

  constructor(private currenciesService: CurrenciesService,
    private chosenDishesService: ChosenDishesService,
    private router: Router) { 
      this.chosenDishesService.total.subscribe((x)=> this.amount = x);
    }
  ngOnInit(): void {
  }

  toggle(x:string): void {
    this.currentCurrency=x;
    this.currenciesService.chosen.next(x);
  }
  home(){
    return this.router.isActive("/home",false);
  }
  cart(){
    return this.router.isActive("/cart",false);
  }
  add(){
    return this.router.isActive("/add",false);
  }
  dishes(){
    return this.router.isActive("/dishes",false);
  }
}
