import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {
  _CONFIG, _CONFIG_CREATE, _CONFIG_CREATE_RESPONSE, _CONFIG_EDIT, _CONFIG_EDIT_RESPONSE, _CONFIGS, _DELETE_RESPONSE,
  _LIST, _POST_LIST_RESPONSE,
  PostConfig
} from "angular-backend";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls: ['./forum.scss']
})
export class ForumPage {

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
      // idx: {
      //   title: 'IDX',
      //   type: 'number',
      //   editable: false,
      //   filter:false
      // },
      id: {
        title: 'ID',
        type: 'string',
        //editable: false
        filter:false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter:false
      },
      description: {
        title: 'Description',
        type: 'string',
        filter:false
      },
      moderators: {
        title: 'Moderators',
        type: 'string',
        filter:false
      },
      level_list: {
        title: 'List',
        type: 'number',
        filter:false
      },
      level_view: {
        title: 'View',
        type: 'number',
        filter:false
      },
      level_write: {
        title: 'Write',
        type: 'number',
        filter:false
      },
      level_comment: {
        title: 'Comment',
        type: 'number',
        filter:false
      },
        // deleted: {
        //   title: 'Deleted',
        //   type: 'number',
        //   editable: false
        // }
    },
    pager: {
      display: false
    },
  };



  searchString: string;
  postConfigs: _CONFIGS = [];
  configCreate: _CONFIG_CREATE = <_CONFIG_CREATE>{};

  searchQuery = <_LIST>{};
  no_of_current_page: number = 1;
  no_of_total_items: number = 0;
  no_of_items_in_one_page: number = 10;
  no_of_pages_in_navigator: number = 5;


  searchConfigChangeDebounce = new Subject();

  source: LocalDataSource = new LocalDataSource();

  constructor(
    public router: Router,
    public postConfig: PostConfig
  ) {
    // this.service.getData().then((data) => {
    //   this.source.load(data);
    // });

    this.searchQuery.order = 'idx DESC';
    this.searchQuery.where = "deleted is null and cast(? as integer)";
    this.searchQuery.bind  = '1';


    this.loadPostConfig();

    this.searchConfigChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedConfigSearch());
  }

  onChangeConfigSearch() {
    this.searchConfigChangeDebounce.next();
  }


  loadPostConfig( page = 1 ) {
    //console.log('query search',this.searchQuery);
    this.source.empty();
    this.searchQuery.page = page;
    this.searchQuery.limit = this.no_of_items_in_one_page;
    this.postConfig.list( this.searchQuery ).subscribe( (res: _POST_LIST_RESPONSE ) => {

      //console.log(res);

      this.postConfigs = res.data.configs;
      this.no_of_total_items = res.data.total;
      this.no_of_current_page = res.data.page;

      this.postConfigs.map( (config: _CONFIG) => {
        config.created = ( new Date( parseInt(config.created) * 1000 ) ).toString();
      });


      this.source.load(this.postConfigs);

    }, err => this.postConfig.alert( err ));
  }

  onChangedConfigSearch() {
    //console.log('onChangeSearch', this.searchConfigForm);

    if (this.searchString) {
      if (this.searchString.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if ( this.searchString ) {
      cond += "(id LIKE ? OR" +
        " name LIKE ? OR" +
        " description LIKE ?)" +
        " AND deleted is null AND cast(? as integer)";

      bind += `%${this.searchString}%,` +
        `%${this.searchString}%,` +
        `%${this.searchString}%,` +
        `1`;
    } else {
      cond += "deleted is null and cast(? as integer)";
      bind += '1';
    }


    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.loadPostConfig();
  }

  onConfigPageClick( $event ) {
    //console.log('onPageClick::$event',$event);
    this.loadPostConfig( $event );
  }


  onCreateConfirm(event) {
    //console.log('onCreateConfirm:: ', event);

    let re = confirm("Submit New Config: " + event.newData.id);
    if ( !re ) return;

    this.configCreate = {
      id: event.newData.id,
      name: event.newData.name,
      description: event.newData.description,
      moderators: event.newData.moderators,
      level_list: event.newData.level_list,
      level_view: event.newData.level_view,
      level_write: event.newData.level_write,
      level_comment: event.newData.level_comment
    };

    this.postConfig.create( this.configCreate ).subscribe( (res: _CONFIG_CREATE_RESPONSE ) => {
      //console.log(res);
      if ( res.code === 0 ) {
        this.configCreate['idx'] = res.data.idx;
        //this.postConfigs.push(this.configCreate);
        event.confirm.resolve();
        this.loadPostConfig();
      }
    }, err => this.postConfig.alert(err));
  }

  onEditConfirm(event) {
    //console.log('onEditConfirm:: ', event);
    //console.log('onEditConfirm:: ', event.newData);

    let re = confirm("Save Changes for Config ID: " + event.data.id);
    if ( !re ) return;

    let edit: _CONFIG_EDIT = {
      id: event.newData.id,
      name: event.newData.name,
      description: event.newData.description,
      moderators: event.newData.moderators,
      level_list: event.newData.level_list,
      level_view: event.newData.level_view,
      level_write: event.newData.level_write,
      level_comment: event.newData.level_comment
    };

    //console.log('EDIT:: ', edit);
    this.postConfig.edit( edit ).subscribe( (res: _CONFIG_EDIT_RESPONSE ) => {
      //console.log("edit response::" ,res);
      if ( res.code === 0 ) {
        //event.confirm.resolve();
        this.loadPostConfig();
      }
    }, err => this.postConfig.alert(err));


  }

  onDeleteConfirm(event): void {
    //console.log('onDeleteConfirm:: ', event);
    if (window.confirm('Are you sure you want to delete?')) {

      this.postConfig.delete( event.data.id ).subscribe( (res: _DELETE_RESPONSE) => {
        //console.log("delete response: ", res);
        if ( res.code === 0 ) {
          //event.data.deleted = '1';
          event.confirm.resolve();
          alert('POST ID: ' + event.data.id + ' has been deleted...');
          //console.log('event,source.data::', event.source.data );
        }
        //this.postConfigs = this.postConfigs.filter( ( config: _CONFIG ) => config.id != id );
      }, err => this.postConfig.alert( err ) );
    } else {
      event.confirm.reject();
    }
  }
}
