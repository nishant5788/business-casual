import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  storeMainHeading: string = "Come On In";
  storeTagline: string = "We're Open";

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

  ngOnInit() {}

  addToday(index: number) {
    let today = new Date().getDay();
    let currentHour = new Date().getHours();

    if(currentHour > 19 || currentHour < 7 || today === 0) {
      this.storeClosed();
    }

    if(today === 6 && currentHour > 17 || currentHour < 9) {
      this.storeClosed();
    }

    if (index === today) {
      return 'today';
    } else {
      return false;
    }
  }

  storeClosed() {
    this.storeMainHeading = "Sorry";
    this.storeTagline = "We're Closed";
  }

}
