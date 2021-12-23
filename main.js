let id = "no";
let selectedValue = [];
selectData();
function manageData() {
  let stname = document.getElementById("stname").value;
  let stemail = document.getElementById("stemail").value;
  let stphone = document.getElementById("stphone").value;
  let stage = document.getElementById("stage").value;
  let stdate = document.getElementById("stdate").value;

  let gender;
  let stgender = document.getElementsByName("gender");
  if (stgender[0].checked) {
    gender = stgender[0].value;
  } else if (stgender[1].checked) {
    gender = stgender[1].value;
  } else if (stgender[2].checked) {
    gender = stgender[2].value;
  }

  let obj = {
    stname: stname,
    stemail: stemail,
    stphone: stphone,
    stage: stage,
    stdate: stdate,
    stgender: gender,
  };

  if (stname == "") {
    document.getElementById("nameerror").innerHTML = "Please Enter Your Name";
  } else {
    if (id == "no") {
      let arr = getCrudData();
      if (arr == null) {
        let data = [obj];
        setCrudData(data);
      } else {
        arr.push(obj);
        setCrudData(arr);
      }
      alert("Student Added Successfully");

      window.location.reload();
    } else {
      let arr = getCrudData();
      arr[id].stname = stname;
      arr[id].stemail = stemail;
      arr[id].stphone = stphone;
      arr[id].stage = stage;
      arr[id].stdate = stdate;
      arr[id].stgender = gender;
      setCrudData(arr);
      alert("Student Data Updated");

      window.location.reload();
    }

    selectData();
  }
}

// Select Records

function selectData() {
  let arr = getCrudData();
  if (arr != null) {
    let html = "";
    let sno = 1;
    for (let k in arr) {
      html =
        html +
        `<tr><td> <input type="checkbox" onchange="enableButton(${k})">  </td><td>${sno}</td><td>${arr[k].stname}</td><td>${arr[k].stemail} </td><td>${arr[k].stphone} </td><td>${arr[k].stage} </td><td>${arr[k].stdate} </td><td>${arr[k].stgender} </td><td><a href="javascript:void(0)" onclick="editData(${k})" class="btn btn-success">Edit</a>&nbsp;<a href="javascript:void(0)" class="btn btn-danger" onclick="deleteData(${k})">Delete</a></td></tr>`;
      sno++;
    }
    document.getElementById("root").innerHTML = html;
  }
}

// Edit Records

function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById("stname").value = arr[rid].stname;
  document.getElementById("stemail").value = arr[rid].stemail;
  document.getElementById("stphone").value = arr[rid].stphone;
  document.getElementById("stage").value = arr[rid].stage;
  document.getElementById("stdate").value = arr[rid].stdate;
}

// Delete Single Records

function deleteData(rid) {
  if (window.confirm("Are You Sure You Want To Delete?")) {
    let arr = getCrudData();
    arr.splice(rid, 1);
    setCrudData(arr);
    selectData();
  }
}

// To Get Data From Localstorage

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

// Set Data in LocalStorage Using Objects

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}

// For Searching Info

function searchData() {
  let getValue = document.getElementById("searchBox").value;

  if (getValue == "") {
    alert("Please Enter Name, Email Or Phone Number...");
  } else {
    let html = "";
    let arr = getCrudData();
    let sno = 1;

    const answer = arr.filter(
      (items) =>
        items.stname.includes(getValue) ||
        items.stemail.includes(getValue) ||
        items.stphone.includes(getValue)
    );

    if (answer == "") {
      html = html + `${getValue} Not Found in Name, Email Or Phone Number`;
    }
    for (i in answer) {
      html =
        html +
        `<tr><td> <input type="checkbox" > </td><td> ${sno} </td><td> ${answer[i].stname} </td><td>${answer[i].stemail} </td><td>${answer[i].stphone} </td><td>${answer[i].stage} </td><td>${answer[i].stdate} </td><td>${answer[i].stgender} </td><td><a href="javascript:void(0)" onclick="editData(${i})" class="btn btn-success">Edit</a>&nbsp;<a href="javascript:void(0)" class="btn btn-danger" onclick="deleteData(${i})">Delete</a></td></tr>`;
      sno++;
    }

    document.getElementById("root").innerHTML = html;

    // For Resetting Value
    document.getElementById("stname").value = "";
    document.getElementById("stemail").value = "";
    document.getElementById("stphone").value = "";
    document.getElementById("stage").value = "";
    document.getElementById("stdate").value = "";
  }
}

// For Page Reloading

function pageReload() {
  document.getElementById("searchBox").value = "";
  window.location.reload();
}

// To Clear Form When User Click on Clear Button

function clearForm() {
  document.getElementById("stname").value = "";
  document.getElementById("stemail").value = "";
  document.getElementById("stphone").value = "";
  document.getElementById("stage").value = "";
  document.getElementById("stdate").value = "";

  window.location.reload();
}
let totalValues = [];
function enableButton(value) {
  document.getElementById("deleteButton").style.display = "block";

  totalValues = [...totalValues, value];
  console.log(totalValues);
}

// For Delete Multiple Checked Records

function deleteRecords() {
  if (window.confirm("Are You Sure You Want To Delete?")) {
    let arr = getCrudData();

    for (i = totalValues.length - 1; i >= 0; i--) {
      arr.splice(totalValues[i], 1);
    }
    setCrudData(arr);
    selectData();
  }
}

// For Ascending Order

function ascending() {
  let html = "";
  let arr = getCrudData();
  let sno = 1;

  if (document.getElementById("asc").checked === true) {
    const order = arr.sort(function (a, b) {
      if (a.stname > b.stname) {
        return 1;
      } else {
        return -1;
      }
    });
    for (i in order) {
      html =
        html +
        `<tr><td> <input type="checkbox" > </td><td> ${sno} </td><td> ${order[i].stname} </td><td>${order[i].stemail} </td><td>${order[i].stphone} </td><td>${order[i].stage} </td><td>${order[i].stdate} </td><td>${order[i].stgender} </td><td><a href="javascript:void(0)" onclick="editData(${i})" class="btn btn-success">Edit</a>&nbsp;<a href="javascript:void(0)" class="btn btn-danger" onclick="deleteData(${i})">Delete</a></td></tr>`;
      sno++;
    }
  }
  if (document.getElementById("asc").checked === false) {
    for (let k in arr) {
      html =
        html +
        `<tr><td> <input type="checkbox" onchange="enableButton(${k})">  </td><td>${sno}</td><td>${arr[k].stname}</td><td>${arr[k].stemail} </td><td>${arr[k].stphone} </td><td>${arr[k].stage} </td><td>${arr[k].stdate} </td><td>${arr[k].stgender} </td><td><a href="javascript:void(0)" onclick="editData(${k})" class="btn btn-success">Edit</a>&nbsp;<a href="javascript:void(0)" class="btn btn-danger" onclick="deleteData(${k})">Delete</a></td></tr>`;
      sno++;
    }
  }

  document.getElementById("root").innerHTML = html;
}
