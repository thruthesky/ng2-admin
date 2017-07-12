import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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



  new_user: FirebaseListObservable<any[]>;


  constructor(
    private db: AngularFireDatabase
  ){


  }

  getRecords( path: string, req? ): FirebaseListObservable<any[]>{
      let query = {};
      if( req  ) {
        query = req;
        if( !query['limitToLast']) query['limitToLast'] = 20;
      }
      else {
        query['limitToLast'] = 20;
      }
    return this.db.list('/' + path, {query});
  }

  push( path, data ) {
    return this.db.list('/' + path ).push(data);
  }


}
