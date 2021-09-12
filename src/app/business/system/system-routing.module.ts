import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManageComponent } from './user-manage/user-manage.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'exercise', component: ExerciseComponent },
      { path: 'userManage', component: UserManageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
