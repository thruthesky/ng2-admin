// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backendUrl: 'https://www.iamtalkative.com/index.php',
  background: '/assets/img/sky-bg.jpg',
  firebase: {
    apiKey: "AIzaSyBnvok5OR77tFUl1yk0-ZeyeVkYgMWGrcE",
    authDomain: "english-588f2.firebaseapp.com",
    databaseURL: "https://english-588f2.firebaseio.com",
    projectId: "english-588f2",
    storageBucket: "english-588f2.appspot.com",
    messagingSenderId: "663067398311"
  }
};
