import firestore from "@react-native-firebase/firestore";

export const saveFavoriteLocation = async (userId: string, location: string) => {
  await firestore().collection("users").doc(userId).set(
    {
      favorites: firestore.FieldValue.arrayUnion(location),
    },
    { merge: true }
  );
};

export const getFavoriteLocations = async (userId: string) => {
  const doc = await firestore().collection("users").doc(userId).get();
  return doc.exists ? doc.data()?.favorites || [] : [];
};
