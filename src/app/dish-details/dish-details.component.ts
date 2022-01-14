import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChosenDishesService } from '../chosen-dishes.service';
import { CurrenciesService } from '../currencies.service';
import {Dish} from "../dish";
import { DishService } from '../dish.service';
import { FireDBcommunicationService } from '../fire-dbcommunication.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish:Dish | undefined;
  errors:string[] = [];
  rate = new FormControl();
  commentForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    date: new FormControl()
  });

  userRating:number| undefined;

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              private router: Router,
              private chosenDishesService: ChosenDishesService,
              private currenciesService: CurrenciesService,
              private fireDB:FireDBcommunicationService) {
               }

  ngOnInit(): void {
    this.getDish();
  }
  getDish(){
    let name  = this.route.snapshot.paramMap.get("name");
    if(name == null) {
      this.router.navigate([""]);
    }
    this.dish = this.dishService.getDish(name!);
    if(this.dish == undefined) {
      this.dishService.observeDish(name!).subscribe((x)=>{
        this.dish=x;
      });
    }

  }
  getCommentForm():FormGroup{
    return this.commentForm;
  }
  onSubmit():void{
    this.errors = [];
    let title = this.commentForm.value["title"];
    if(title === null || title === undefined || title.length === 0){
      this.errors.push("title cannot be empty");
    }
    let description:string = this.commentForm.value["description"];
    if(description === null){
      this.errors.push("description cannot be empty");
    }
    else{
      if (description.length < 50)
      {
        this.errors.push("description must be at least 50 characters");
      }
      else if(description.length > 500){
        this.errors.push("description can have at most 500 characters");
      }
    }
    if (this.errors.length >0){
      return;
    }
    let comment ={
      title:title,
      description:description,
      date:this.commentForm.value["date"]
    }
    this.dishService.addComment(this.dish!,comment);
    alert("comment added successfully");
    this.commentForm.reset();
    this.dishService.observeDish(this.dish!.name).subscribe((x)=>this.dish = x);
  }
  rating():number| undefined{
    let x = this.dishService.rating(this.dish!);
    let total = 0;
    let count = 0;
    if(this.dish!==undefined){
      total += this.dish.rate.total;
      count += this.dish.rate.count;
    }
    if(this.userRating !==undefined){
      total += this.userRating;
      count += 1;
    }
    if(count == 0) {
      return undefined;
    }
    return Math.round(total/count);
  }
  ratingCount(){
    let count = 0;
    if(this.dish!==undefined){
      count += this.dish.rate.count;
    }
    if(this.userRating !==undefined){
      count += 1;
    }
    return count;
  }
  getFormRate():FormControl{
    return this.rate as FormControl;
  }
  getRate(){
    return this.rate.value;
  }
  setRate(){
    this.dishService.rate(this.dish!,this.getRate());
    this.userRating = this.getRate();
  }
  
  addClick(dish:Dish):void{
    this.chosenDishesService.add(dish.name);
  }
  
  getInfo(dish:Dish):number{
    return this.chosenDishesService.info(dish.name);
  }
  removeClick(dish:Dish):void
  {
    this.chosenDishesService.remove(dish.name);
  }
  currencyIcon():string{
    return this.currenciesService.icon();
  }
  price(dish:Dish):string{
    let result:number = dish.price;
    result *= this.currenciesService.value();
    result /= 10000;
    return result.toFixed(2);
  }
  delete(dish:Dish):void{
    let text:string = "Are you sure you want to delete this dish. The change is Permanent!";
    if(confirm(text)){
      this.dishService.delete(dish);
      this.router.navigateByUrl("");
    }
  }
}
