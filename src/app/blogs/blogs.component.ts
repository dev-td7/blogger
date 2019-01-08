import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import 'rxjs/add/operator/map';
import {Post} from '../Post';
import {BrowserModule} from '@angular/platform-browser';
import {PostService} from '../post.service';

@Component({
  selector: 'blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  posts: Post[] = [];
  constructor(private http: Http, private postservice: PostService) { }

  ngOnInit() {
    this.posts = this.postservice.getPosts();
  }

  deletePost = function(post_num){
    var confirmation = confirm('Are you sure you want to delete this post?');
    if(confirmation){
      console.log('Received request to delete post #'+post_num);
      if(this.postservice.deletePost(post_num)) {
        location.reload();
      }
    }
  }

}
