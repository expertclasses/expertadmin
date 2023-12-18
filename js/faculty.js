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
  
  
  function openModal() {
    document.getElementById('crud-modal').style.display='flex';
  }
  
  function closeModal() {
    document.getElementById('crud-modal').style.display = "none";
  }
  
  document.getElementById('uploadCorses').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameFaculty = document.getElementById('nameInput').value;
    const imgFaculty = document.getElementById('imageInput').files[0];
    const desFaculty = document.getElementById('descriptioninput').value;
  
    // Upload image to Firebase Storage
    const storageRef = storage.ref(`facultyImages/${imgFaculty.name}`);
    storageRef.put(imgFaculty)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        // Save data to Firebase Realtime Database
        const newDataKey = database.ref().child('faculties').push().key;
        const updates = {};
        updates['/faculties/' + newDataKey] = {
          name: nameFaculty,
          imageUrl: downloadURL,
          description: desFaculty
        };
        return database.ref().update(updates);
      })
      .then(() => {
        // document.getElementById('uploadForm').reset();
        closeModal();
        location.reload();
        alert('Data uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading data:', error);
        alert('Error uploading data. Please try again.');
      });
  });
  
  
  function fetchData() {
    const dataList = document.getElementById('facultyData');
  
    // Clear previous data if any
    dataList.innerHTML = '';
  
    // Fetch data from Firebase Realtime Database
    database.ref('faculties').once('value')
      .then(snapshot => {
        let serialNumber = 1; // Variable for serial number
  
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key; // Get the key of the entry
          const data = childSnapshot.val();
  
          // <strong>Textarea Input:</strong>
          // Create list item for each data entry with serial number and delete button
          const listItem = document.createElement('div');
          listItem.innerHTML = `
            <span>${serialNumber}</span>
            <img src="${data.imageUrl}" alt="${data.name}">
             <h1>${data.name}</h1>
             <p>${data.description}</p>
            <button class="delete-btn" onclick="deleteEntry('${key}')">Delete</button>
            <hr/>
          `;
  
          dataList.appendChild(listItem);
          serialNumber++; // Increment serial number
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  // Function to delete an entry from the database
  function deleteEntry(key) {
    if (confirm('Are you sure you want to delete this entry?')) {
      firebase.database().ref('faculties/' + key).remove()
        .then(() => {
          fetchData(); // Fetch data again to update the displayed list
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
        });
    }
  }
  
  // Call fetchData function on page load
  window.onload = fetchData;