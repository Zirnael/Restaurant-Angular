import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DishService } from '../dish.service';
import {ChosenDishesService} from '../chosen-dishes.service';
import {CurrenciesService} from '../currencies.service';

import {Dish} from "../dish";
import { FireDBcommunicationService } from '../fire-dbcommunication.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent{

  dishes:Dish[] = [];
  currentPage:number=0;
  perPage:number = 5;
  
  constructor(private dishService: DishService,
              private chosenDishesService: ChosenDishesService,
              private currenciesService: CurrenciesService,
              private fireDB:FireDBcommunicationService
    ) { 
      this.dishService.currentFilteredProductList.subscribe((x)=>this.dishes = x);
    }

  price(dish:Dish):string{
    let result:number = dish.price;
    result *= this.currenciesService.value();
    result /= 10000;
    return result.toFixed(2);
  }
  currentDishes():Dish[]{
    let start = this.currentPage*this.perPage;
    let finish = Math.min((this.currentPage+1)*this.perPage,this.dishes.length);
    return this.dishes.slice(start,finish);

  }
  isFirstPage(): boolean {
    return this.currentPage==0;
  }
  isLastPage():boolean{
    return this.currentPage+1 == Math.ceil(this.dishes.length/this.perPage);
  }
  prevPage():void{
    this.currentPage -= 1;
    this.currentPage = Math.max(this.currentPage, 0);
  }
  firstPage():void{
    this.currentPage = 0;
  }

  lastPage():void{
    this.currentPage = Math.ceil(this.dishes.length/this.perPage)-1;
  }
  nextPage():void{
    this.currentPage+=1;
    this.currentPage = Math.min(this.currentPage,Math.ceil(this.dishes.length/this.perPage)-1);
  }
  delete(dish:Dish):void{
    this.fireDB.removeDish(dish);
  }
  currencyIcon():string{
    return this.currenciesService.icon();
  }
  addClick(dish:Dish):void{
    this.chosenDishesService.add(dish.name);
  }
  removeClick(dish:Dish):void
  {
    this.chosenDishesService.remove(dish.name);
  }
  cheap(dish:Dish):boolean{
    return dish==this.dishService.getCheap();
  }
  expensive(dish:Dish):boolean{
    return dish==this.dishService.getExpensive();
  }
  getInfo(dish:Dish):number{
    return this.chosenDishesService.info(dish.name);
  }
}
