import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

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


  constructor() { }

  ngOnInit(): void {
  }

}
