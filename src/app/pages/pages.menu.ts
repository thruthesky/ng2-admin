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
        path: 'payment-history',
        data: {
          menu: {
            title: 'Payment History',
            icon: 'fa fa-history',
            selected: false,
            expanded: false,
            order: 23,
          }
        }
      },
      {
        path: 'leveltest-history',
        data: {
          menu: {
            title: 'Leveltest History',
            icon: 'fa fa-calendar',
            selected: false,
            expanded: false,
            order: 23,
          }
        }
      },
      {
        path: 'centerX',
        data: {
          menu: {
            title: 'CenterX LMS',
            icon: 'fa fa-arrows-alt',
            selected: false,
            expanded: false,
            order: 25,
          }
        }
      },

      {
        path: 'faq',
        data: {
          menu: {
            title: 'FAQ',
            icon: 'fa fa-question',
            selected: false,
            expanded: false,
            order: 30,
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
            order: 30,
          }
        }
      },
      {
        path: 'teachers',
        data: {
          menu: {
            title: 'Teachers',
            icon: 'fa fa-id-card',
            selected: false,
            expanded: false,
            order: 30,
          }
        }
      }
    ]
  }
];



