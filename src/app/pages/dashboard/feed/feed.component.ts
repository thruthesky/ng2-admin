import {Component, Input} from '@angular/core';


import {
  PostData, PostComment, _POST, _POSTS, _LIST, _POST_LIST_RESPONSE,
  _POST_COMMON_WRITE_FIELDS
} from 'angular-backend';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})
export class Feed {

  @Input() config: string = '';
  searchQuery: _LIST = {
    limit: 10,
    order: 'idx DESC'
  };
  public feed: _POSTS = <_POSTS>[];

  constructor(
              private postData: PostData,
              private postComment: PostComment
  ) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message) {
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.getPostData();
  }

  getPostData() {
    let q = this.searchQuery;
    q.extra= { file: true , post_config_id: this.config };
    this.postData.list(q).subscribe( (res: _POST_LIST_RESPONSE ) => {
      //console.log(this.config + '::feed::getData::postData:: ', res);
      if (res.code === 0 ) {
        this.feed = res.data.posts;
        this.feed.map( (post: _POST_COMMON_WRITE_FIELDS) => {
          post['expanded'] = false;
          post.created = ( new Date( parseInt(post.created) * 1000 ) ).toDateString();
        });
      }
    }, e => this.postData.alert(e));
  }
}


