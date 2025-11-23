/////////// the main array that contain the emplye infoo //////////////
let employes = [
    {
        id: Date.now() ,
        name: "vito",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "manager",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    }
];
let curreentzone = null;
affichageemployees();

////////////// call using dom ////////
let openform = document.getElementById("openformbtn");
let formholder = document.getElementById("form-holder");
let closeformbtn = document.getElementById("closeformbtn");

let photourlinput = document.getElementById("photourlinput");
let photopreview = document.getElementById("photopreview");

let addexperiencebtn = document.getElementById("addexperiencebtn");
let experiencepart = document.getElementById("experiencepart");
let experienceinputs = document.querySelector(".experienceinputs");

let submitbtn = document.getElementById("submitbtn");

let zonemodal = document.getElementById("zone-modal");
let zonetitle = document.getElementById("zone-title");
let zoneemployeeslist = document.getElementById("zone-employees-list");
let clozezonemodal = document.getElementById("close-zone-modal");

////////////////// room buttons ////////////////////////


let conferencebtn = document.getElementById("conferencebtn");
let serveursbtn = document.getElementById("serveursbtn");
let archivebtn = document.getElementById("archivebtn");
let receptionbtn = document.getElementById("receptionbtn");
let personnelbtn = document.getElementById("personnelbtn");
let securitebtn = document.getElementById("securitebtn");

// room elements (for rendering employees)


const roomels = {
    conferencebtn: document.getElementById("room1"),
    serveursbtn: document.getElementById("room2"),
    archivebtn: document.getElementById("room3"),
    receptionbtn: document.getElementById("room4"),
    personnelbtn: document.getElementById("room5"),
    serveurbtn: document.getElementById("room6"), 
    securitebtn: document.getElementById("room6"),
};

////////////////// config_room: les metier el la capacite de chaque salle ///////////////

const room_config = {
    conferencebtn: { 
        title: "Salle de Conférence",
        capacity: 5,
        mandatory: false, 
        allowed: ["manager", "nettoyage", "autre"] 
    },
    serveursbtn: { 
        title: "Salle des Serveurs", 
        capacity: 2, 
        mandatory: true, 
        allowed: ["technicien IT", "manager"] 
    },
    serveurbtn: { 
        title: "Salle des Serveurs", 
        capacity: 2, 
        mandatory: true, 
        allowed: ["technicien IT", "manager"] 
    }, 
    archivebtn: { 
        title: "Salle d'Archives", 
        capacity: 2, 
        mandatory: true, 
        allowed: ["manager"] 
    },
    receptionbtn: { 
        title: "Reception", 
        capacity: 3, 
        mandatory: true, 
        allowed: ["receptionniste", "manager", "nettoyage"] 
    },
    personnelbtn: { 
        title: "Salle du Personnel", 
        capacity: 8, 
        mandatory: false, 
        allowed: null 
    }, 
    securitebtn: { 
        title: "Salle de Securite", 
        capacity: 3, 
        mandatory: true, 
        allowed: ["agent de securite", "manager", "nettoyage"] 
    },
};

// ========== validation regex ==========
function validateName(name) {
    return /^[A-Za-z]{6,}$/.test(name);
}
function validateEmail(email) {
    return /^[a-zA-Z0-9._-]+@gmail\.com$/.test(email);
}
function validatePhotoUrl(url) {
    return /^https?:\/\/.+\.(jpg|png|jpeg)$/i.test(url);
}
function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}
function validateExperiences(expArray) {
    for (let ex of expArray) {
        if (!ex.entreprisename || !ex.role || !ex.datefrom || !ex.dateto) return false;
        let d1 = new Date(ex.datefrom);
        let d2 = new Date(ex.dateto);
        if (isNaN(d1) || isNaN(d2) || d1 > d2) return false;
    }
    return true;
}

/////////////// open / close form /////////////////
openform.addEventListener("click", function () {
    formholder.classList.remove("hidden");
});
closeformbtn.addEventListener("click", function () {
    formholder.classList.add("hidden");
});

/////////////// preview image ///////////////////
photourlinput.addEventListener("input", function () {
    photopreview.src = photourlinput.value ;
});

//////////////// clone experience inputs ////////////
addexperiencebtn.addEventListener("click", function () {
    let newexp = experienceinputs.cloneNode(true);

    newexp.querySelectorAll("button").forEach(b => b.remove());

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "supprimer";
    deleteBtn.className = "bg-red-600 text-white px-2 py-1 rounded-md w-full hover:bg-red-700 mt-2";

    deleteBtn.addEventListener("click", function () {
        newexp.remove();
    });

    newexp.appendChild(deleteBtn);
    experiencepart.appendChild(newexp);
});

/////////////////// submit / add employee (with validation + experience date) ////////////////
submitbtn.addEventListener("click", function (e) {
    e.preventDefault();

    let fullname = document.getElementById("full-name").value;
    let emailinput = document.getElementById("email").value;
    let photourl = document.getElementById("photourlinput").value;
    let telephoneinput = document.getElementById("phonenumber").value;
    let rolesurentreprise = document.getElementById("rolesurentreprise").value;

    ////////////////// regex validation usign function //////////////

    if (!validateName(fullname)) {
        alert("Nom non valide (min 6 lettres).");
        return;
    }
    if (!validateEmail(emailinput)) {
        alert("Email non valide.");
        return;
    }
    if (!validatePhotoUrl(photourl)) {
        alert("URL de l'image non valide (jpg/png/jpeg).");
        return;
    }
    if (!validatePhone(telephoneinput)) {
        alert("Numero de téléphone non valide (10 chiffres).");
        return;
    }

    // experiences parsing + validation of dates
      let experienceobject = [];
    let experiences = document.querySelectorAll(".experienceinputs");

    experiences.forEach(function (exp) {
        let entreprisename = exp.querySelector(".entreprisename").value;
        let roleopt = exp.querySelector(".exprole").value;
        let datefrom = exp.querySelector(".datefrom").value;
        let dateto = exp.querySelector(".dateto").value;

        if (entreprisename || roleopt || datefrom || dateto) {
            experienceobject.push({
                entreprisename: entreprisename,
                role: roleopt,
                datefrom: datefrom,
                dateto: dateto,
            });
        }
    });

    if (!validateExperiences(experienceobject)) {
        alert("dates invalide ou incompletes (date debut < date fin).");
        return;
    }

    let employe = {
        name: fullname,
        email: emailinput,
        numerotelephone: telephoneinput,
        role: rolesurentreprise || "autre",
        photourl: photourl ,
        exprecinces: experienceobject,
        zone: null,
        assigned: false,
    };

    employes.push(employe);
    alert("L'employe a ete ajoute avec succe.");

    // reset form (clear inputs)
    document.querySelector("#full-name").value = "";
    document.querySelector("#email").value = "";
    document.getElementById("photourlinput").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("rolesurentreprise").value = "";

    document.querySelectorAll(".entreprisename").forEach(el => el.value = "");
    document.querySelectorAll(".exprole").forEach(el => el.value = "");
    document.querySelectorAll(".dateto").forEach(el => el.value = "");
    document.querySelectorAll(".datefrom").forEach(el => el.value = "");

    formholder.classList.add("hidden");
    affichageemployees();
    renderAllZones();
});

// ========== affichage employees in aside (Unassigned only) ==========
function affichageemployees() {
    let cardsholder = document.getElementById("cards-holder");
    cardsholder.innerHTML = "";
    let index = 0;

    for (let employe of employes) {
        if (employe.assigned) continue; // show only unassigned in the aside

        // build card element (to allow listeners)
        let card = document.createElement("div");
        card.className = "employe-card flex justify-between items-center p-1 rounded-xl border bg-white shadow-sm mb-2 cursor-pointer";

        card.innerHTML = `
        <div class="flex items-center gap-3">
            <img class="w-16 h-16 rounded-full border border-gray-300 object-cover" src="${employe.photourl}" alt="employe image">
            <div class="flex flex-col">
            <h3 class="text-lg font-bold">${employe.name}</h3>
            <strong class="text-sm text-gray-600">${employe.role}</strong>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <button class="btn-view text-blue-600" data-id="${employe.id}"><i class="fa-solid fa-eye"></i></button>
            <button class="btn-delete text-red-500" data-index="${index}"><i class="fa-solid fa-trash text-xl"></i></button>
        </div>
        `;

        // click on card shows details (except when clicking buttons)
        card.addEventListener("click", function (ev) {
            if (ev.target.closest(".btn-delete") || ev.target.closest(".btn-view"))  return;
            showdetails(employe.id);
        });

        // delete button
        card.querySelector(".btn-delete").addEventListener("click", function (ev) {
            ev.stopPropagation();
            deletemploye(Number(this.dataset.index));
        });

        // view detail button
        card.querySelector(".btn-view").addEventListener("click", function (ev) {
            ev.stopPropagation();
            showdetails(Number(this.dataset.id));
        });

        cardsholder.appendChild(card);
        index++;
    }
}

////////////////// delete employee ///////////////

function deletemploye(index) {
    if (index < 0 || index >= employes.length) return;
    if (!confirm("supprimer cette employe ?")) return;
    employes.splice(index, 1);
    affichageemployees();
    renderAllZones();
}

/////////////////// zone modal list //////////////////

clozezonemodal.addEventListener("click", function () {
    zonemodal.classList.add("hidden");
});

function zoneemplyemodal(title, arrayemployees) {
    console.log("current zone:", curreentzone);

    if (!curreentzone) {
        alert("zone non definie !");
        return;
    }

    zonetitle.textContent = title;
    zoneemployeeslist.innerHTML = "";

    if (arrayemployees.length === 0) {
        zoneemployeeslist.innerHTML = `<p class="text-sm text-gray-500">Aucun employé éligible disponible.</p>`;
    }

    arrayemployees.forEach(emp => {
        // create node instead of innerHTML += to attach listeners
        let el = document.createElement("div");
        el.id = `zone-emp-${emp.id}`;
        el.className = "flex justify-between items-center p-2 rounded-xl border bg-white shadow-sm mb-1 cursor-pointer";
        el.innerHTML = `
        <div class="flex items-center gap-3">
            <img class="w-14 h-14 rounded-full border border-gray-300 object-cover" src="${emp.photourl}" alt="employe image">
            <div class="flex flex-col">
            <h3 class="text-lg font-bold">${emp.name}</h3>
            <strong class="text-sm text-gray-600">${emp.role}</strong>
            </div>
        </div>
        <button class="px-3 py-1 bg-green-600 text-white rounded-md assign-btn" data-id="${emp.id}">Affecter</button>
        `;
        zoneemployeeslist.appendChild(el);

        // click to assign
        el.querySelector(".assign-btn").addEventListener("click", function (ev) {
            ev.stopPropagation();
            assigntozone(emp.id);
        });

        // click to show details
        el.addEventListener("click", function () {
            showdetails(emp.id);
        });
    });

    zonemodal.classList.remove("hidden");
}

////////////////// zone buttons listeners  ////////////////
conferencebtn.addEventListener("click", function () {
    curreentzone = "conferencebtn";
    let conferanceemp = ["manager", "nettoyage", "autre"];
    let conferancearray = employes.filter(e => conferanceemp.includes(e.role) && !e.assigned);
    zoneemplyemodal("Salle de Conférence", conferancearray);
});

securitebtn.addEventListener("click", function () {
    curreentzone = "securitebtn";
    let securiteemp = ["agent de securite", "manager", "nettoyage"];
    let securitearray = employes.filter(e => securiteemp.includes(e.role) && !e.assigned);
    zoneemplyemodal("Salle de Securite", securitearray);
});

archivebtn.addEventListener("click", function () {
    curreentzone = "archivebtn";
    let archiveemp = ["manager", "technicien IT", "agent de securite"];
    let archivearray = employes.filter(e => archiveemp.includes(e.role) && !e.assigned);
    zoneemplyemodal("Salle d'Archive", archivearray);
});

receptionbtn.addEventListener("click", function () {
    curreentzone = "receptionbtn";
    let receptionemp = ["receptionniste", "manager", "nettoyage"];
    let receptionarray = employes.filter(e => receptionemp.includes(e.role) && !e.assigned);
    zoneemplyemodal("Salle de Reception", receptionarray);
});

personnelbtn.addEventListener("click", function () {
    curreentzone = "personnelbtn";
    let personnelarray = employes.filter(e => !e.assigned);
    zoneemplyemodal("Salle du Personnel", personnelarray);
});

serveursbtn.addEventListener("click", function () {
    curreentzone = "serveursbtn";
    let servveremp = ["technicien IT", "manager"];
    let serverarray = employes.filter(e => servveremp.includes(e.role) && !e.assigned);
    zoneemplyemodal("Salle des Serveurs", serverarray);
});



////////////////////// assign to zone (with role check + capacity check) ////////////////
function assigntozone(empId) {
    let employe = employes.find(e => e.id === empId);
    if (!employe) return;

    if (!curreentzone) {
        alert("Zone non sélectionnée !");
        return;
    }

    // role check using room_config
    const cfg = room_config[curreentzone];
    if (!cfg) {
        alert("Configuration de la zone introuvable.");
        return;
    }

    // role allowed?
    const roleAllowed = (function () {
        if (employe.role === "manager") return true;
        if (employe.role === "nettoyage" && curreentzone === "archivebtn") return false;
        if (!cfg.allowed) return true;
        return cfg.allowed.includes(employe.role);
    })();

    if (!roleAllowed) {
        alert(`Le rôle "${employe.role}" n'est pas autorisé ici`);
        return;
    }

    // capacity check
    const occupantsCount = employes.filter(e => e.assigned && e.zone === curreentzone).length;
    if (occupantsCount >= cfg.capacity) {
        alert(`Capacité atteinte pour ${cfg.title} (${cfg.capacity})`);
        return;
    }

    employe.zone = curreentzone;
    employe.assigned = true;

    zonemodal.classList.add("hidden");
    affichageemployees();
    renderAllZones();
}