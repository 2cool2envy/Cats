import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { Resolve } from '@angular/router/src/interfaces';



@Injectable() // Injectable is optional because this service doesn't have any dependencies
export class CollectionFetcher{
  constructor( private  http: Http){
  }
  ngOnInit() 
  {
    //this.getDataFromBucket('foodList2','bucket').subscribe((data)=>console.log(data));
  }

  getDataFromBucket(collection:any,key? :any,keyValue?:any ) : Observable<any[]>
{ 
    let req = JSON.stringify({'collection': collection,'key':key,'keyValue':keyValue });
  return this.http.get('http://localhost:1337/collectionFetch' + req)
      .map((res: Response) => { return res.json();console.log('res.json',res.json())});
}


}