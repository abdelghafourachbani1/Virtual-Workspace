//////////// array des object contient tout les information d'emploi //////

let employes = [];

//////open and close form////////////

let openform = document.getElementById("openformbtn");
let formholder = document.getElementById("form-holder");
let closeformbtn = document.getElementById("closeformbtn");

openform.addEventListener("click", function () {
  formholder.classList.remove("hidden");
});

closeformbtn.addEventListener("click", function () {
  formholder.classList.add("hidden");
});

///////////preview image////////////

let photourlinput = document.getElementById("photourlinput");
let photopreview = document.getElementById("photopreview");

photourlinput.addEventListener("input", function () {
  photopreview.src = photourlinput.value;
});

////////////// clone experience inputs/////////////

let addexperiencebtn = document.getElementById("addexperiencebtn");
let experiencepart = document.getElementById("experiencepart");
let experienceinputs = document.querySelector(".experienceinputs");

addexperiencebtn.addEventListener("click", function () {
  let newexp = experienceinputs.cloneNode(true);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "supprimer";
  deleteBtn.className = "bg-red-600 text-white px-2 py-1 rounded-md w-full hover:bg-red-700";

  deleteBtn.addEventListener("click", function () {
    newexp.remove();
  });

  newexp.appendChild(deleteBtn);
  experiencepart.appendChild(newexp);
});

////////// form validate //////////

let submitbtn = document.getElementById("submitbtn");

submitbtn.addEventListener("click", function (e) {
  e.preventDefault();

  let fullname = document.getElementById("full-name").value;
  let emailinput = document.getElementById("email").value;
  let photourlinput = document.getElementById("photourlinput").value;
  let telephoneinput = document.getElementById("phonenumber").value;
  let rolesurentreprise = document.getElementById("rolesurentreprise").value;

  if(!(/^[A-Za-z]{8,}$/.test(fullname))) {
    alert("full name doit etre au moins 8 characters");
    return;
  }

  if(!(/^[a-zA-Z0-9._-]+@gmail\.com$/.test(emailinput))) {
    alert("email non valide (doit terminer par @gmail.com)");
    return;
  }

  if(!(/^https?:\/\/.+\.(jpg|png|jpeg)$/).test(photourlinput)) {
    alert("url image non valide");
    return;
  }

  if(!(/^[0-9]{10}$/).test(telephoneinput)) {
    alert("numero de telephone non valide");
    return;
  }

  let experienceobject = [];

  let experiences = document.querySelectorAll(".experienceinputs");

  experience.forEach(function (exper) {
    let entreprisename = document.querySelector(".entreprisename").value;
    let roleopt = document.querySelector("exprole");
    let datefrom = document.querySelector(".dateform").value;
    let dateto = document.querySelector(".dateto").value;

    datefrom.addEventListener("change", function() {
      dateto.min = datefrom.value;

      if(dateto.value && dateto.value < datefrom.value) {
        dateto.value = "";
        alert("dateto doit etre apres la date from");
      }
    });

    if (entreprisename && roleopt && datefrom && dateto) {
      experienceobject.push({
        entreprisename,roleopt,datefrom,dateto
      })
    }

  });

  let employe = {
    name : fullname,
    email : emailinput,
    numerotelephone : telephoneinput,
    role : rolesurentreprise,
  }

  employes.push(employe);
  alert("l'employe a ete ajoute en succe");

  ////////////reset form //////////

  document.querySelector("#full-name").value = "";
  document.querySelector("#email").value = "";
  document.getElementById("photourlinput").value = "";
  document.getElementById("phonenumber").value = "";
  document.querySelectorAll(".entreprisename").forEach(en => en = "");
  document.querySelectorAll(".exprole").forEach(exprole => exprole = "");
  document.querySelectorAll(".dateto").forEach(to => to = "");
  document.querySelectorAll(".datefrom").forEach(from => from = "");

})  

