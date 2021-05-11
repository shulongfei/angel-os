import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './shared/guard';
import { PreloadI18nResolverService } from './shared/services/preload-i18n-resolver.service'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { 
    path: 'login', 
    loadChildren: () => 
    import('./business/login/login.module').then(m => m.LoginModule),
    resolve: { 
      reload: PreloadI18nResolverService
    }
  },
  { 
    path: 'home', 
    loadChildren: () => import('./business/home/home.module').then(m => m.HomeModule),
    resolve: { 
      reload: PreloadI18nResolverService
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { 
    path: 'system', 
    loadChildren: () => import('./business/system/system.module').then(m => m.SystemModule),
    resolve: { 
      reload: PreloadI18nResolverService
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  }
];

export function errorHandler(error: Error) {
  // 打印未匹配的路由地址
  console.warn(error.message);
  return true;
}

// 配置路由参数选项
const routerExtraOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  errorHandler
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
