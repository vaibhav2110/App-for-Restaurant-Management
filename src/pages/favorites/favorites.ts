import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  dishes: Dish[];
  errmess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public favoriteProvider: FavoriteProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  	@Inject('BaseURL') public BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit(){
  	this.favoriteProvider.getFavorites().subscribe(
  		favorites => this.dishes = favorites,
  		errmess => this.errmess = errmess
  		);
  	    console.log('ionViewDidLoad getdata');

  }

  deleteFavorite(item: ItemSliding,id: number){
    this.alertCtrl.create({
      title:'Confirm Delete',
      message: 'Do you want to delete Dish '+id,
      buttons:[{
        text:'Cancel',
        role: 'cancel',
        handler: ()=> {
          console.log('Deletion Cancelled');
        }
      },
      {
        text: 'Delete',
        handler: ()=>{
          let loading = this.loadingCtrl.create({
            content: 'Deleting...'
          });
          let toast = this.toastCtrl.create({
            message: 'Dish'+id+' deleted Successfully',
            duration:3000
          });
          loading.present();
          this.favoriteProvider.removeFavorite(id).subscribe(
            favorites => {this.dishes = favorites; loading.dismiss(); toast.present();},
            errmess => {this.errmess = errmess; loading.dismiss();}
            );
        }
      }]
    }).present();
  	
  	item.close();
  }
}
