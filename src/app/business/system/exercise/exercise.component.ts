import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.less']
})
export class ExerciseComponent implements OnInit {

  array = [1, 2, 3, 4];
  effect = 'scrollx';

  constructor() { }

  ngOnInit(): void {
  }

}
