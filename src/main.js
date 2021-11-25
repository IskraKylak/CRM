import { createApp } from 'vue'
import messagePlugin from './utils/message.plugin'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import * as firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/database'

firebase.initializeApp({
   apiKey: "AIzaSyDUQXQHSv_sUZZpRjY1tSzEJ6FVGktyqC4",
   authDomain: "vue-yt-bcff3.firebaseapp.com",
   projectId: "vue-yt-bcff3",
   storageBucket: "vue-yt-bcff3.appspot.com",
   messagingSenderId: "527784368472",
   appId: "1:527784368472:web:c18bf91ae6d4aa95572d2d",
   measurementId: "G-TWMXJHTS3L"
})

let app
const auth = getAuth();
onAuthStateChanged(auth, () => {
   if (!app) {
      app = createApp(App).use(messagePlugin).use(store).use(router).mount('#app')
   }
});
// firebase.auth().onAuthStateChanged(() => {
//    if (!app) {
//       app = createApp(App).use(messagePlugin).use(store).use(router).mount('#app')
//    }

// })

// createApp(App).use(messagePlugin).use(store).use(router).mount('#app')


