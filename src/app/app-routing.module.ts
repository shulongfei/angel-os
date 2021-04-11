import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { 
    path: 'login', 
    loadChildren: () => import('./business/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./business/home/home.module').then(m => m.HomeModule) ,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { 
    path: 'system', 
    loadChildren: () => import('./business/system/system.module').then(m => m.SystemModule),
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
