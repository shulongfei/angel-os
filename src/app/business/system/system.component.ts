import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
