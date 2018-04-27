import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { Resolve } from '@angular/router/src/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, AlertService } from 'ngx-alerts';
import { CollectionFetcher } from '../services/collectionFetcher'; 
import { LoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  type: any;
  private sub: any;
userData:any[];
  data: any[];
  msg:string;
  loading:boolean;
  constructor(private route: ActivatedRoute,private http: Http, 
    private alertService: AlertService, private cs : CollectionFetcher, private loadingMod :LoadingModule) {
    


  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log(params.type);
      this.type = params.type;    
      if(this.type=='my')
{
  console.log("show only my list");
  
}
else{
  console.log("admin is here");
}
    }

  }
 
  getBucketName(bucketName: any):void {
    this.loading = true;
    console.log('Picked bucked: ', bucketName);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    
    this.cs.getDataFromBucket(bucketName, userId).subscribe(data=>{
      this.loading = false;
      console.log('original',data);
    
      if(data!==null || data!==undefined)
      {
          if(typeof data[0] === 'undefined')
            {
              this.alertService.warning('No data match in selected bucket');
              this.userData = null;
            }
      else{
         this.userData = data;      
      }
      }
    
    });
}

}
