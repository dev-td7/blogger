import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { Profile } from 'selenium-webdriver/firefox';
import { AppComponent } from './app/app.component';
import { PostComponent } from './post/post.component';
import { AddComponent } from './add/add.component';
import { BlogsComponent } from './blogs/blogs.component';
import { PostService } from './post.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AddComponent,
    BlogsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'blogs', component: BlogsComponent},
      {path: 'add', component: AddComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'post/edit/:id', component: EditComponent},
      {path: '', redirectTo: 'blogs', pathMatch: 'full'},
      {path: '**', redirectTo: 'blogs'}
    ])
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
