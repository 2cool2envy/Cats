import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { Resolve } from '@angular/router/src/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import {CollectionFetcher} from '../services/collectionFetcher';
import { BootstrapOptions } from '@angular/core/src/application_ref';

@Component({
  selector: 'app-choose-bucket',
  templateUrl: './choose-bucket.component.html',
  styleUrls: ['./choose-bucket.component.css']
})
export class ChooseBucketComponent implements OnInit {
  @Input() buckets: any[];


  @Output() onBucketPicked: EventEmitter<any> = new EventEmitter<any>();

bucketsByUser:any;
endsWithFoodList:boolean;

  constructor(private http: Http, private alertService: AlertService, private cs : CollectionFetcher) { }
  bucketName:any;
  dataFromBuckets:any[];
  ngOnInit() {
    let url = window.location.href;
    this.endsWithFoodList = url.endsWith("/foodlist");
    console.log('foodlist is :',this.n);
   if(this.endsWithFoodList)
   {
     console.log('endsWithFoodList is :',true);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    this.cs.getDataFromBucket('bucketCollection',userId).subscribe(data=>{
      this.bucketsByUser = data;
      console.log('data',this.bucketsByUser);

    });
   }
   else{
    this.getDataFromBuckets().subscribe(data=> {
      this.dataFromBuckets = data;
    });
   }

  }
  radioChanged(val:any)
  {
    console.log('radio cahnged');
    this.bucketName = val.target.value;
console.log(this.bucketName);
    if(this.n)
    {

    }
    else{
    
     
      this.onBucketPicked.emit(this.bucketName);
      sessionStorage.setItem('bucketName', this.bucketName);
      this.alertService.info('Bucket selected');
    }


  }
  public pickDate(date: any): void {
    console.log("pickDate function");
    this.onBucketPicked.emit(this.bucketName);
}
  getDataFromBuckets() : Observable<any[]>
  {
    return this.http.get('http://localhost:1337/bucket')
        .map((res: Response) => { return res.json();});
  }

 
}
