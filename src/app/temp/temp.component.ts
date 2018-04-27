import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CollectionFetcher } from '../services/collectionFetcher';
import { fail } from 'assert';


@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

  constructor(private alertService: AlertService, private http: Http, private cs : CollectionFetcher,private router: Router) { }
arr:any[];
requestList:any[];
noData:boolean=true;
showModal:boolean = true;
  ngOnInit() {
    this.arr=[];

this.getData();
 }
submit(food:any,q:any,user:any)
  {
    console.log(food.value);
   if(food.value!==undefined && q.value!==undefined && user.value!==undefined && food.value!=="" && q.value!=="" && user.value!=="")
   {
    this.noData = false; 
this.arr.push(food.value);
this.arr.push(q.value);
this.arr.push(user.value);
this.addOrder(this.arr);
this.arr=[];
this.alertService.success('Added');
this.alertService.info('Request submitted successfully');
this.getData();

food.value="";
user.value="";
q.value="";
   }
   else
   {
    this.alertService.warning('Add all details !!');
   }
   console.log('arr:',this.arr);
  }
  addOrder(val:any)
{
  let  respo = val;
  this.http.post('http://localhost:1337/quick', respo).map((res:Response) => return res.json()).subscribe((data) => {
    this.requestList = data.reverse();
  });

}
getData() 
{
   this.cs.getDataFromBucket('foodList2', 'bucket', 'open').subscribe((data )=> {
    this.requestList = data});
    console.log('this.requestList ',this.requestList); 
   this.noData = false; 
  
}
isVeg(val:any):boolean
{
  let  str = val.toLowerCase();
    let n = (str.includes('egg') || str.includes('fish') || str.includes('chicken') || str.includes('mutton') || str.includes('kabab') );
    return n;
}
}
