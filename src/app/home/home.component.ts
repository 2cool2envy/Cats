import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import { fail } from 'assert';
import { LoadingModule } from 'ngx-loading';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'app';
  id:number;
  password:any;
  path:string="http://localhost:3000/contact";
  responseRecieved:any;
  signUpEmpId:any;
  signUpPassword:any;
  signUpName:any;
  errorOnSignUp:boolean=false;
  loading:boolean;
  constructor(private http: Http,private router: Router, private alertService:AlertService, private loadingMod :LoadingModule) {
  }

  ngOnInit() { }


  login() {
    if(this.id===undefined | this.id==="")
    {
      this.alertService.warning('Enter the Id !!');
      return false;
    }
   // this.loading = true;
   this.sendLoginRequest().subscribe((data) => {
            this.responseRecieved = data;
       console.log("responseRecieved :",this.responseRecieved);
       if(this.responseRecieved.code==='200')
       {
    ///    this.alertService.success('Welcome abord ');
        sessionStorage.setItem('user', JSON.stringify(this.responseRecieved));
      this.router.navigate(['/dashboard']);
       let xx = JSON.parse((sessionStorage.getItem('user')));
       console.log(xx.code);
    //   this.loading = false;
       }
       else
       {
        this.alertService.danger(this.responseRecieved.message);
        localStorage.clear();
      //  this.loading = false;
       }
      });
  }
  sendLoginRequest() : Observable<any>
  {
    console.log("sendLoginRequest function called")
    console.log(this.id);
     let respo = JSON.stringify( { 'id': this.id, 'password':this.password });
      console.log("sendLoginRequest function respo:",respo)
     return this.http.get('http://localhost:1337/login' + respo).map((res: Response) => {
        console.log(res.json());
        return res.json();
      });
  }
  signUp()
  {
    console.log("errorOnSignUp",this.errorOnSignUp);
   
    console.log(this.signUpEmpId,this.signUpPassword,this.signUpName);
   if(this.signUpEmpId !==undefined && this.signUpPassword!==undefined && this.signUpName !==undefined)
   {
     if(this.signUpEmpId.length<6)
     {
      this.alertService.warning('Emp Id must be of least 6 digit');
     }
     else{
      this.errorOnSignUp =false;
      this.addUser();
     }
    
   }  
   else{
    this.errorOnSignUp =true;
    this.alertService.warning('Add the details in all boxes');
   }
  }
addUser()
{
 // this.loading = true;
  let  respo = {'id':this.signUpEmpId,'name':this.signUpName,'password':this.signUpPassword,'role':'user'};
 console.log("data to send",respo);
  this.http.post('http://localhost:1337/login',respo).map((res:Response)=>return res.json()).subscribe((data) => { 
    console.log(data);
    // this.loading = false;
    if(data.code==='201')
    {
      this.alertService.success('Hey ' + this.signUpName + ' you are in');
      this.router.navigate(['/dashboard']);

    }
    else if(data.code==='406')
    {
      this.alertService.danger('User already exists ');
      this.router.navigate(['/home']);
    } 
    else
    {
      this.alertService.danger('Some Error ');
      this.router.navigate(['/home']);
    }  
    });

}

}
