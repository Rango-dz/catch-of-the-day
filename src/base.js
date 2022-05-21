import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAgnQ-BqnnRYFM22DVnV0IbQsP1riAxCBI",
  authDomain: "react-fishx.firebaseapp.com",
  databaseURL: "https://react-fishx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-fishx"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;