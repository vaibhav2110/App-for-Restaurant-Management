import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';



/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  
  dish : Dish;
  avgstars: string;
  numcomments: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private favoriteservice: FavoriteProvider,
    public toastCtrl: ToastController,
    public action: ActionSheetController,
    public model: ModalController,
    @Inject('BaseURL') private BaseURL) { 
  	this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comments => total+= comments.rating);
    this.avgstars = total/(this.numcomments).toFixed(2);
    this.favorite = this.favoriteservice.isFavorite(this.dish.id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');

  }
  addFavorite(){
    this.favorite = this.favoriteservice.addToFavorites(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish'+this.dish.id+' Added Successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }
  openAction(){
    this.action.create({
      title: 'Options',
      buttons: [{
        text: 'Add to Favorites',
        handler: ()=>{this.addFavorite();}
      },
      {
        text: 'Add a comment',
        handler: ()=>{let modal = this.model.create(CommentPage);
          modal.onDidDismiss(comment => this.dish.comments.push(comment));
          modal.present();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    }).present();
  }


}
