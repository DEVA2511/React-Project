import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utills/firebase";

export class NoteAPI {
  static async create(formValues) {
    const response = await addDoc(
      collection(FirebaseApp.db, "notes"),
      formValues
    );
    return {
      id: response.id,
    };
  }
  static async fetchAll() {
    const q = query(
      collection(FirebaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
  static async deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, "notes", noteId));
  }

  static async updateById(id, values) {
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }
  static onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerfomingChange = querySnapshot.metadata.hasPendingWrites;
      if (!isUserPerfomingChange) {
        console.log("you are sync with the collection database..!!!");
        onChange();
      }
    });
    return unsub;
  }
}
