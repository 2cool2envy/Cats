import { Component, OnInit, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { Resolve } from '@angular/router/src/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataArray: any;
  data = {};
  item: string;
  quan: any;
  count: number = 0;
  foodList: any[];
  imgSrc: any;
temp:any;
totalAvtar:number=11;
avtarArray:any[];
dataFromBuckets:any;
userDetails:any;
bucketName:string=null;
  constructor(private http: Http, private alertService: AlertService,private adminPanel : AdminPanelComponent) {

    this.dataArray = [];
    this.foodList = [];
    this.avtarArray=[];
    this.dataFromBuckets=[];
  }

  ngOnInit() {
    let userName  = JSON.parse(sessionStorage.getItem('user')).name;
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let date = new Date();
    this.userDetails = {"name":userName,"id":userId,"date":date};

    for(var i=0;i<12;i++)
    {
      this.avtarArray[i] = "../assets/avtar/"+i + ".png";
    }
    console.log(this.avtarArray);
 
        
    this.imgSrc = '';
    this.getFoodList().subscribe((data)=>{
      let x  = data;
     x =  x.foodList;
      for (var i=0;i<x.length;i++) {
        this.foodList[i] =(x[i]);       
    }   
  });
}
  public getFoodList(): Observable<any> {
    return this.http.get('http://localhost:1337/order')
                    .map((res:any) => {
                      return res.json();
                    });
  }
  
  addItemFromList(val: any) {
    this.item = val;
    this.quan = "1";
    this.add(true);
  }
  add(val?:any) 
  {
if(val===true)
{
  let resp = { "item": this.item, "q": this.quan};
  this.dataArray.push(resp);
  this.count++;
  console.log(this.dataArray);
}
else{
  if(this.quan===undefined || this.quan <1 || Number.isInteger(this.quan)===false)
    {
      this.alertService.danger('Add the quantity properly');
    }
    else if(this.item == undefined)
    {
      this.alertService.danger('Add the item');
      this.item="";
    }
    else
    {
     
      let resp = { "item": this.item, "q": this.quan};
      this.dataArray.push(resp);
      this.count++;
      console.log(this.dataArray);
      this.item="";
    }
  
}

this.quan=undefined;
  }
  deleteItem(index: any) {
    console.log("deleteItem", index);
    console.log(this.dataArray[index].item);
    this.dataArray.splice(index, 1);
  }
  submit() {
    this.bucketName = sessionStorage.getItem('bucketName');
    console.log(this.bucketName);
    if(this.bucketName===null)
    {
      this.alertService.danger('Choose the bucket !');
      return false;
    }
    if (this.dataArray.length === 0) {
      this.alertService.warning('Add items in the list firstly');
    }
    else {
    this.addToUserFoodList().subscribe(data=> console.log(data));
    }
  }
  addToUserFoodList() : Observable<any>
  {
    let resp = this.dataArray;
    let temp ={"bucket":this.bucketName,"id":this.userDetails.id,"name":this.userDetails.name ,"order":resp};
    this.dataArray = [];
    return this.http.post('http://localhost:1337/userFoodList', temp)
    .map((res: Response) => { return res.json();});
  }
  changeAvtar(data:any)
  {
    sessionStorage.setItem("avtar",  this.avtarArray[data]);
    console.log("new link:", this.avtarArray[data]);
  }
  // getDataFromBuckets() : Observable<any[]>
  // {
  //   return this.http.get('http://localhost:1337/bucket')
  //       .map((res: Response) => { return res.json();});
  // }
//   radioChanged(val:any)
//   {
// this.bucketName = val.target.value;
// this.alertService.info('Bucket selected');

//   }
}
