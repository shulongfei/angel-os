import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard';
import { PreloadI18nResolverService } from './shared/services/preload-i18n-resolver.service'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { 
    path: 'login', 
    loadChildren: () => 
    import('./business/login/login.module').then(m => m.LoginModule),
    resolve: { 
      PreloadI18nResolverService
    }
  },
  { 
    path: 'home', 
    loadChildren: () => import('./business/home/home.module').then(m => m.HomeModule),
    resolve: { 
      PreloadI18nResolverService
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { 
    path: 'system', 
    loadChildren: () => import('./business/system/system.module').then(m => m.SystemModule),
    resolve: { 
      PreloadI18nResolverService
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
