// ─────────────────────────────────────────────────────────────
//  CONFIGURAÇÃO DO FIREBASE
//  1. Acesse https://console.firebase.google.com
//  2. Crie um projeto (ex: "meeting-rooms-suporte")
//  3. Clique em "Adicionar app" > Web
//  4. Copie o objeto firebaseConfig e cole aqui substituindo os valores abaixo
//  5. No Firebase Console: ative Firestore Database e Authentication (provedor Google)
// ─────────────────────────────────────────────────────────────

const FIREBASE_CONFIG = {
  apiKey:            "COLE_AQUI",
  authDomain:        "COLE_AQUI",
  projectId:         "COLE_AQUI",
  storageBucket:     "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId:             "COLE_AQUI"
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
