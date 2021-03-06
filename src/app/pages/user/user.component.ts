import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Subject} from "rxjs/Subject";
import {
  User, _LIST, _USER_LIST_RESPONSE, _USER_RESPONSE, _USER_EDIT, _USER_EDIT_RESPONSE,
  _DELETE_RESPONSE
} from "angular-backend";
import { ChangePasswordButton } from "./components/changePasswordButton/changePasswordButton";
import {ShareService} from "../../providers/share-service";
import {LMS} from "../../providers/lms";

@Component({
  selector: 'user-page',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserPage implements OnInit {


  source: LocalDataSource = new LocalDataSource();

  searchChangeDebounce = new Subject();
  list_of_users: _USER_RESPONSE[] = [];

  searchString: string;

  searchQuery = <_LIST>{};
  no_of_current_page: number = 1;
  no_of_total_items: number = 0;
  no_of_items_in_one_page: number = 10;
  no_of_pages_in_navigator: number = 5;

  settings = {
    // add: {
    //   addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    //   createButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    //   confirmCreate: true
    // },
    actions: {
      add: false
    },
    hideSubHeader: true,
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
      // idx: {
      //   title: 'IDX',
      //   type: 'number',
      //   editable: false
      // },
      id: {
        title: 'ID',
        type: 'string',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      mobile: {
        title: 'Mobile',
        type: 'Number'
      },
      city: {
        title: 'ClassID',
        type: 'string'
      },
      changePassword: {
        title: 'Change Password',
        type: 'custom',
        renderComponent: ChangePasswordButton,
          // onComponentInitFunction(instance) {
          //   instance.onClickKey.subscribe(row => {
          //     //console.log(`click ${row}`);
          //   });
          // },
        editable: false,
        filter: false
      },
    },
    pager: {
      display: false
    },
  };


  constructor(
    private lms: LMS,
    public user: User,
    public shared: ShareService
  ) {
    this.listenEvents();
  }

  listenEvents() {
    this.shared.myEvent.subscribe( item => {
      if( item.eventType === 'header-search'  ){
        this.searchString = item.search;
        this.onChangedSearch();
      }
    });
  }

  // ngOnDestroy() {
  //   this.shared.myEvent.unsubscribe();
  // }

  ngOnInit() {

    if (this.shared.searchString){
      this.searchString = this.shared.searchString;
      this.shared.searchString = null;
    }
    this.onChangedSearch();
    this.searchChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedSearch());
  }

  onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);
    if (this.searchString) {
      if (this.searchString.length < 2 ) return;
    }

    let cond = '';
    let bind = '';

    if ( this.searchString ) {
      cond += "id LIKE ? OR" +
        " name LIKE ? OR" +
        " middle_name like ? OR" +
        " last_name LIKE ? OR" +
        " email LIKE ?";

      bind += `%${this.searchString}%,` +
        `%${this.searchString}%,` +
        `%${this.searchString}%,` +
        `%${this.searchString}%,` +
        `%${this.searchString}%`;
    }

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.loadSearchedData();
  }


  loadSearchedData( page = 1 ) {
    this.source.empty();
    this.searchQuery.page = page;
    this.searchQuery.limit = this.no_of_items_in_one_page;
    this.user.list(this.searchQuery).subscribe((res: _USER_LIST_RESPONSE) => {
      //console.info( 'loadSearchedData', res );
      this.list_of_users = res.data.users;
      this.list_of_users.map( (user) => {
        user['changePassword'] = user.idx;
      });
      this.source.load(this.list_of_users);
      this.no_of_total_items = res.data.total;
      this.no_of_current_page = res.data.page;

    }, err => this.user.alert(err));
  }



  onEditConfirm(event) {
    //console.log('onEditConfirm:: ', event);
    //console.log('onEditConfirm:: ', event.newData);
    //console.log( event.newData ) ;
    let re = confirm("Save Changes for User ID : " + event.newData.id);
    if ( !re ) return;

    let edit: _USER_EDIT = <_USER_EDIT> {
      id: event.newData.id,
      name: event.newData.name,
      email: event.newData.email,
      mobile: event.newData.mobile,
      city: event.newData.city
    };

    this.user.edit( edit ).subscribe( (res: _USER_EDIT_RESPONSE) => {
      //console.log("onEditConfirm::response: ", res);
      if ( res.code === 0 ) {
        //event.confirm.resolve();
        this.lms.update( event.newData, res => {
        }, err => {
          this.user.alert(err);
        } );
        this.loadSearchedData();
      }
    }, err => this.user.alert( err ) );
  }

  onDeleteConfirm(event): void {
    //console.log('onDeleteConfirm:: ', event);
    //console.log( event.data.id );
    let re = confirm("Are you sure you want to delete ID: " + event.data.id);
    if ( !re ) return;

    this.user.delete( event.data.id ).subscribe( (res: _DELETE_RESPONSE) => {
      //console.log("delete response: ", res);
      if ( res.code === 0 ) {
        event.confirm.resolve();
        //this.loadSearchedData();
        alert('User ID: ' + event.data.id + ' has been deleted...');
      }
    }, err => this.user.alert( err ) );
  }

  onPageClick($event) {
    this.loadSearchedData( $event );
  }

  onChangeSearch() {
    this.searchChangeDebounce.next();
  }

}
