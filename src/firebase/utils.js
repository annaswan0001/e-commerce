import { firebaseConfig } from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRole = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRole,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const handleUploadProductPhoto = async (files) => {
  const imageUrl = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadTask = firebase
          .storage()
          .ref()
          .child(`your/file/path/${file.name}`)
          .put(file);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error),
          async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            console.log(url);
            resolve(url);
          }
        );
      });
    })
  )
  console.log(imageUrl)
  return Promise.resolve(imageUrl);
};
