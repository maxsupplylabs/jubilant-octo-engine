// USEFUL, RESUABLE CODE GOES HERE
import { db } from "@/firebase/config";
import {
  serverTimestamp,
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  where,
  isEqual,
  getDoc,
  addDoc,
  writeBatch,
  commitBatch,
  deleteDoc,
  collectionGroup,
  onSnapshot,
  arrayUnion,
  increment,
  getDocsFromServer,
  runTransaction
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

/*------------------------------Firebase functions----------------------------*/

