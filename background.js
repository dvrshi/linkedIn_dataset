// Listen to messages sent by content.js
const firebaseConfig = {
  apiKey: "enter you own",
  authDomain: "enter you own",
  projectId: "enter you own",
  storageBucket: "enter you own",
  messagingSenderId: "enter you own",
  appId: "enter you own",
  measurementId: "enter you own"
};
firebase.initializeApp(firebaseConfig);
console.log("Initialized Firebase!", firebase);
console.log("asdad");
var db = firebase.firestore();

chrome.runtime.onMessage.addListener((msg, sender, resp) => {

  if(msg.command == "post"){
    db.collection("post_rating").add({
        rating: msg.data.buttonNumber,
        text: msg.data.text,
    })
    // console.log(msg.data.buttonNumber);
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  // if(msg.command == "fetch"){
  //   var docRef = db.collection("cities").doc("LA");
  //   docRef.get().then(function(doc) {
  //       if (doc.exists) {
  //         //doc.data()
  //         resp({type: "result", status: "success", data: doc.data(), request: msg});
  //       } else {
  //           //No such document!
  //           resp({type: "result", status: "error", data: 'No such document!', request: msg});
  //       }
  //   }).catch(function(error) {
  //     //Error getting document:",error
  //     resp({type: "result", status: "error", data: error, request: msg});
  //   });
  // }


  return true;


})