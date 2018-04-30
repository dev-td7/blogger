import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'blog.io';
  uname:string = '';
  pwd:string = '';
  submit = function(){
    alert(this.uname+' | '+this.pwd);
  }
}
