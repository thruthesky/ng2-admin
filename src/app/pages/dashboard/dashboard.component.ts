import {Component} from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {


  data = {
    areaLineData: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: false
    }
  };

  constructor() {
  }

}
