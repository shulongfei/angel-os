import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { 
    path: 'login', 
    loadChildren: () => import('./business/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'system', 
    loadChildren: () => import('./business/system/system.module').then(m => m.SystemModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
