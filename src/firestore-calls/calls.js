import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { firebaseConfig } from "../environment.js";

const app = initializeApp(firebaseConfig);

export async function getAllCats() {
  return new Promise((resolve, reject) => {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "cats"));
      const querySnapshot = getDocs(q);

      resolve(querySnapshot);
    } catch (error) {
      reject(error);
    }
  });
}
