import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

export interface _FIREBASE_CHAT {
  user: string;
  name: string;
  message: string;
  time?: number;
  count?: number;
  newVisitor?: boolean;
  noOfClasses?: number;
}




@Injectable()
export class FirebaseService {



  new_user:  Observable<any[]>;


  constructor(
    private db: AngularFireDatabase
  ){


  }

  getRecords( path: string, req = {}) {
    if ( ! req['limitToLast'] ) req['limitToLast'] = 20;
    return this.db.list('/' + path, ref => {
      if ( req['orderByKey'] ) ref.orderByKey().limitToLast( req['limitToLast'] );
      else ref.limitToLast( req['limitToLast']);
      return ref;
    });
  }

  push( path, data ) {
    return this.db.list('/' + path ).push(data);
  }


}
