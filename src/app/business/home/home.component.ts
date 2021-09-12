import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import * as d3 from 'd3';
import CanvasNest from 'canvas-nest.js';

@Component({
  selector: 'os-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSystem(e) {
    e.preventDefault();
    this.router.navigate(['/system']);
  }

  ngAfterViewInit() { }

}
