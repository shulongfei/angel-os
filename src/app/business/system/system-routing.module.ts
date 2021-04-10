import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { ExerciseComponent } from './exercise/exercise.component';


const routes: Routes = [
  { 
    path: '', 
    component: SystemComponent,
    children: [
      { path: 'exercise', component: ExerciseComponent, } 
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
