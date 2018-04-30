import { Injectable } from '@angular/core';
import { Post } from './Post';
import { Http, Response, Headers } from '@angular/http';


@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getPosts():Post[]{
    var posts = [];
    this.http.get('http://localhost:4200/db/posts')
    .map((data: Response) => data.json())
    .subscribe((data:any) => {
      for(var i=0;i<data.length;i++){
        var this_post = data[i];
        var x = "3";
        if(this_post.content.length > 100) this_post.content = this_post.content.substr(0,100)+'...';
        posts.push(this_post);
      }
    })
    return posts;
  }

  getPost(post_num):Post{
    var post:Post = {id: post_num, title: '', content: ''};
    this.http.get('./db/posts/'+post.id)
    .map(data => data.json())
    .subscribe((data:any) => {
      post.title = data[0].title;
      post.content = data[0].content;
    })
    return post;
  }

  addPost(new_post){
    let header = new Headers({'Content-Type': 'application/json'});
    
    this.http.post('./db/posts',new_post, {headers: header})
    .subscribe(data => {
      this.http.post('./db/counts', {last_count: new_post.id}, {headers: header})
      .subscribe(data => {}, err => {
        console.log('Error occurred while updating last count, when updating post with ID: '+new_post.id+', Message -> '+err);
        this.deletePost(new_post);
      });
      return 'Congratulations on your new post!';
    }, error => {
      console.log('Error occurred while updating post with ID: '+new_post.id+', Message -> '+error);
    });
  }

  deletePost(post_num):void{
    this.http.delete('./db/posts/'+post_num)
    .subscribe(data => {}, err => {
      console.log('Error occurred while deleting post with ID: '+post_num+', Message -> '+err);
    });
  }

  updatePost(new_post:Post):void{
    let header = new Headers({'Content-Type': 'application/json'});
    this.http.put('./db/posts/'+new_post.id, new_post, {headers: header})
    .subscribe(data => {}, err => {
      console.log('Error occurred while updating post with ID: '+new_post.id+', Message -> '+err);
    })
  }

}
