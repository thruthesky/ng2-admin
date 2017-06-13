import {Component} from '@angular/core';

import {BaMsgCenterService} from './baMsgCenter.service';
import {ShareService} from "../../../providers/share-service";
import {_POSTS} from "angular-backend";

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  constructor(
    public shared: ShareService
  ) {
  }

}
