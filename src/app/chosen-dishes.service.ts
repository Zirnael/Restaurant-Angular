import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Dish} from "./dish";
import { DishService } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class ChosenDishesService {
  choice:{[name:string]:number}={};
  total:BehaviorSubject<number> = new BehaviorSubject(0);
  currentChoices: BehaviorSubject<{[name:string]:number}>;

  constructor() {
    this.currentChoices = new BehaviorSubject({});
  }
  create(dishes:Dish[]):void {
    this.choice = {};
    this.total.next(0);
    for (let dish of dishes) {
      Object.defineProperty(this.choice,dish.name,{value:0,writable:true});
    }
    this.currentChoices.next(this.choice);
  }

  add(dish_name: string):void {
    this.choice[dish_name] += 1;
    let tot = this.total.getValue();
    tot += 1;
    this.total.next(tot);
  }
  remove(dish_name: string):void {
    this.choice[dish_name] -= 1;
    let tot = this.total.getValue();
    tot -= 1;
    this.total.next(tot);
  }
  info(dish_name: string):number {
    return this.choice[dish_name];
  }
}
