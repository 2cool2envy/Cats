import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { appRouterModule } from './app.routing'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { LoadingComponent } from './loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { LoadingModule } from 'ngx-loading';
import { ChooseBucketComponent } from './choose-bucket/choose-bucket.component';
import { CollectionFetcher } from './services/collectionFetcher';
import { TempComponent } from './temp/temp.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPanelComponent,
    DashboardComponent,
    ListComponent,
    FoodlistComponent,
    LoadingComponent,
    ChooseBucketComponent,
    TempComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouterModule,
    BrowserAnimationsModule,
    FormsModule,
    LoadingModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 4000})
  ],
  providers: [AdminPanelComponent, CollectionFetcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
