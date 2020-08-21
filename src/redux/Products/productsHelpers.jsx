import { firestore, firestorage, base } from "../../firebase/utils";
import 'firebase/storage'

export const handleAddProducts = (products, file) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(products)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProduct = (id) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .where("productId", "==", id)
      .get()
      .then((snapshot) => {
        const product = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(product);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (documentID) => {
  console.log(documentID, 1);
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};




