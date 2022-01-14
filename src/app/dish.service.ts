import { Injectable } from '@angular/core';
import {Dish} from "./dish";
import {ChosenDishesService} from "./chosen-dishes.service"
import { CurrenciesService } from './currencies.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FireDBcommunicationService } from './fire-dbcommunication.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  sorted:Dish[] = [];
  full:Dish[] = [];
  filtered:Dish[] = [];
  kitchenTypes:{[name:string]:boolean} = {};
  categories:{[name:string]:boolean} = {};
  minPrice:number = 0;
  maxPrice:number = 0;
  minRating:number = 0;
  initialize:boolean = false;
  currentProductList: BehaviorSubject<Dish[]>;
  currentFilteredProductList: BehaviorSubject<Dish[]>;
  observers: {[name:string]: BehaviorSubject<Dish| undefined>} = {};
  getObservable():Observable<Dish[]> {
    return new Observable<Dish[]>((observer)=>observer.next(this.filtered));
  }
  getDishes():Dish[] {
    return this.filtered;
  }
  getDish(name:string):Dish| undefined{
    for(const dish of this.full){
      if(dish.name == name)
      {
        return dish;
      }
    }
    return undefined;
  }
  observeDish(dishName: string):BehaviorSubject<Dish|undefined>{
    let x = new BehaviorSubject<Dish|undefined>(undefined);
    this.observers[dishName]=x;
    return x;
  }
  generateSorted():void{
    this.sorted = Object.assign([], this.filtered);
    this.sorted.sort((a,b)=>a.price-b.price);
  }
  getExpensive():Dish{  
    return this.sorted[this.sorted!.length - 1];
  }
  getCheap():Dish{
    return this.sorted[0];
  }
  rating(dish: Dish): number | undefined {
    if (dish.rate.count == 0){
      return undefined;
    }
    return dish.rate.total/dish.rate.count;
  }
  rate(dish: Dish, rating: number) {
    let x:Dish = {
      name: dish.name,
      kitchen_type: dish.kitchen_type,
      category: dish.category,
      ingredients: dish.ingredients,
      max_possible: dish.max_possible,
      price: dish.price,
      description: dish.description,
      link: dish.link,
      rate: {
        count: dish.rate.count+1,
        total: dish.rate.total+rating
      },
      comments: dish.comments
    }
    this.fireDB.modDish(dish,x);
  }
  
  addComment(dish: Dish, comment: { title: string; description: string; date: string; }) {
    let tab = dish.comments;
    if (tab == undefined){
      tab = new Array;
    }
    console.log(tab);
    tab.push(comment);
    let x:Dish={
      name: dish.name,
      kitchen_type: dish.kitchen_type,
      category: dish.category,
      ingredients: dish.ingredients,
      max_possible: dish.max_possible,
      price: dish.price,
      description: dish.description,
      link: dish.link,
      rate: dish.rate,
      comments: tab
    }
    this.fireDB.modDish(dish,x);
  }

  getFullCheap():Dish{
    if (!this.initialize){
      return this.getCheap();
    }

    let help = this.full;    
    help = help!.filter((a)=>this.kitchenTypes[a.kitchen_type]);
    help = help!.filter((a)=>this.categories[a.category]);
    help = help!.filter((a)=>this.rating(a) == undefined || this.rating(a)! >= this.minRating);
    help.sort((a,b)=>a.price-b.price);
    return help[0];
  }
  getFullExpensive():Dish{
    if(!this.initialize){
      return this.getExpensive();
    }

    let help = this.full;
    help = help!.filter((a)=>this.kitchenTypes[a.kitchen_type]);
    help = help!.filter((a)=>this.categories[a.category]);
    help = help!.filter((a)=>this.rating(a) == undefined || this.rating(a)! >= this.minRating);
    help.sort((a,b)=>a.price-b.price);

    return help[help.length-1];
  }
  delete(dish: Dish) {
    this.fireDB.removeDish(dish);
  }

  add(DishName:string, KitchenType:string, Category:string,Ingredients:string,maxPossible:number, price:number, description:string,link:string[]):void {
    let x:Dish = {
      name: DishName,
      kitchen_type: KitchenType,
      category: Category,
      ingredients: Ingredients,
      max_possible: maxPossible,
      price: price,
      description: description,
      link: link,
      rate:{
        total: 0,
        count: 0
      },
      comments:[]
    }
    this.fireDB.addDish(x);
  }
  mod(dish: Dish, DishName: any, KitchenType: any, Category: any, Ingredients: any, maxPossible: any, price: any, description: any, link: any) {
    let x:Dish = {
      name: DishName,
      kitchen_type: KitchenType,
      category: Category,
      ingredients: Ingredients,
      max_possible: maxPossible,
      price: price,
      description: description,
      link: link,
      rate: dish.rate,
      comments:dish.comments
    }
    this.fireDB.modDish(dish,x);
  }
  update(){
    if(this.initialize)
    {
      this.filter();
    }
    else{
      this.filtered = Object.assign([], this.full);
    }
    this.generateSorted();
    this.chosenDishesService.create(this.getDishes());
    this.currentFilteredProductList.next(this.filtered);
    this.currentProductList.next(this.full);
    for(let dish of this.full){
      if(this.observers.hasOwnProperty(dish.name)){
        this.observers[dish.name].next(dish);
        this.observers[dish.name].complete();
      }
    }
  }
  filter():void{
    let filtered = this.full;
    filtered = filtered!.filter((a)=>this.kitchenTypes[a.kitchen_type]);
    filtered = filtered!.filter((a)=>this.categories[a.category]);
    filtered = filtered!.filter((a)=>this.currenciesService.priceValue(a.price) >= this.minPrice*10000);
    filtered = filtered!.filter((a)=>this.currenciesService.priceValue(a.price) <= this.maxPrice*10000);
    filtered = filtered!.filter((a)=> this.rating(a)==undefined || this.rating(a)! >= this.minRating);
    this.filtered = filtered;
    this.currentFilteredProductList.next(this.filtered);
  }
  setConfig(
    kitchenTypes:{[name:string]:boolean},
    categories:{[name:string]:boolean},
    minPrice:number,
    maxPrice:number,
    minRating:number):void{
      this.kitchenTypes=kitchenTypes;
      this.categories = categories;
      this.minPrice=minPrice;
      this.maxPrice=maxPrice;
      this.minRating=minRating;
      this.initialize= true;
      this.update();
  }
  constructor(private chosenDishesService:ChosenDishesService,
              private currenciesService: CurrenciesService,
              private fireDB:FireDBcommunicationService) {
    

    fireDB.getDishes().valueChanges().subscribe((x)=>{
      this.full = x;
      this.update();
    });
    this.currentProductList = new BehaviorSubject(this.full);
    this.currentFilteredProductList = new BehaviorSubject(this.filtered);
    this.update();
   }
}
