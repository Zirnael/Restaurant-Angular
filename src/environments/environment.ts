// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'wdai-database',
    appId: '1:158028321696:web:fc4d6f54784636642f0ac5',
    databaseURL: 'https://wdai-database-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'wdai-database.appspot.com',
    apiKey: 'AIzaSyBnEb20OEKt_CelnN1hyUjbhjlhKNLg1ks',
    authDomain: 'wdai-database.firebaseapp.com',
    messagingSenderId: '158028321696',
  },
  production: false,

  firebaseConfig: {
  apiKey: "AIzaSyBnEb20OEKt_CelnN1hyUjbhjlhKNLg1ks",
  authDomain: "wdai-database.firebaseapp.com",
  databaseURL: "https://wdai-database-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wdai-database",
  storageBucket: "wdai-database.appspot.com",
  messagingSenderId: "158028321696",
  appId: "1:158028321696:web:fc4d6f54784636642f0ac5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
