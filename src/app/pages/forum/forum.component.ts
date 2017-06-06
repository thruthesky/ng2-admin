import { Component } from '@angular/core';


import { ForumService } from './forum.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'forum',
  templateUrl: './forum.html',
  styleUrls: ['./forum.scss']
})
export class Forum {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      idx: {
        title: 'IDX',
        type: 'number'
      },
      id: {
        title: 'ID',
        type: 'string'
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
      list: {
        title: 'List',
        type: 'number'
      },
      view: {
        title: 'View',
        type: 'number'
      },
      write: {
        title: 'Write',
        type: 'number'
      },
      comment: {
        title: 'Comment',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ForumService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
