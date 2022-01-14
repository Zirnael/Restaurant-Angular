import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {KITCHEN_TYPES} from '../kitchenTypes';
import { CATEGORIES } from '../categories';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DishService } from '../dish.service';
import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

/*
export interface Dish{
    name:string;
    kitchen_type:string;
    category:string;
    ingredients: string;
    max_possible:number;
    price:number;
    description:string;
    link:string[];
    rating?:number;
}

*/
export class FilterComponent{
  kitchenTypes = KITCHEN_TYPES;
  categories = CATEGORIES;
  kitchenTypeArray = new FormArray([]);
  categoryArray = new FormArray([]);
  minPrice = new FormControl(this.cheapPrice());
  maxPrice = new FormControl(this.expensivePrice());
  minRating = new FormControl(0);

  lastMinPrice:number = this.cheapPrice();
  lastMaxPrice:number = this.expensivePrice();


  filterForm = new FormGroup({
    kitchenTypeForm:this.kitchenTypeArray,
    categoryForm:this.categoryArray,
    minPrice:this.minPrice,
    maxPrice:this.maxPrice,
    minRating:this.minRating
  });
  
  getKTAC(i:number):FormControl {
    return this.kitchenTypeArray.controls[i] as FormControl;
  }

  getCAC(i:number):FormControl {
    return this.categoryArray.controls[i] as FormControl;
  }
  getName(x:FormControl):string {
    return x.value;
  }
  cheapPrice():number{
    let cheap = this.dishService.getFullCheap();
    if (cheap == null) 
    {
      return 0;
    }
    return Math.floor(cheap.price * this.currenciesService.value()/10000);
  }
  expensivePrice():number{
    let expensive = this.dishService.getFullExpensive();
    if (expensive == null)
    {
      return 0;
    }
    return Math.ceil(expensive.price * this.currenciesService.value()/10000);
  }

  onUpdate():void{
    let kt:{[key:string]:boolean}={};
    for(let type in this.kitchenTypes){
      kt[this.kitchenTypes[type]]=this.kitchenTypeArray.value[type];
    }
    let ca:{[key:string]:boolean}={};
    for(let category in this.categories){
      ca[this.categories[category]]=this.categoryArray.value[category];
    }
    console.log("here");
    this.dishService.setConfig(kt,ca,this.minPrice.value,this.maxPrice.value,this.minRating.value);
    if(this.minPrice.value == this.lastMinPrice){
      if(this.maxPrice.value == this.lastMaxPrice){
        this.maxPrice.setValue(this.expensivePrice(),{onlySelf:true});
        this.minPrice.setValue(this.cheapPrice(),{onlySelf:true});
      }
    }    
  }

  constructor(private dishService: DishService,
              private currenciesService: CurrenciesService) {
    for(let type of this.kitchenTypes) {
      let x = new FormControl("true");
      this.kitchenTypeArray.push(x);
    }
    for(let category of this.categories) {
      let x = new FormControl("true");
      this.categoryArray.push(x);
    }
    this.filterForm.valueChanges.subscribe(() => {
      this.onUpdate();
    });
  }


}
