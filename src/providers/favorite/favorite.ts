import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

	favorites: Array<any>;

  constructor(public http: Http, public dishService: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }
  addToFavorites(id: number): boolean{
  	if(!this.isFavorite(id))
  		this.favorites.push(id);
  	return true;
  }
  getFavorites(): Observable<Dish[]>{
  	return this.dishService.getDishes()
  		.map(dishes => dishes.filter(dish => this.favorites.some(el => el===dish.id)));
  }
  isFavorite(id: number): boolean{
  	return this.favorites.some(el => el===id);
  }
  removeFavorite(id: number): Observable<Dish[]>{
  	if(this.favorites.indexOf(id)>=0){
  		this.favorites.splice(this.favorites.indexOf(id),1);
  		return this.getFavorites();
  	}
  	else{
  	  console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
  	}
  }

}
