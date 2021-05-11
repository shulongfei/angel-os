import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { 
    path: '', 
    component: SystemComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'exercise', component: ExerciseComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
