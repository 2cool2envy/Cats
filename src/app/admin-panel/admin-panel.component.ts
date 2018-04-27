import { Component, OnInit, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { LoadingModule } from 'ngx-loading';
import { AlertModule, AlertService } from 'ngx-alerts';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  dataArray: any;
  data = {};
  item: string;
  quan: any;
  count: number = 0;
  textValue: any;
  showBucketVar: boolean = false;
  userName:any;
  userId:any;
  avatar:any;
  date:any;
  loading:boolean
constructor(private http: Http,private loadingMod :LoadingModule, private alertService:AlertService) {
    this.dataArray = [];
 
  }

  ngOnInit() {
    sessionStorage.setItem("avtar", "../assets/avtar/0.png");
    this.avatar = sessionStorage.getItem('avtar');
    this.userName = JSON.parse(sessionStorage.getItem('user')).name;
    this.userId = JSON.parse(sessionStorage.getItem('user')).id;
    this.date = new Date();
  }
  ngOnChanges()
  {
    this.avatar = sessionStorage.getItem('avtar');
    console.log('chanfe');

  }
  add() {

    let resp = { "item": this.item, "q": this.quan };
    this.dataArray.push(resp);
    this.count++;
  
  }
  createBucket(time: any, note: any) {
    if(time.value===undefined | note.value===undefined | note.value.length<1)
    {
      this.alertService.warning('Add a note too');
      return false;
    }
this.loading= true;
let name = JSON.parse(sessionStorage.getItem('user')).name;
let id = JSON.parse(sessionStorage.getItem('user')).id;
    let resp = { 'time': time.value, 'note': note.value, 'name':name, 'id':id };
    console.log('the resp',resp);
    return this.http.post('http://localhost:1337/bucket', resp)
      .map((res: Response) => {
        console.log(res.json());
        return res.json();
      })
      .subscribe(data => {
        this.loading = false;
        console.log(data);
      });
  }
 
  
  showBucket() {
    this.showBucketVar = !this.showBucketVar;
  }

}
