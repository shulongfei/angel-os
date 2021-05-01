import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import * as d3 from 'd3';
import CanvasNest from 'canvas-nest.js';

// const CanvasNest = require('canvas-nest.js');
@Component({
  selector: 'os-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  a="aaa"

  latestInfo = [
    {
      title: '版本1.0.0',
      desc: '最新版本修订中',
    },
    {
      title: '小谢今天有脚臭',
      desc: '小谢今天没洗脚',
    }
  ];

  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
  ];

  constructor(
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {

    const obj = {
      a: {
        name: 'xiaohong',
        value: 333
      },
      b: {
        name: 'xiaome',
        value: 'xiaohuang'
      }
    }

    console.log(Object.entries(obj));
    
  }
    

  onSystem(e) {
    e.preventDefault();
    this.router.navigate(['/system']);
  }

  ngAfterViewInit() {
    
  }

}
