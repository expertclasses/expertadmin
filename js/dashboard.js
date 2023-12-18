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
const database = firebase.database();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = user.email
    }
  })
  
  function logout(){
    firebase.auth().signOut()
  }
  
  document.getElementById('basicButton').addEventListener('click', function() {
    var textToCopy = document.getElementById('basicToCopy').innerText;
  
    var textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
  
    textarea.select();
    document.execCommand('copy');
  
    document.body.removeChild(textarea);
  
    // Create a div for success message
    var successMessage = document.createElement('div');
    successMessage.classList.add('copy-success');
    successMessage.textContent = 'Copied to clipboard!';
    document.body.appendChild(successMessage);
  
    // Remove success message after 2 seconds
    setTimeout(function() {
      document.body.removeChild(successMessage);
    }, 2000);
  });

  document.getElementById('tallyButton').addEventListener('click', function() {
    var textToCopy = document.getElementById('taillyToCopy').innerText;
  
    var textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    document.body.appendChild(textarea);
  
    textarea.select();
    document.execCommand('copy');
  
    document.body.removeChild(textarea);
  
    // Create a div for success message
    var successMessage = document.createElement('div');
    successMessage.classList.add('copy-success');
    successMessage.textContent = 'Copied to clipboard!';
    document.body.appendChild(successMessage);
  
    // Remove success message after 2 seconds
    setTimeout(function() {
      document.body.removeChild(successMessage);
    }, 2000);
  });
