import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { FilterComponent } from './filter/filter.component';
import { DishDisplayComponent } from './dish-display/dish-display.component';
import { FormComponent } from './form/form.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    FilterComponent,
    DishDisplayComponent,
    FormComponent,
    DishDetailsComponent,
    CartComponent,
    MenuComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
