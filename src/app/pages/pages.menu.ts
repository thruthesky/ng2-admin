export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '관리자 홈',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'forum',
        data: {
          menu: {
            title: '게시판',
            icon: 'fa fa-weixin',
            selected: false,
            expanded: false,
            order: 10,
          }
        }
      },
      {
        path: 'user',
        data: {
          menu: {
            title: '사용자',
            icon: 'fa fa-users',
            selected: false,
            expanded: false,
            order: 20,
          }
        }
      },
      {
        path: 'config',
        data: {
          menu: {
            title: '사이트 설정',
            icon: 'fa fa-gear',
            selected: false,
            expanded: false,
            order: 25,
          }
        }
      }
      // {
      //   path: 'lms',
      //   data: {
      //     menu: {
      //       title: 'Center X LMS',
      //       icon: 'fa fa-cogs',
      //       selected: false,
      //       expanded: false,
      //       order: 30,
      //     }
      //   }
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Center X LMS',
      //       icon: '',
      //       url: 'http://witheng.com/~centerxmain',
      //       target: '_blank',
      //       order: 40,
      //     }
      //   }
      // },
    ]
  }
];



