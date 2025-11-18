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
  let photourl = document.getElementById("photourlinput").value;
  let telephoneinput = document.getElementById("phonenumber").value;
  let rolesurentreprise = document.getElementById("rolesurentreprise").value;

  if (!/^[A-Za-z]{8,}$/.test(fullname)) {
    alert("full name doit etre au moins 8 characters");
    return;
  }

  if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(emailinput)) {
    alert("email non valide (doit terminer par @gmail.com)");
    return;
  }

  if (!/^https?:\/\/.+\.(jpg|png|jpeg)$/i.test(photourl)) {
    alert("url image non valide");
    return;
  }

  if (!/^[0-9]{10}$/.test(telephoneinput)) {
    alert("numero de telephone non valide");
    return;
  }

  let experienceobject = [];
  let experiences = document.querySelectorAll(".experienceinputs");

  experiences.forEach(function (exp) {
    let entreprisename = exp.querySelector(".entreprisename").value;
    let roleopt = exp.querySelector(".exprole").value;
    let datefrom = exp.querySelector(".datefrom").value;
    let dateto = exp.querySelector(".dateto").value;

    if (entreprisename && roleopt && datefrom && dateto) {
      experienceobject.push({
        entreprisename: entreprisename,
        role: roleopt,
        datefrom: datefrom,
        dateto: dateto,
      });
    }
  });

  let employe = {
    name: fullname,
    email: emailinput,
    numerotelephone: telephoneinput,
    role: rolesurentreprise,
    photourl: photourl,
    experienceobject,
  };

  employes.push(employe);
  alert("l'employe a ete ajoute en succe");

  // reset form
    document.querySelector("#full-name").value = "";
    document.querySelector("#email").value = "";
    document.getElementById("photourlinput").value = "";
    document.getElementById("phonenumber").value = "";

    document.querySelectorAll(".entreprisename").forEach(el => el.value = "");
    document.querySelectorAll(".exprole").forEach(el => el.value = "");
    document.querySelectorAll(".dateto").forEach(el => el.value = "");
    document.querySelectorAll(".datefrom").forEach(el => el.value = "");

  formholder.classList.add("hidden");
  affichageemployees();

});

//////// add employe card //////////

let cardsholder = document.getElementById("cards-holder");

function affichageemployees() {
  cardsholder.innerHTML = "";
  let index = 0;

  for (let employe of employes) {
    let content = `
        <div onclick="employemodal(${index})" class="employe-card flex justify-between items-center p-3 rounded-xl border bg-white shadow-sm mb-2">
            <div class="flex items-center gap-3">
                <img class="w-16 h-16 rounded-full border border-gray-300 object-cover" src="${employe.photourl}" alt="employe image">

                <div class="flex flex-col">
                    <h3 class="text-lg font-bold">${employe.name}</h3>
                    <strong class="text-sm text-gray-600">${employe.role}</strong>
                </div>
            </div>

            <button onclick="deletemploye(${index}); event.stopPropagation();" class="text-red-500 hover:text-red-700 w-10 h-10 flex justify-center items-center">
                <i class="fa-solid fa-trash text-xl"></i>
            </button>
        </div>
    `;
    cardsholder.innerHTML += content;
    index++;
  }
}

function deletemploye(index) {
  employes.splice(index, 1);
  affichageemployees();
}

function employemodal(index) {
  let employe = employes[index];
}