var firebaseConfig = {
    apiKey: "AIzaSyAtizPSaO_Q_m9QYVIgniv9jC7Ro_0w8HM",
    authDomain: "expert-classes.firebaseapp.com",
    databaseURL: "https://expert-classes-default-rtdb.firebaseio.com",
    projectId: "expert-classes",
    storageBucket: "expert-classes.appspot.com",
    messagingSenderId: "650573225801",
    appId: "1:650573225801:web:8927dab06ee9501ecdc498",
    measurementId: "G-YXEBBBT37Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// const database = firebase.database();

  document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("dashboard.html")
    }
})
function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}
function forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

