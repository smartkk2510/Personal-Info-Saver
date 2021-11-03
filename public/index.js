const newcontent = (person) => {
  return `  <div id="${person.id}" class="col-md-4  mx-1 my-3">
  <div class="Info-content">
  <div class="content-header">
  <center><h2>${person.FirstName.toUpperCase()}'S INFO</h2></center> 
  <hr style="margin-top:0;margin-bottom:0;">  
 </div>

 <div class="content-body">
 <span contenteditable ="false">First Name:</span>
      <p class="m-c"> ${person.FirstName.toUpperCase()}</p>
      <hr>
      <span contenteditable ="false">Last Name:</span>
      <p class="m-c"> ${person.LastName.toUpperCase()}</p>
      <hr>
      <span contenteditable ="false">Email:</span> 
      <p class="m-c">${person.Email}</p>
      <hr>
      <span contenteditable ="false">Phone Number:</span>
      <p class="m-c"> ${person.Phone_number}</p>
      <hr>
      <span contenteditable ="false">Address:</span>
      <p class="m-c"> ${person.Address.toUpperCase()}</p>
      <hr>
      <span contenteditable ="false">Qualification:</span> 
      <p class="m-c">${person.Qualification.toUpperCase()}</p>
      <hr style="margin-bottom:0">
      
</div>
<div class="content-footer">
  <a type="button" name="${
    person.FirstName
  }" class="btn btn-warning mx-1 my-2" onclick="editCard(this)" href="#">Edit</a>
  <button type="button" name="${
    person.FirstName
  }" onclick="deleteCard(event)" class="btn btn-danger mx-1 my-2" >Delete</button>
</div>
</div>
 
</div>`;
};
const addContent = async () => {
  let data = await fetch("https://personal-info-saver.herokuapp.com/read-info");
  peopleSArray = await data.json();
  peopleSArray.forEach((person) => {
    document
      .querySelector("#root")
      .insertAdjacentHTML("beforeend", newcontent(person));
  });
};
const deleteCard = async (event) => {
  const targetID = event.target.getAttribute("name");
  //console.log(targetID);
  await fetch(`https://personal-info-saver.herokuapp.com/delete-info/${targetID}`, {
    method: "DELETE",
  });
  // addContent();
  window.location.reload();
};
const search = async () => {
  const value = document.getElementById("searchP").value;
  document.getElementById("root").innerHTML = "";
  // console.log(value);
  let data = await fetch(`https://personal-info-saver.herokuapp.com/read-info/${value}`);
  person = await data.json();
  // console.log(person);
  if (value != "") {
    document
      .querySelector("#root")
      .insertAdjacentHTML("afterbegin", newcontent(person));
    // window.location.reload();
  }
};

const editCard = (event) => {
  event.innerHTML = "Save";
  event.parentNode.parentNode.childNodes[3].childNodes[3].setAttribute(
    "contenteditable",
    "true"
  );
  event.parentNode.parentNode.childNodes[3].childNodes[9].setAttribute(
    "contenteditable",
    "true"
  );
  event.parentNode.parentNode.childNodes[3].childNodes[15].setAttribute(
    "contenteditable",
    "true"
  );
  event.parentNode.parentNode.childNodes[3].childNodes[21].setAttribute(
    "contenteditable",
    "true"
  );
  event.parentNode.parentNode.childNodes[3].childNodes[27].setAttribute(
    "contenteditable",
    "true"
  );
  event.parentNode.parentNode.childNodes[3].childNodes[33].setAttribute(
    "contenteditable",
    "true"
  );
  event.setAttribute("onclick", "saveCard(this)");
};
const saveCard = async (e) => {
  let fn = e.parentNode.parentNode.childNodes[3].childNodes[3].textContent;
  let ln = e.parentNode.parentNode.childNodes[3].childNodes[9].textContent;
  let email = e.parentNode.parentNode.childNodes[3].childNodes[15].textContent;
  let ph = e.parentNode.parentNode.childNodes[3].childNodes[21].textContent;
  let address =
    e.parentNode.parentNode.childNodes[3].childNodes[27].textContent;
  let Ql = e.parentNode.parentNode.childNodes[3].childNodes[33].textContent;
  const data = {
    FirstName: fn,
    LastName: ln,
    Email: email,
    Phone_number: ph,
    Address: address,
    Qualification: Ql,
  };
  // console.log(data);
  // console.log(e.getAttribute("name"));
  await fetch(`https://personal-info-saver.herokuapp.com/update-info/${e.getAttribute("name")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  window.location.reload();
};
