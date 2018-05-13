import * as firebase from "firebase";

import {FirebaseConfig} from "./types";

export function initFirestore(config: FirebaseConfig): Promise<firebase.firestore.Firestore> {
    return new Promise(async (resolve, reject) => {
        try {
            const fbApp: firebase.app.App = firebase.initializeApp(config);

            const fbAuth: firebase.auth.Auth = fbApp.auth();
            await fbAuth.signInAnonymously();

            const firestore = fbApp.firestore();
            const settings = {timestampsInSnapshots: true};
            firestore.settings(settings);

            resolve(firestore);
        } catch(error) {
            reject(error);
        }
    });
}
