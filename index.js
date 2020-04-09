import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCcB6Ydo7YBI5iwuVTgTigdBf9dhhT1DJE",
    authDomain: "horror-app-43afa.firebaseapp.com",
    databaseURL: "https://horror-app-43afa.firebaseio.com",
    projectId: "horror-app-43afa",
    storageBucket: "horror-app-43afa.appspot.com",
    messagingSenderId: "346325365764",
    appId: "1:346325365764:web:94e56bf3289cd01237f151",
    measurementId: "G-YSH6SRQP5H"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
