import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { TempComponent } from './temp/temp.component'; 

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
     
      {
        path: 'dashboard',
        component: DashboardComponent 
      },
      {
        path: 'list',
        component: ListComponent 
      },
      {
        path: 'foodlist',
        component: FoodlistComponent 
      },
      {
        path: 'quick',
        component:TempComponent
      }
];
export const appRouterModule = RouterModule.forRoot(routes);