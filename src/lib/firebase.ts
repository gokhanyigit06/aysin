import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDQDcpMnXerSy2stvwGO3x8Jj-cAmc1oU",
  authDomain: "aysin-cb82d.firebaseapp.com",
  projectId: "aysin-cb82d",
  storageBucket: "aysin-cb82d.firebasestorage.app",
  messagingSenderId: "497765667310",
  appId: "1:497765667310:web:1649affe1fcdbd118d3eff",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
