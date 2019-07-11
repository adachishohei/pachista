import firebase from 'firebase';
import store from "@/store";
import * as firebaseui from "firebaseui";
import DocumentData = firebase.firestore.DocumentData;

const config = {
  apiKey: 'AIzaSyAV0MkVcVMuZaoEDMAfcyDnbp8OUEC_8DA',
  authDomain: 'pachista-9126c.firebaseapp.com',
  databaseURL: 'https://pachista-9126c.firebaseio.com',
  projectId: 'pachista-9126c',
  storageBucket: '',
  messagingSenderId: '1055613955429',
  appId: '1:1055613955429:web:b5ac60d46797f1fd',
};

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};
firebase.initializeApp(config);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();
export default {

  logout() {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
  },
  onAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', true);
      } else {
        store.commit('onUserStatusChanged', false);
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  },
  uiStart() {
    ui.start('#firebaseui-auth-container', uiConfig);
  },
  addTodo(title: string) {
    db.collection("todos")
      .add({
        title: title,
        status: false,
      })
      .then(() => {

      })
      .catch((error) => {
        console.error(error)
      });
  },
  fetchTodo(): { id: string, data: DocumentData }[] {
    const todoList: { id: string, data: DocumentData }[] = [];
    db.collection("todos")
      .get()
      .then((response) => {
        response.forEach((doc) => {
          todoList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return todoList;
  },
};
