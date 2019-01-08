import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../Post';
import { Http } from '@angular/http';
import {PostService} from '../post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post = {id: 0, title: '', content: ''};
  constructor(private route: ActivatedRoute, private http: Http, private postservice: PostService) { }

  ngOnInit() {
    this.post.id = +this.route.snapshot.paramMap.get('id');
    this.post = this.postservice.getPost(this.post.id);
  }

  deletePost(post_num){
    var confirmation = confirm('Are you sure you want to delete this post?');
    if(confirmation){
      console.log('Delete requested for post with ID: '+post_num);
      this.postservice.deletePost(post_num);
    }
  }
}
