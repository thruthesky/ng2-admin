export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
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
            title: 'Forum',
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
            title: 'User',
            icon: 'fa fa-users',
            selected: false,
            expanded: false,
            order: 20,
          }
        }
      },
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



