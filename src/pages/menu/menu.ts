import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

import { DishdetailPage } from '../dishdetail/dishdetail';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dishservice: DishProvider,
    private favoriteProvider: FavoriteProvider,
    public toastCtrl: ToastController,
    @Inject('BaseURL') private BaseURL) { }
  
  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    });
  }

  addFavorite(dish: Dish){
    this.favoriteProvider.removeFavorite(id).subscribe(
      favorites => this.dishes = favorites,
      errmess => this.errmess = errmess
      );
      this.favoriteProvider.addToFavorites(dish.id);
  }
}