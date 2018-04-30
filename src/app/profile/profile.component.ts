import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Post} from '../Post'

@Component({
  selector: 'home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Post[];
  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4200/db/posts')
    .map((data: Response) => data.json())
    .subscribe((data:any) => {
      this.posts = data;
    })
  }

}
