import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { SystemRoutingModule } from './system-routing.module';
// import { SystemComponent } from './system.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

// import { ExerciseComponent } from './exercise.component';


@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule, 
    NzLayoutModule,
    NzCarouselModule
  ],
  declarations: [],
  exports: []
})

export class ExerciseModule { }
