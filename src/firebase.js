import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDev1w2z42cSbi4T77x0wSl7oo7q9mFb4g',
	authDomain: 'instagram-clone-yp.firebaseapp.com',
	databaseURL: 'https://instagram-clone-yp.firebaseio.com',
	projectId: 'instagram-clone-yp',
	storageBucket: 'instagram-clone-yp.appspot.com',
	messagingSenderId: '346145119581',
	appId: '1:346145119581:web:ff758e6f3db5a85099dcb4',
	measurementId: 'G-1XVTQ031BB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, googleAuth };
