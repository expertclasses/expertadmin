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
  // firebase.analytics();
  const database = firebase.database();
  const storage = firebase.storage();

  function displayData(snapshot) {
    const dataList = document.getElementById('memberlistData');
    dataList.innerHTML = '';
    let serialNumber = 1;
  
    if (snapshot.exists()) {
      const data = snapshot.val();
  
      Object.keys(data).forEach(key => {
        const { Name, Desginataion,Age,Number,Email} = data[key];
        const div = document.createElement('div');
        div.innerHTML = `<p>${serialNumber}</p>
        <p>${Name}</p>
        <p id="deg">${Desginataion}</p>
        <p id="lol">${Age}</p>
        <p id="pop">${Number}</p>
        <p>${Email}</p>
        `;

        dataList.appendChild(div);
        serialNumber++;
      });
    } else {
      dataList.innerHTML = '<p>No data available</p>';
    }
  }

  // Function to fetch all data
function fetchData() {
    const dataRef = database.ref('membersform');
  
    dataRef.once('value', function(snapshot) {
      displayData(snapshot);
    });
  }

  fetchData();
  