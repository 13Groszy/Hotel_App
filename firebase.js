const firebaseConfig = {
  apiKey: "AIzaSyB5mNQ0P9tNXV28yNHQFBpFG4KMBoD-IHA",
  authDomain: "hotel-c1d8b.firebaseapp.com",
  projectId: "hotel-c1d8b",
  storageBucket: "hotel-c1d8b.appspot.com",
  messagingSenderId: "646068234078",
  appId: "1:646068234078:web:d448feb6e7c88fa8e011cf",
  measurementId: "G-SFWYGF6VML"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const doc = firebase.firestore()

let firstHotel, secondHotel, thirdHotel, fourthHotel;

let getHotels = () => { db.collection('hotels').get()
    .then((snapshot) =>{
        firstHotel = snapshot.docs[0].data();
        secondHotel = snapshot.docs[1].data();
        thirdHotel = snapshot.docs[2].data();
        fourthHotel = snapshot.docs[3].data();
})}
getHotels();
