import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SystemComponent } from './system.component';
import { ExerciseComponent } from './exercise/exercise.component';


const routes: Routes = [
  { 
    path: '', 
    component: SystemComponent,
    children: [
      { 
        path: 'exrecise', 
        loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule),
      },
    ]
  },
  
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
