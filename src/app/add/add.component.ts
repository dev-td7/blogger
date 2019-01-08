import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Http } from '@angular/http'
import { Post } from '../Post';
import {PostService} from '../post.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  new_post: Post = {id: 0, title: '', content: ''}
  constructor(private http: Http, private postservice: PostService) { }

  ngOnInit() {
    this.update_id();
  }

  update_id = function(){
    this.http.get('./db/counts')
    .map((data: Response) => data.json())
    .subscribe((data:any) => {
      console.log(data[0].last_count);
      this.new_post.id = data[0].last_count + 1;
    });
  }

  submit = function(){
    // console.log(this.new_post);
    this.postservice.addPost(this.new_post);
  }

}
