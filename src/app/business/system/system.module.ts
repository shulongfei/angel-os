import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './system.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { ExerciseComponent } from './exercise/exercise.component';


@NgModule({
  imports: [
    SystemRoutingModule, 
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule, 
    NzLayoutModule
  ],
  declarations: [SystemComponent, ExerciseComponent],
  exports: [SystemComponent]
})

export class SystemModule { }
