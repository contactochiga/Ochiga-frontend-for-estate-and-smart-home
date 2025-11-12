// src/lib/firebaseAuth.ts
"use client";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in using Google popup
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Sign up using email and password
 * @param email
 * @param password
 */
export async function signupWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Login using email and password
 * @param email
 * @param password
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}
