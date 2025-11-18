//////////// array des object contient tout les information d'emploi //////

let employes = [];

//////open and close form////////////

let openform = document.getElementById("openformbtn");
let formholder = document.getElementById("form-holder");
let closeformbtn = document.getElementById("closeformbtn");

openform.addEventListener("click",function () {
  formholder.classList.remove("hidden");
});

closeformbtn.addEventListener("click",function () {
  formholder.classList.add("hidden");
});

///////////preview image////////////

let photourlinput = document.getElementById("photourlinput");
let photopreview = document.getElementById("photopreview");

photourlinput.addEventListener("input",function () {
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


