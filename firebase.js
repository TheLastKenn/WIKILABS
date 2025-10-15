// Importa Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de tu proyecto (copiada de Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBxGegFY1f-c7pU_ficmGYt0-UPmwg_CIw",
  authDomain: "wikilabs-c1b92.firebaseapp.com",
  projectId: "wikilabs-c1b92",
  storageBucket: "wikilabs-c1b92.firebasestorage.app",
  messagingSenderId: "481934785263",
  appId: "1:481934785263:web:d75950617588c8245e791a",
  measurementId: "G-225B00001G"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const USERS_COLLECTION = "users";

async function registerUser(user) {
  if (!user || !user.email) {
    throw new Error("registerUser requiere un objeto con la propiedad email");
  }

  const sanitizedEmail = user.email.trim().toLowerCase();
  const existingUser = await getUserByEmail(sanitizedEmail);
  if (existingUser) {
    const error = new Error("EMAIL_ALREADY_IN_USE");
    error.code = "EMAIL_ALREADY_IN_USE";
    throw error;
  }

  const payload = {
    ...user,
    email: sanitizedEmail,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, USERS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
}

async function getUserByEmail(email) {
  const sanitizedEmail = (email || "").trim().toLowerCase();
  if (!sanitizedEmail) {
    return null;
  }

  const q = query(
    collection(db, USERS_COLLECTION),
    where("email", "==", sanitizedEmail)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function verifyUserCredentials(email, password) {
  const user = await getUserByEmail(email);
  if (!user || !password) {
    return null;
  }
  if (user.password !== password) {
    return null;
  }
  return user;
}

export { db, registerUser, getUserByEmail, verifyUserCredentials };
