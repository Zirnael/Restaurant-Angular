import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  chosen:BehaviorSubject<string>;
  constructor() { 
    this.chosen = new BehaviorSubject("EUR");
  }

  value():number{
    switch (this.chosen.getValue()) {
      case "EUR":
        return 462;
      
      case "USD":
        return 402;

      default:
        return 100;
    }
  }
  
  icon():string{
    switch (this.chosen.getValue()) {
      case "EUR":
        return "€"
      
      case "USD":
        return "$"

      default:
        return "";
    }
  }
  priceValue(x:number):number{
    return x*this.value();
  }
}
