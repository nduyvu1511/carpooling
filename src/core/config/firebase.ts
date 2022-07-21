import { initializeApp } from "firebase/app"
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsgWZst_TlnSL1zR_JtHuEu_GpgXVmME8",
  authDomain: "exxe-6bda7.firebaseapp.com",
  projectId: "exxe-6bda7",
  storageBucket: "exxe-6bda7.appspot.com",
  messagingSenderId: "845031953878",
  appId: "1:845031953878:web:d7129c196397e6c16f0077",
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
authentication.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()
