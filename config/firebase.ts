import { initializeApp } from "@react-native-firebase/app";
import analytics from "@react-native-firebase/analytics";
import { getFirestore } from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLlEJuaYXR_6EeYV1QGBCmy0SiJofTNJc",
  authDomain: "weatherapp-fa45d.firebaseapp.com",
  projectId: "weatherapp-fa45d",
  storageBucket: "weatherapp-fa45d.firebasestorage.app",
  messagingSenderId: "69661383595",
  appId: "1:69661383595:web:8efb7572b2d8c716b990ee",
  measurementId: "G-BD0JTYY650",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;

export const saveFavoriteLocation = async (
  userId: string,
  location: string
) => {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const favorites = userDoc.data()?.favorites || [];
    await userRef.set(
      {
        favorites: [...favorites, location],
      },
      { merge: true }
    );
  } else {
    await userRef.set({
      favorites: [location],
    });
  }
};

export const getFavoriteLocations = async (userId: string) => {
  const doc = await db.collection("users").doc(userId).get();
  return doc.exists ? doc.data()?.favorites || [] : [];
};
