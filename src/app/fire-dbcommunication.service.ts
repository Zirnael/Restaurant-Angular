import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction} from '@angular/fire/compat/database';
import { Dish } from './dish';

@Injectable({
  providedIn: 'root'
})
export class FireDBcommunicationService {
  constructor(private db: AngularFireDatabase) { }
  
  getDishes():AngularFireList<any>{
    return this.db.list("/dishes");
  }
  removeDish(dish:Dish):void{
    this.db.list("/dishes").remove(dish.name);
  }
  addDish(x: Dish) {
    this.db.object("/dishes").update({[x.name]:x});
  }
  modDish(oldDish:Dish,newDish:Dish) {
    this.removeDish(oldDish);
    this.addDish(newDish);
  }
}