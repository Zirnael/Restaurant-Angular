import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishDisplayComponent } from './dish-display/dish-display.component';
import { FormComponent} from './form/form.component';
import {HomeComponent} from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'details/:name', component: DishDetailsComponent },
  { path: 'mod/:name', component: FormComponent},
  {path: 'home',component: HomeComponent},
  {path: 'dishes', component: DishDisplayComponent},
  {path: 'add', component: FormComponent},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }