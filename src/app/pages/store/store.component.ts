import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  storeTime = [
    {day: 'Sunday', time: 'Closed'},
    {day: 'Monday', time: '7:00 AM to 8:00 PM'},
    {day: 'Tuesday', time: '7:00 AM to 8:00 PM'},
    {day: 'Wednesday', time: '7:00 AM to 8:00 PM'},
    {day: 'Thursday', time: '7:00 AM to 8:00 PM'},
    {day: 'Friday', time: '7:00 AM to 8:00 PM'},
    {day: 'Saturday', time: '9:00 AM to 5:00 PM'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
