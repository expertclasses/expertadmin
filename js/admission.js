const firebaseConfig = {
  apiKey: "AIzaSyAtizPSaO_Q_m9QYVIgniv9jC7Ro_0w8HM",
  authDomain: "expert-classes.firebaseapp.com",
  databaseURL: "https://expert-classes-default-rtdb.firebaseio.com",
  projectId: "expert-classes",
  storageBucket: "expert-classes.appspot.com",
  messagingSenderId: "650573225801",
  appId: "1:650573225801:web:8927dab06ee9501ecdc498",
  measurementId: "G-YXEBBBT37Z"
  };

  firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = firebase.database();
// Function to open the modal for upload
function openUploadModal() {
  document.getElementById('uploadModal').style.display = 'block';
}

// Function to close the modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}


// Function to display fetched data
function displayData(snapshot) {
  const dataList = document.getElementById('admissionData');
  dataList.innerHTML = '';
  let serialNumber = 1;

  if (snapshot.exists()) {
    const data = snapshot.val();

    Object.keys(data).forEach(key => {
      const { Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate } = data[key];

      const div = document.createElement('div');
      div.innerHTML = `<p>${serialNumber}</p><p id="branch">${Branch}</p><p id="year">${Year}</p><p id="rollNumber">${RollNumber}</p><p id="studentname">${StudentName}</p><p id="fathername">${FatherName}</p><p id="mothername">${Mothername}</p><p id="dob">${DOB}</p><p id="age">${Age}</p><p id="ademail">${Email}</p><p id="qualification">${Qualification}</p><p id="cast">${Caste}</p><p id="gender">${Gender}</p><p id="religion">${Religion}</p>
      <p id="address">${Address}</p>
      <p id="taluk">${Taluk}</p>
      <p id="dist">${District}</p>
      <p id="pincode">${Pincode}</p>
      <p id="course">${Course}</p><p id="slottime">${Slottime}</p><p id="st">${Starttime}</p><p id="et">${Endtime}</p>
      <p id="sn">${StudentNo}</p>
      <p id="parentsno">${Parentsno}</p>
      <p id="fp">${FristPayment}</p>
      <p id="fpd">${FristPayDate}</p>
      <p id="sp">${SecondPayment}</p>
      <p id="spd">${SecondPayDate}</p>
      <p id="tp">${ThirdPayment}</p>
      <p id="tpd">${ThirdPayDate}</p>
      <p id="fp">${FourtPayment}</p>
      <p id="fpd">${FourtPayDate}</p>
      <p id="fip">${FifthPayment}</p>
      <p id="fipd">${FifthPayDate}</p>`;

      
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
        openEditModal(key, Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate);
      };

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        deleteData(key);
      };

      const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Form';
        // detailsButton.classList.add('download-btn');
        detailsButton.onclick = function() {
          detailsAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate);
        };

        const certificateButton = document.createElement('button');
        certificateButton.textContent = 'Certicate';
        // certificateButton.classList.add('download-btn');
        certificateButton.onclick = function() {
          certificateAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate);
        };

      const fullDetailsButton = document.createElement('button');
      fullDetailsButton.textContent = 'Full Details';
        // certificateButton.classList.add('download-btn');
        fullDetailsButton.onclick = function() {
          fullDetailsButtonAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate);
        };

      div.appendChild(editButton);
      div.appendChild(deleteButton);
      div.appendChild(detailsButton);
      div.appendChild(certificateButton);
      div.appendChild(fullDetailsButton);
      dataList.appendChild(div);
      serialNumber++;
    });
  } else {
    dataList.innerHTML = '<p>No data available</p>';
  }
}

// Function to open the edit modal with text content
function openEditModal(key, Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate) {
    document.getElementById("editbranch").value = Branch;
    document.getElementById("edityear").value = Year;
    document.getElementById("editroolnumber").value = RollNumber;
    document.getElementById("editname").value = StudentName;
    document.getElementById("editfathername").value = FatherName;
    document.getElementById("editmothername").value = Mothername;
    document.getElementById("editdob").value = DOB;
    document.getElementById("editage").value = Age;
    document.getElementById("editemail").value = Email;
    document.getElementById("editqualification").value = Qualification;
    document.getElementById("editcaste").value = Caste;
    document.getElementById("editgender").value = Gender;
    document.getElementById("editreligion").value = Religion;
    document.getElementById("editcourse").value = Course;
    document.getElementById("editaddress").value = Address;
    document.getElementById("edittaluk").value = Taluk;
    document.getElementById("editdistrict").value = District;
    document.getElementById("editpincode").value = Pincode;
    document.getElementById("editslot-time").value = Slottime;
    document.getElementById("editstart-time").value = Starttime;
    document.getElementById("editend-time").value = Endtime;
    document.getElementById("edituserno").value = StudentNo;
    document.getElementById("editparentsno").value = Parentsno;
    document.getElementById("editfirstpayment").value = FristPayment;
    document.getElementById("editfristpaydate").value = FristPayDate;
    document.getElementById("editsecondpayment").value = SecondPayment;
    document.getElementById("editsecondpaydate").value = SecondPayDate;
    document.getElementById("editthirdpayment").value = ThirdPayment;
    document.getElementById("editthirdpaydate").value = ThirdPayDate;
    document.getElementById("editfourtpayment").value = FourtPayment;
    document.getElementById("editfourtpaydate").value = FourtPayDate;
    document.getElementById("editfifthpayment").value = FifthPayment;
    document.getElementById("editfifthpaydate").value = FifthPayDate;
  document.getElementById('editModal').style.display = 'block';

  const saveEditedBtn = document.getElementById('saveEditedBtn');
  saveEditedBtn.onclick = function() {
    saveEditedText(key);
  };
}

// Function to save edited text to Firebase
function saveEditedText(key) {
  const editbranch = document.getElementById("editbranch").value;   
    const edityear = document.getElementById("edityear").value;
    const editroolnumber = document.getElementById("editroolnumber").value;
    const editname = document.getElementById("editname").value;
    const editfathername = document.getElementById("editfathername").value;
    const editmothername = document.getElementById("editmothername").value;
    const editdob = document.getElementById("editdob").value;//
    const editage = document.getElementById("editage").value;//
    const editemail = document.getElementById("editemail").value;   
    const editqualification  = document.getElementById("editqualification").value;
    const editcaste = document.getElementById("editcaste").value;  
    const editgender = document.getElementById("editgender").value;   
    const editreligion = document.getElementById("editreligion").value;
    const editcourse = document.getElementById("editcourse").value;
    const editaddress = document.getElementById("editaddress").value;
    const edittaluk = document.getElementById("edittaluk").value;//
    const editdistrict = document.getElementById("editdistrict").value;//
    const editpincode = document.getElementById("editpincode").value;//
    const editslottime = document.getElementById("editslot-time").value;
    const editstarttime = document.getElementById("editstart-time").value;
    const editendtime = document.getElementById("editend-time").value;
    const edituserno = document.getElementById("edituserno").value;   
    const editparentsno= document.getElementById("editparentsno").value;
    const editfirstpayment  = document.getElementById("editfirstpayment").value;
    const editfristpaydate = document.getElementById("editfristpaydate").value;
    const editsecondpayment = document.getElementById("editsecondpayment").value;
    const editsecondpaydate = document.getElementById("editsecondpaydate").value;
    const editthirdpayment = document.getElementById("editthirdpayment").value;
    const editthirdpaydate = document.getElementById("editthirdpaydate").value;
    const editfourtpayment = document.getElementById("editfourtpayment").value;
    const editfourtpaydate = document.getElementById("editfourtpaydate").value;
    const editfifthpayment = document.getElementById("editfifthpayment").value;
    const editfifthpaydate = document.getElementById("editfifthpaydate").value;





  if (editname.trim() !== '') {
    database.ref(`admission/${key}`).update({
  Branch: editbranch,
  Year: edityear,
  RollNumber: editroolnumber,
  StudentName: editname,
  FatherName: editfathername,
  Mothername: editmothername,
  DOB: editdob,
  Age: editage,
  Email: editemail,
  Qualification: editqualification,
  Caste: editcaste,
  Gender: editgender,
  Religion: editreligion,
  Course: editcourse,
  Address: editaddress,
  Taluk: edittaluk,
  District: editdistrict,
  Pincode: editpincode,
  Slottime: editslottime,
  Starttime: editstarttime,
  Endtime: editendtime,
  StudentNo: edituserno,
  Parentsno: editparentsno,
  FristPayment:editfirstpayment,
  FristPayDate:editfristpaydate,
  SecondPayment:editsecondpayment,
  SecondPayDate:editsecondpaydate,
  ThirdPayment:editthirdpayment,
  ThirdPayDate:editthirdpaydate,
  FourtPayment:editfourtpayment,
  FourtPayDate:editfourtpaydate,
  FifthPayment:editfifthpayment,
  FifthPayDate:editfifthpaydate
    });
  }

  closeModal('editModal');
  fetchData(); // Fetch data after edit
}

// Function to delete data
function deleteData(key) {
  if (confirm('Are you sure you want to delete this data?')) {
    database.ref(`admission/${key}`).remove();
    fetchData(); // Fetch data after deletion
  }
}

// Function to fetch all data
function fetchData() {
  const dataRef = database.ref('admission');

  dataRef.once('value', function(snapshot) {
    displayData(snapshot);
  });
}

// Initial data fetch on page load
fetchData();

// Function to search data
  // Function to search data
  function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dataList = document.getElementById('admissionData');
    const dataDivs = dataList.getElementsByTagName('div');

    for (let i = 0; i < dataDivs.length; i++) {
      const textContent = dataDivs[i].textContent.toLowerCase();
      if (textContent.includes(searchInput)) {
        dataDivs[i].style.display = '';
      } else {
        dataDivs[i].style.display = 'none';
        // dataList.innerHTML = "<p>No data available</p>";
        
      }
    }
  }

// Detailes Form 
function detailsAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate) {

  const certificateWidth = 595.28;// Custom width for the certificate in units (pixels, mm, etc, 793.706)
  const certificateHeight = 750; // Custom height for the certificate in units (pixels, mm, etc, 1122.52,841.89)

  const doc = new window.jspdf.jsPDF({
    orientation: 'portrait', // Landscape or portrait
    unit: 'px', // Units: 'mm', 'in', 'px', etc.
    format: [certificateWidth, certificateHeight],// Custom page size
  });

  // Certificate background image or design
  const certificateImg = new Image();
  certificateImg.src = './images/header.jpg'; // Add your image URL here
  certificateImg.onload = function() {
    // Add the image to the PDF
    doc.addImage(certificateImg, 'JPEG', 10, 10, 560,120,  certificateWidth, certificateHeight, { align: 'center' });

    // Add certificate text content
    doc.setFont('helvetica');
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(24);
    doc.text('Student Registration Form', certificateWidth / 2, 160, { align: 'center' });
    doc.setFontSize(18);
    doc.text('Reg No: 2020ECE001', certificateWidth / 2, 178, { align: 'center' });

    doc.setFontSize(16);
    doc.text(`Name: ${StudentName}`, certificateWidth / 15, 250, { align: 'left'});
    doc.text(`Date of Birth: ${DOB}`, certificateWidth / 15, 275, { align: 'left'});
    doc.text(`Age: ${Age} years`, certificateWidth / 2, 275, { align: 'left'});
    //
    doc.text(`Father Name: ${FatherName}`, certificateWidth / 15, 300, { align: 'left' });
    // 
    doc.text(`Mother Name: ${Mothername}`, certificateWidth / 2, 300, { align: 'left' });
     
    doc.text(`Qualication: ${Qualification}`, certificateWidth / 15, 325, { align: 'left' });

    doc.text(`Sex: ${Gender}`, certificateWidth / 2, 325, { align: 'left' });

    doc.text(`Address: ${Address}`, certificateWidth / 15, 350, { align: 'left' });

    doc.text(`Taluk: ${Taluk}`, certificateWidth / 15, 375, { align: 'left' });
    doc.text(`Dist: ${District}`, certificateWidth / 2, 375, { align: 'left' });
    doc.text(`Pincode: ${Pincode}`, certificateWidth / 1.3, 375, { align: 'left' });

    doc.text(`Email Id: ${Pincode}`, certificateWidth / 15, 400, { align: 'left' });

    doc.text(`Mobile Number: ${StudentNo}`, certificateWidth / 15, 425, { align: 'left' });

    doc.text(`Computer Course: ${Course}`, certificateWidth / 15, 450, { align: 'left' });

    doc.text(`Class Timing: ${Slottime}`, certificateWidth / 2.5, 450, { align: 'left' });

    doc.text(`Amount: ${FristPayment}   ${FristPayDate}`, certificateWidth / 15, 475, { align: 'left' });
    doc.text(`${SecondPayment}   ${SecondPayDate}`, certificateWidth / 2.5, 475, { align: 'left' });
    doc.text(`${ThirdPayment}   ${ThirdPayDate}`, certificateWidth / 1.3, 475, { align: 'left' });
    doc.text(`${FourtPayment}   ${FourtPayDate}`, certificateWidth / 2.5, 500, { align: 'left' });
    doc.text(`${FifthPayment}   ${FifthPayDate}`, certificateWidth / 1.3, 500, { align: 'left' });

    // const today = new Date();
    // const day = today.getDate().toString().padStart(2, '0'); // Get day with leading zero
    // const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
    // const year = today.getFullYear().toString(); // Get full year as yyyy
    // const dateString = `${day}-${month}-${year}`; // Format as dd-mm-yyyy

    // doc.text(`Date: ${dateString}`, certificateWidth / 15, 530, { align: 'left' });

    doc.text(`Student Sign`, certificateWidth / 15, 590, { align: 'left' });
    doc.text(`Director Sign`, certificateWidth / 1.3, 590, { align: 'left' });


    doc.setFontSize(11);
    doc.text(`*You must inform the supervising lecturer and/ computer services staff of any problems that arise whilst using computer equipment.`, certificateWidth / 15, 625, { align: 'left' });

    doc.text(`*Respect and listen to the teacher.`, certificateWidth / 15, 640, { align: 'left' });


    doc.text(`*90% attendance is mandatory`, certificateWidth / 15, 655, { align: 'left' });

    doc.text(`*You are expected to attend regular class Full fees are to be paid before joining the institute.`, certificateWidth / 15, 670, { align: 'left' });

    doc.text(`*Once registration for admission is done, change of course / cancellation will not be allowed under any circumstances`, certificateWidth / 15, 685, { align: 'left' });

    doc.text(`* Shouting, loudly talking use of cell phone or listening music is strictly prohibited in the computer Centre.`, certificateWidth / 15, 700, { align: 'left' });

    doc.text(`*Keep your Cell Phone in Silent Mode while you are in training centre`, certificateWidth / 15, 715, { align: 'left' });


    // Save the PDF file
    doc.save(`${StudentName}_Details.pdf`);
  };
}



// Certificate Form 
function certificateAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate) {
  const certificateWidth = 595.28; // Custom width for the certificate in units (pixels, mm, etc, 793.706)
  const certificateHeight = 730; // Custom height for the certificate in units (pixels, mm, etc, 1122.52,841.89)

  const doc = new window.jspdf.jsPDF({
    orientation: 'portrait', // Landscape or portrait
    unit: 'px', // Units: 'mm', 'in', 'px', etc.
    format: [certificateWidth, certificateHeight], // Custom page size
  });

  // Certificate background image or design
  const certificateImg = new Image();
  certificateImg.src = './images/logo.png'; // Add your image URL here
  certificateImg.onload = function() {
    // Add the image to the PDF
    doc.addImage(certificateImg, 'JPEG', 35, 10, 50,50,  certificateWidth, certificateHeight, { align: 'left' });

    // Add certificate text content
    doc.setFont('helvetica');
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(36);
    doc.text('Expert Computer Education Centre', certificateWidth / 2, 115, { align: 'center' });
    doc.setFontSize(24);
    doc.text('Student Verification Form', certificateWidth / 2, 150, { align: 'center' });
    doc.setFontSize(20);
    doc.text('Reg No: DRBG/SOR/817/2020-21', certificateWidth / 2, 175, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Tel: +91 8550855843`, certificateWidth / 1.1, 30, { align: 'right' });
    doc.text(`Email: expertcomputer153@gmail.com`, certificateWidth / 1.1, 45, { align: 'right' });
    doc.text(`www.expertclaese.vercel.com`, certificateWidth / 1.1, 60, { align: 'right' });
    
    doc.setFontSize(16);
    doc.text(`Name of the Courser: ${Course}`, certificateWidth / 15, 220, { align: 'left'});

    doc.text(`Roll Number: ${RollNumber}`, certificateWidth / 15, 250, { align: 'left'});

    doc.text(`Course Duration: ${Starttime} to ${Endtime}`, certificateWidth / 15, 280, { align: 'left'});
    doc.setFontSize(22);
    doc.text(`This is to certifify that Mr/Miss ${StudentName}`, certificateWidth / 15, 320, { align: 'left'});
    doc.text(`has successfully completed ${Course} course.`, certificateWidth / 15, 340, { align: 'left'});

    doc.setFontSize(16);
    doc.text(`The course is completed on ${Endtime} successfully.`, certificateWidth / 15, 380, { align: 'left'});
    doc.text(`Thanking you and assuring you for our best service always.`, certificateWidth / 15, 395, { align: 'left'});
    
    doc.text(`Presdent`, certificateWidth / 15, 520, { align: 'left'});
    doc.text(`Expert Computer Education Centre`, certificateWidth / 15, 535, { align: 'left'});
    doc.text(`Bailhongal-591102`, certificateWidth / 15, 550, { align: 'left'});

    doc.text(`Student Comment`, certificateWidth / 1.8, 510, { align: 'left'});
    doc.text(`__________________________________`, certificateWidth / 1.8, 535, { align: 'left'});
    doc.text(`__________________________________`, certificateWidth / 1.8, 555, { align: 'left'});
    doc.text(`__________________________________`, certificateWidth / 1.8, 575, { align: 'left'});
    
    doc.setFontSize(14);
    doc.text(`Signature:`, certificateWidth / 1.8, 620, { align: 'left'});
    
    doc.setFontSize(16);
    doc.text(`Address: Channamma Samadi Road Bailhongal - 591102, Belagavi, Karnataka, India`, certificateWidth / 2, 700, { align: 'center'});

    // Save the PDF file
    doc.save(`${StudentName}_Certificate.pdf`);
  };
}

// Full Details
// Detailes Form 
function fullDetailsButtonAsPDF(Branch, Year, RollNumber,StudentName,FatherName,Mothername,DOB,Age,Email,Qualification,Caste,Gender,Religion,Address,Taluk,District,Pincode,Course,Slottime,Starttime,Endtime,StudentNo,Parentsno,FristPayment,FristPayDate,SecondPayment,SecondPayDate,ThirdPayment,ThirdPayDate,FourtPayment,FourtPayDate,FifthPayment,FifthPayDate) {

  const certificateWidth = 595.28;// Custom width for the certificate in units (pixels, mm, etc, 793.706)
  const certificateHeight = 550; // Custom height for the certificate in units (pixels, mm, etc, 1122.52,841.89)

  const doc = new window.jspdf.jsPDF({
    orientation: 'portrait', // Landscape or portrait
    unit: 'px', // Units: 'mm', 'in', 'px', etc.
    format: [certificateWidth, certificateHeight],// Custom page size
  });

    // Add certificate text content
    doc.setFont('helvetica');
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(24);
    doc.text('Expert Computer Classes', certificateWidth / 2, 30, { align: 'center' });
    doc.setFontSize(15);
    doc.text('Channamma Samadi Road Bailhongal - 591102, Belagavi, Karnataka, India', certificateWidth / 2, 50, { align: 'center' });

    doc.setFontSize(16);
    doc.text(`Branch: ${Branch}`, certificateWidth / 15, 100, { align: 'left'});
    doc.text(`Year: ${Year} years`, certificateWidth / 2, 100, { align: 'left'});

    doc.text(`Name: ${StudentName}`, certificateWidth / 15, 125, { align: 'left'});
    doc.text(`RollNumber: ${RollNumber}`, certificateWidth / 2, 125, { align: 'left'});

    doc.text(`Father Name: ${FatherName}`, certificateWidth / 15, 150, { align: 'left'});
    doc.text(`Mother Name: ${Mothername}`, certificateWidth / 2, 150, { align: 'left'});

    doc.text(`Date of Birth: ${DOB}`, certificateWidth / 15, 175, { align: 'left'});
    doc.text(`Age: ${Age} years`, certificateWidth / 2, 175, { align: 'left'});


    doc.text(`Email: ${Email}`, certificateWidth / 15, 200, { align: 'left'});
    doc.text(`Qulification: ${Qualification}`, certificateWidth / 2, 200, { align: 'left'});

    doc.text(`Caste: ${Caste}`, certificateWidth / 15, 225, { align: 'left'});
    doc.text(`Sex: ${Gender}`, certificateWidth / 2, 225, { align: 'left'});

    doc.text(`Religion: ${Religion}`, certificateWidth / 15, 250, { align: 'left'});
    doc.text(`Address: ${Address}`, certificateWidth / 15, 275, { align: 'left'});

    doc.text(`Taluk: ${Taluk}`, certificateWidth / 15, 300, { align: 'left'});
    doc.text(`Ditrict: ${District}`, certificateWidth / 2, 300, { align: 'left'});

    doc.text(`Pincode: ${Pincode}`, certificateWidth / 15, 325, { align: 'left'});
    doc.text(`Course: ${Course}`, certificateWidth / 2, 325, { align: 'left'});

    doc.text(`Class Time: ${Slottime}`, certificateWidth / 15, 350, { align: 'left'});
    doc.text(`Corse Start: ${Starttime}`, certificateWidth / 2, 375, { align: 'left'});
    doc.text(`Corse End: ${Endtime}`, certificateWidth / 15, 375, { align: 'left'});

    doc.text(`First Payment: ${FristPayment}`, certificateWidth / 15, 400, { align: 'left'});
    doc.text(`1st Payment Date: ${FristPayDate}`, certificateWidth / 2, 400, { align: 'left'});

    // 
    doc.text(`Second Payment: ${SecondPayment}`, certificateWidth / 15, 425, { align: 'left'});
    doc.text(`2nd Payment Date: ${SecondPayDate}`, certificateWidth / 2, 425, { align: 'left'});
    // 
    doc.text(`Third Payment: ${ThirdPayment}`, certificateWidth / 15, 450, { align: 'left'});
    doc.text(`3rd Payment Date: ${ThirdPayDate}`, certificateWidth / 2, 450, { align: 'left'});
    // 
    doc.text(`Fouth Payment: ${FourtPayment}`, certificateWidth / 15, 475, { align: 'left'});
    doc.text(`4th Payment Date: ${FourtPayDate}`, certificateWidth / 2, 475, { align: 'left'});
    // 
    doc.text(`Fifth Payment: ${FifthPayment}`, certificateWidth / 15, 500, { align: 'left'});
    doc.text(`5th Payment Date: ${FifthPayDate}`, certificateWidth / 2, 500, { align: 'left'});

    // Save the PDF file
    doc.save(`${StudentName}_Full_Details.pdf`);
  };


