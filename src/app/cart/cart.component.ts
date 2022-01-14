import { Component, OnInit } from '@angular/core';
import {ChosenDishesService} from "../chosen-dishes.service";
import { Dish } from '../dish';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Dish[] = [];
  details: {[key:string]:number} = {};
  isEmpty:boolean = true;
  constructor(private chosenDishesService: ChosenDishesService,
              private dishService:DishService) { }

  ngOnInit(): void {
    this.getDishes();
  }
  
  getDishes(): void {
    this.dishService.currentProductList.subscribe((products: Dish[])=>{
      this.products=products;
      this.checkEmpty();
    });
    this.chosenDishesService.currentChoices.subscribe((choice: { [key: string]: number; })=>{
      this.details=choice
      this.checkEmpty(); 
    });
  }
  checkEmpty():void{
    this.isEmpty=true;
    for(let product of this.products){
      if(this.details[product.name] > 0)
      {
        this.isEmpty = false;
      }
    }
  }
}
