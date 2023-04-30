import { firebaseConfig } from "../Cognfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export class FirebaseApp {
  static firebaseApp = undefined;
  static auth = undefined;
  static init() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
  }
}
