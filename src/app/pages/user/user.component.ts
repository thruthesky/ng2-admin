import { Component } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Subject} from "rxjs/Subject";
import {_LIST, _USER_RESPONSE} from "angular-backend";

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class User {


  source: LocalDataSource = new LocalDataSource();


  users = <Array<_USER_RESPONSE>> [];

  searchString: string;



  searchQuery = <_LIST>{};
  no_of_current_page: number = 1;
  no_of_total_items: number = 0;
  no_of_items_in_one_page: number = 10;
  no_of_pages_in_navigator: number = 5;


  searchConfigChangeDebounce = new Subject();

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      idx: {
        title: 'IDX',
        type: 'number',
        editable: false
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      moderators: {
        title: 'Moderators',
        type: 'string'
      },
      level_list: {
        title: 'List',
        type: 'number'
      },
      level_view: {
        title: 'View',
        type: 'number'
      },
      level_write: {
        title: 'Write',
        type: 'number'
      },
      level_comment: {
        title: 'Comment',
        type: 'number'
      },
      deleted: {
        title: 'Deleted',
        type: 'number',
        editable: false
      }
    },
    pager: {
      display: false
    },
  };


  constructor() {

  }


  onCreateConfirm(event) {
    console.log('onCreateConfirm:: ', event);
  }

  onEditConfirm(event) {
    console.log('onEditConfirm:: ', event);
    console.log('onEditConfirm:: ', event.newData);
  }

  onDeleteConfirm(event): void {
    console.log('onDeleteConfirm:: ', event);
  }

  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    //this.currentPage = $event;
    this.loadSearchedData( $event );
  }

  loadSearchedData( page = 1 ) {

    // this.paginationUsers = [];
    // this.searchQuery.page = page;
    // this.searchQuery.limit = this.no_of_items_in_one_page;
    // this.user.list(this.searchQuery).subscribe((res: _USER_LIST_RESPONSE) => {
    //   console.info( 'loadSearchedData', res );
    //   this.paginationUsers = res.data.users;
    //   this.no_of_total_items = res.data.total;
    //   this.no_of_current_page = res.data.page;
    // }, err => this.user.alert(err));
  }




}
