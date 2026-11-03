import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideFirebaseApp,
  initializeApp,
  FirebaseApp
} from '@angular/fire/app';

import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import {
  provideFirestore,
  getFirestore
} from '@angular/fire/firestore';

import {
  provideStorage,
  getStorage
} from '@angular/fire/storage';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyAqXxDnwYCmpXXSGFf4dKjWY-geRQY8OVo',
  authDomain: 'incube-web2026.firebaseapp.com',
  projectId: 'incube-web2026',
  storageBucket: 'incube-web2026.firebasestorage.app',
  messagingSenderId: '304371259997',
  appId: '1:304371259997:web:2977dabdec98b5f690bb4',
  measurementId: 'G-GWGRSGD9HE'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    provideAuth(() => getAuth(inject(FirebaseApp))),

    provideFirestore(() => getFirestore(inject(FirebaseApp))),

    provideStorage(() => getStorage(inject(FirebaseApp)))
  ]
};