import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup,Validators } from '@angular/forms';

import { DishService } from '../dish.service';
import {CATEGORIES} from "../categories";
import {KITCHEN_TYPES} from "../kitchenTypes";
import { ActivatedRoute, Router } from '@angular/router';
import { generate } from 'rxjs';
import { Dish } from '../dish';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  categories = CATEGORIES;
  kitchenTypes = KITCHEN_TYPES;
  dish?:Dish;
  languages = ["Polski", "English", "French"];
  myform!: FormGroup;
  getLinksArray():FormArray{
    return (this.myform.get("links") as FormArray)
  }
  addLink():void{
    let newForm = new FormControl("");
    this.getLinksArray().push(newForm);
  }
  onSubmit() {
    let DishName = this.myform.value["dishName"];
    let KitchenType = this.myform.value["kitchenType"];
    let Category = this.myform.value["category"];
    let Ingredients = this.myform.value["ingredients"];
    let maxPossible = this.myform.value["max_possible"];
    let price = this.myform.value["price"];
    let description = this.myform.value["description"];
    let link = this.myform.value["links"];
    this.myform.reset();
    let message:string;
    if(this.dish != undefined){
      this.dishService.mod(this.dish,DishName,KitchenType,Category,Ingredients,maxPossible,price,description,link);
      message = "Dish modified successfully";
    }
    else{
      this.dishService.add(DishName,KitchenType,Category,Ingredients,maxPossible,price,description,link);
      message = "Dish added successfully";
    }
    alert(message);
    this.router.navigateByUrl("/dishes");
  }
  getLinkControle(i:number):FormControl{
    return this.getLinksArray().controls[i] as FormControl;
  }  
  
  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit():void {
    if(this.route.snapshot.routeConfig?.path == "add"){

      this.myform = new FormGroup({
        dishName: new FormControl("",Validators.required), 
        kitchenType: new FormControl("",Validators.required),
        category: new FormControl("",Validators.required),
        ingredients: new FormControl(""),
        max_possible: new FormControl(0,Validators.required),
        price: new FormControl(0,Validators.required),
        description: new FormControl(""),
        links: new FormArray([new FormControl("")])
      });
    }
    else{
      
      let name  = this.route.snapshot.paramMap.get("name");
      console.log();
      
      if(name == null) {
        this.router.navigate([""]);
        return;
      }
      this.dish = this.dishService.getDish(name!);
      if(this.dish == undefined) {
        this.router.navigate([""]);
        return;
      }
      
      let x:Dish = this.dish!;
      let sfa = new FormArray([]);
      for(let source of x.link){
        let sfc = new FormControl(source);
        sfa.push(sfc);
      }
      this.myform = new FormGroup({
        dishName: new FormControl(x.name), 
        kitchenType: new FormControl(x.kitchen_type),
        category: new FormControl(x.category),
        ingredients: new FormControl(x.ingredients),
        max_possible: new FormControl(x.max_possible),
        price: new FormControl(x.price),
        description: new FormControl(x.description),
        links: sfa
      });
    }
  }
}
