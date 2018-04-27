import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { Resolve } from '@angular/router/src/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import { LoadingModule } from 'ngx-loading';
import {CollectionFetcher} from '../services/collectionFetcher';

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit {
  dataArray: any;
  data = {};
  itemType: boolean = true;
  count: number = 0;
  loadingStatus: boolean = false;
  typeResult: boolean = true;
  vegCheck: boolean = true;
  nonCheck: boolean = false;
  borderColor = 'black';
  colors:any[];
  fontName:string='times';
  fontCollection:any[];
  loading:boolean;
  theBuckets:any[];
  constructor(private http: Http,  private alertService: AlertService,  
    private loadingMod :LoadingModule,
    private cs :CollectionFetcher) {
  
      this.dataArray = [];
      var obj;

    this.getColors().subscribe(data => this.colors=data, error => console.log(error));
    console.log(this.colors);
    console.log();
  }

  ngOnInit() { }
  public getFonts(): Observable<any> {
    return this.http.get('./assets/json/fontNames.json')
                    .map((res:any) => {
                     return res.json();
                    });
}
 
public getColors(): Observable<any> {
  return this.http.get('./assets/json/colors.json')
                  .map((res:any) => {
                    return res.json();
                  });
}

add() {
    this.loadingStatus = true;
    if (this.dataArray == undefined) {
      console.log(this.dataArray);
      this.loadingStatus = false;
    }
    else {
      let type = this.typeResult == true ? 'veg' : 'non';
      let resp = { "item": this.item, "type": type };
      this.dataArray.push(resp);
      this.count++;
      this.loadingStatus = false;
    }
  }
  deleteItem(index: any) {
    this.dataArray.splice(index, 1);
    this.alertService.info('Item removed');
  }
  submit() {
    if (this.dataArray.length === 0) {
      this.alertService.danger('Add first before submit');
    }
    else {
      this.loading = true;
     this.addDataToFoodList(this.dataArray).subscribe(data => { 
      this.loading = false;
      console.log(data.code);
      if(data.code==='201')
      {
        console.log("inside if");
        this.dataArray=[];
        
      this.alertService.success('Food List published !!');
      } 
    });     
  
    }
  }
  addDataToFoodList(dataArray:any[])
  {
   
    let foodList = {'foodList': dataArray};
    console.log("foodlist to be send  ", foodList);
    console.log('Data to be send:',foodList);
    return this.http.post('http://localhost:1337/order', foodList)
      .map((res: Response) => { console.log(res.json()); return res.json() });
  }
  foodType(val: any) {
    if (val){
      this.typeResult = true;
    }
    else
    {
      this.typeResult = false;
    }

    console.log('this.typeResult', this.typeResult);

  }
  onKey(val: any) {
    this.borderColor = this.colors[Math.floor((Math.random() * 12) + 0)];
    this.fontName = this.fontCollection[Math.floor((Math.random() * 4) + 0)];
  let x = val.target.value.toLowerCase();
    if (x.includes('fish') || x.includes('chicken') || x.includes('egg')) {
      this.vegCheck = false;
      this.nonCheck = true;
      this.typeResult = false;
    }
    else {
      this.vegCheck = true;
      this.nonCheck = false;
      this.typeResult = true;
    }
   
  }


}
