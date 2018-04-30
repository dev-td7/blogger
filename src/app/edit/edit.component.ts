import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Post } from '../Post';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post: Post = {id: 0, title: '', content: ''};
  constructor(private route: ActivatedRoute, private http: Http, private postservice: PostService) { }

  ngOnInit() {
    this.post.id = +this.route.snapshot.paramMap.get('id');
    this.post = this.postservice.getPost(this.post.id);
  }

  update(){
    console.log('Received request to edit post #'+this.post.id);
    var confirmation = confirm('Save current changes?');
    if(confirmation){
      this.postservice.updatePost(this.post);
      history.back();
    }
  }
}
