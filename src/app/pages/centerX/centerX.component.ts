import {Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {_API_SEARCH, _BOOKS, LMS} from '../../providers/lms';
import {ShareService} from '../../providers/share-service';

export interface _DATE {
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'centerX-page',
  templateUrl: './centerX.html',
  styleUrls: ['./centerX.scss']
})
export class CenterXPage {

  searchLMS: _API_SEARCH = <_API_SEARCH>{};
  searchChangeDebounce = new Subject();

  books: _BOOKS = <_BOOKS>[];

  days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  d = (new Date());
  date_begin: _DATE;
  date_end: _DATE;

  loading: boolean = false;
  no_more_student:boolean = false;

  constructor(
    private lms: LMS,
    private shared: ShareService
  ) {
    //console.log('CenterX');


  }

  ngOnInit() {
    //console.log('studentID', this.shared.searchString);
    this.date_begin = this.date_end = {
      year: this.d.getFullYear(),
      month: this.d.getMonth()+1,
      day: this.d.getDate()
    };

    if (this.shared.searchString){
      this.searchLMS.student_id = this.shared.searchString + '@' +this.lms.getDomain();
      this.date_end = null;
      this.shared.searchString = null;
    }
    this.searchStudentInformation();
    this.searchChangeDebounce
      .debounceTime(500) // wait 500ms after the last event before emitting last event
      .subscribe(() => this.searchStudentInformation());
  }

  add0(n:number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  onChangeSearch() {
    this.searchChangeDebounce.next();
  }

  searchStudentInformation() {
    this.no_more_student = false;
    this.loading = true;
    this.books = [];

    if( this.date_begin ) this.searchLMS.date_begin = this.date_begin.year + this.add0(this.date_begin.month) + this.add0(this.date_begin.day);
    if( this.date_end ) this.searchLMS.date_end = this.date_end.year + this.add0(this.date_end.month) + this.add0(this.date_end.day);

    this.lms.getClasses( this.searchLMS, res => {
      //console.log('searchStudentInformation:: ', res );
      this.loading = false;

      if(res['books'].length) {
        this.books = res['books'];
      }
      else {
        this.no_more_student = true;
      }
    }, error => {
      this.loading = false;
      this.no_more_student = true;
    });

  }

}

