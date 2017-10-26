import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Comment } from '../../shared/comment';


/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: Comment;
  commentForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder, public viewCtrl: ViewController) {
  	this.commentForm = this.fb.group({
  		author:['',Validators.required],
  		rating:1,
  		comment:['',Validators.required]
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  onSubmit(){
  	this.comment = this.commentForm.value;
  	let d = new Date();
    let n = d.toISOString();
    this.comment.date = n;
    this.viewCtrl.dismiss(this.comment);

  }

}
