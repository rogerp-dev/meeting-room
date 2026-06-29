// ─────────────────────────────────────────────────────────────
//  CONFIGURAÇÃO DO FIREBASE
//  1. Acesse https://console.firebase.google.com
//  2. Crie um projeto (ex: "meeting-rooms-suporte")
//  3. Clique em "Adicionar app" > Web
//  4. Copie o objeto firebaseConfig e cole aqui substituindo os valores abaixo
//  5. No Firebase Console: ative Firestore Database e Authentication (provedor Google)
// ─────────────────────────────────────────────────────────────

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDhRPwFVv1hgqPVte6_qP7dk7ZCy_ht4Os",
  authDomain:        "meeting-room-cb5f6.firebaseapp.com",
  projectId:         "meeting-room-cb5f6",
  storageBucket:     "meeting-room-cb5f6.firebasestorage.app",
  messagingSenderId: "363043037542",
  appId:             "1:363043037542:web:813933137d7ab2747768a7",
  measurementId:     "G-DS7MSH6PXE"
};

window.FIREBASE_CONFIG = FIREBASE_CONFIG;

// ─────────────────────────────────────────────────────────────
//  REGRAS DO FIRESTORE (cole no Console > Firestore > Regras)
// ─────────────────────────────────────────────────────────────
//
//  rules_version = '2';
//  service cloud.firestore {
//    match /databases/{database}/documents {
//      match /tickets/{id} {
//        allow read, write: if request.auth != null;
//      }
//    }
//  }
//
// ─────────────────────────────────────────────────────────────
