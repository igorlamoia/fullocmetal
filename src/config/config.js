// import { getDatabase } from 'firebase/database';
// import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase';

const { apiKey } = process.env;
const { authDomain } = process.env;
const { databaseURL } = process.env;
const { projectId } = process.env;
const { storageBucket } = process.env;
const { messagingSenderId } = process.env;
const { appId } = process.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	databaseURL: databaseURL,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
};

export default 
// const app = initializeApp(firebaseConfig);
// Get a reference to the database service
// const database = getDatabase(app);
// Initialize Firebase
export default !firebase?.apps?.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// Get a reference to the database service
// export const db = getDatabase(app);
