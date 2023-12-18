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
  
  const nameCourse = document.getElementById('nameInput').value;
  const imgCourse = document.getElementById('imageInput').files[0];
  const desCourse = document.getElementById('descriptioninput').value;

  // Upload image to Firebase Storage
  const storageRef = storage.ref(`coursesImages/${imgCourse.name}`);
  storageRef.put(imgCourse)
    .then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
    .then(downloadURL => {
      // Save data to Firebase Realtime Database
      const newDataKey = database.ref().child('courses').push().key;
      const updates = {};
      updates['/courses/' + newDataKey] = {
        name: nameCourse,
        imageUrl: downloadURL,
        description: desCourse
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

// Display Data
// function displayUploadedData() {
//   const coursesDataDiv = document.getElementById('coursesData');
//   coursesDataDiv.innerHTML = ''; // Clear previous data
//   let serialNumber = 1; // Variable for serial number
//   database.ref('courses').on('value', snapshot => {
//     snapshot.forEach(childSnapshot => {
//       const childData = childSnapshot.val();

//       const uploadItemDiv = document.createElement('div');
//       uploadItemDiv.classList.add('upload-item');

//       // const serNumElement = document.createElement('p');
//       // serNumElement.src = `Sr Num : ${serialNumber}`;
      

//       const imageElement = document.createElement('img');
//       imageElement.src = childData.imageUrl;

//       const textElement = document.createElement('p');
//       textElement.textContent = `Name : ${childData.name}`;

      

//       const textAreaElement = document.createElement('p');
//       textAreaElement.textContent = `Description: ${childData.description}`;

//       // const editButton = document.createElement('button');
//       // editButton.textContent = 'Edit';
//       // editButton.classList.add('btn');
//       // editButton.onclick = function() {
//       //   editData(childSnapshot.key, childData);
//       // };

//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';
//       deleteButton.classList.add('btn');
//       deleteButton.onclick = function() {
//         // Implement delete functionality here
//         const confirmDelete = confirm('Are you sure you want to delete this item?');
//         if (confirmDelete) {
//           database.ref('uploads').child(childSnapshot.key).remove()
//             .then(() => {
//               location.reload();
//             })
//             .catch(error => {
//               console.error('Error deleting item:', error);
//               alert('Error deleting item. Please try again.');
//             });
//         }
//       };

//       uploadItemDiv.appendChild(serNumElement);
//       uploadItemDiv.appendChild(textElement);
//       uploadItemDiv.appendChild(imageElement);
//       uploadItemDiv.appendChild(textAreaElement);
//       // uploadItemDiv.appendChild(editButton);
//       uploadItemDiv.appendChild(deleteButton);
//       coursesDataDiv.appendChild(uploadItemDiv);
//       serialNumber++;
//     });
//   });
// }
// Call the function to display uploaded data initially
// displayUploadedData();
// function fetchData() {
//   const dataList = document.getElementById('coursesData');

//   // Clear previous data if any
//   dataList.innerHTML = '';

//   // Fetch data from Firebase Realtime Database
//   database.ref('courses').once('value')
//     .then(snapshot => {
//       let serialNumber = 1; // Variable for serial number

//       snapshot.forEach(childSnapshot => {
//         const data = childSnapshot.val();

//         // Create list item for each data entry with serial number
//         const listItem = document.createElement('div');
//         listItem.innerHTML = `
//            ${serialNumber}<br>
//            ${data.name}<br>
//            <img src="${data.imageUrl}" alt="${data.name}"><br>
//            ${data.description}<br>
//            <button class="delete-btn" onclick="deleteEntry('${key}')">Delete</button>
          
//         `;

//         dataList.appendChild(listItem);
//         serialNumber++; // Increment serial number
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });

//     const deleteButton = document.getElementById('del');
//       // deleteButton.textContent = 'Delete';
//       deleteButton.classList.add('btn');
//       deleteButton.onclick = function() {
//         // Implement delete functionality here
//         const confirmDelete = confirm('Are you sure you want to delete this item?');
//         if (confirmDelete) {
//           database.ref('courses').child(childSnapshot.key).remove()
//             .then(() => {
//               location.reload();
//             })
//             .catch(error => {
//               console.error('Error deleting item:', error);
//               alert('Error deleting item. Please try again.');
//             });
//         }
//       };
// }
// function deleteEntry(key) {
//   if (confirm('Are you sure you want to delete this entry?')) {
//     database.ref('uploads').child(key).remove()
//       .then(() => {
//         alert('Entry deleted successfully!');
//         fetchData(); // Fetch data again to update the displayed list
//       })
//       .catch(error => {
//         console.error('Error deleting entry:', error);
//       });
//   }
// }
// // Call fetchData function on page load
// window.onload = fetchData;

function fetchData() {
  const dataList = document.getElementById('coursesData');

  // Clear previous data if any
  dataList.innerHTML = '';

  // Fetch data from Firebase Realtime Database
  database.ref('courses').once('value')
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
    firebase.database().ref('courses/' + key).remove()
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