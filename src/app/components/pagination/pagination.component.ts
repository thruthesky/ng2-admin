import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-pagination',
  styleUrls: ['./pagination.scss'],
  template: `
    <nav *ngIf="no_of_total_items" class="{{structureClass.nav}}">
      <ul class="{{structureClass.ul}}">
        <li class="{{structureClass.li}}{{structureClass.pageIn}}"><a class="{{structureClass.a}}">Page {{no_of_current_page}} of {{no_of_total_pages}}</a></li>
        <li class="{{structureClass.li}}" *ngIf="show_first_last && currentDisplay > 0" (click)="gotoFirst()">
          <a class="{{structureClass.a}}" innerHTML="{{text_first}}"></a>
        </li>
        <li class="{{structureClass.li}}" *ngIf="show_prev_next && currentDisplay > 0"  (click)="previousPage()">
          <a class="{{structureClass.a}}" innerHTML="{{text_prev}}">

          </a>
        </li>
        <li class="{{structureClass.li}}" *ngFor="let x of numbers"
            [ngClass]="{ active : no_of_current_page == x }"
            (click)="gotoPage( x )"
        >
          <a class="{{structureClass.a}}">{{x}}</a>
        </li>
        <li class="{{structureClass.li}}" *ngIf="show_prev_next && numbers[ numbers.length - 1] < no_of_total_pages "  (click)="nextPage()">
          <a class="{{structureClass.a}}" innerHTML="{{text_next}}"></a>
        </li>
        <li class="{{structureClass.li}}" *ngIf="show_first_last && numbers[ numbers.length - 1] < no_of_total_pages" (click)="gotoLast()">
          <a class="{{structureClass.a}}" innerHTML="{{text_last}}"></a>
        </li>
      </ul>
    </nav>
  `

})
export class PaginationComponent {


  numbers = [];
  no_of_total_pages = 0;
  currentDisplay = 0;

  @Input() no_of_total_items:number = null;
  @Input() no_of_items_in_one_page:number = null;
  @Input() no_of_pages_in_navigator:number = null;
  @Input() no_of_current_page:number = 1;
  @Input() show_prev_next:boolean = true;
  @Input() show_first_last:boolean = true;

  @Input () text_prev:string  = '&lsaquo;';
  @Input () text_next:string  = '&rsaquo;';
  @Input () text_first:string = '&laquo;';
  @Input () text_last:string  = '&raquo;';

  @Input () structureClass = {
    nav: 'mt-3',
    ul: 'pagination',
    li: 'page-item',
    a: 'page-link',
    active: 'active',
    pageIn: 'page-indicator'
  };

  @Output() pageClick = new EventEmitter();

  constructor() {
    //console.log('pagination::constructor()');
  }

  ngOnChanges() {
    if ( this.no_of_total_items > 0 ) this.showPagination();
  }

  showPagination() {
    this.no_of_total_pages = Math.ceil(this.no_of_total_items / this.no_of_items_in_one_page);

    this.currentDisplay = Math.floor( (this.no_of_current_page -1) / this.no_of_pages_in_navigator);
    this.numbers = [];
    for ( let i = 0; i < this.no_of_pages_in_navigator; i ++ ) {
      let current_page_no = this.currentDisplay  * this.no_of_pages_in_navigator + i;
      let next_block_page_no = ( this.currentDisplay + 1)  * this.no_of_pages_in_navigator;
      if ( current_page_no < this.no_of_total_pages && current_page_no < next_block_page_no ) {
        this.numbers.push( current_page_no + 1 );
      }
    }
  }
  nextPage() {
    let nextPage = (this.currentDisplay + 1) * this.no_of_pages_in_navigator + 1;
    this.pageClick.emit( nextPage );
  }
  previousPage() {
    let prevPage = (this.currentDisplay) * this.no_of_pages_in_navigator;
    this.pageClick.emit( prevPage );
  }
  gotoPage( page ) {
    this.pageClick.emit( page );
  }
  gotoLast() {
    this.pageClick.emit( this.no_of_total_pages );
  }
  gotoFirst() {
    this.pageClick.emit( 1 );
  }

}
