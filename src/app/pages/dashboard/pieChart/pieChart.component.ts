import {Component} from '@angular/core';

import {BaThemeConfigProvider } from '../../../theme';
import 'easy-pie-chart/dist/jquery.easypiechart.js';

import { ShareService, _DATA_BOX } from './../../../providers/share-service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: _DATA_BOX[];


  constructor(
    public shared: ShareService,
    private _baConfig:BaThemeConfigProvider,) {
    this.getData();
  }



  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;

    if( pieColor ) {
      this.shared.totalUser.color = this.shared.newUser.color = this.shared.noOfReservations.color = this.shared.noOfStudents.color = pieColor;
    }

    this.charts = [this.shared.noOfReservations , this.shared.noOfStudents , this.shared.totalUser, this.shared.newUser];
    //console.log('this.charts',this.charts);
  }


}
