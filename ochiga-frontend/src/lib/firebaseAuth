import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() { return signInWithPopup(auth, googleProvider); }
export async function signupWithEmail(email: string, password: string) { return createUserWithEmailAndPassword(auth, email, password); }
export async function loginWithEmail(email: string, password: string) { return signInWithEmailAndPassword(auth, email, password); }
