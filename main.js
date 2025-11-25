/////////// the main array that contain the emplye infoo //////////////
let employes = [
    {
        id: Date.now() +1,
        name: "vito",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "manager",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 2,
        name: "ali",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "manager",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 3,
        name: "reda",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "technicien IT",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 4,
        name: "khaled",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "technicien IT",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 5,
        name: "mouad",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "nettoyage",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 6,
        name: "ayoub",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "nettoyage",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 7,
        name: "ayoub",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "receptionniste",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 8,
        name: "ayoub",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "receptionniste",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 9,
        name: "ayoub",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "agent de securite",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
    {
        id: Date.now() + 10,
        name: "ayoub",
        email: "achbaniabdelghafour8@gmail.com",
        numerotelephone: "0612345678",
        assigned: false,
        role: "agent de securite",
        photourl: "https://i.pravatar.cc/150?img=12",
        exprecinces: [],
        zone: null,
    },
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


// ========== validation regex ==========
function validateName(name) {
    return /^[A-Za-z]{4,}$/.test(name);
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
        alert("Nom non valide (min 4 lettres).");
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
        id : Date.now(),
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
        if (employe.assigned) continue; 

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
            <button class="btn-delete text-red-500" data-index="${index}"><i class="fa-solid fa-trash text-xl"></i></button>
        </div>
        `;

        card.addEventListener("click", function (ev) {
            if (ev.target.closest(".btn-delete"))  return;
            showdetails(employe.id);
        });

        card.querySelector(".btn-delete").addEventListener("click", function (ev) {
            ev.stopPropagation();
            deletemploye(this.dataset.index);
        });

        cardsholder.appendChild(card);
        index++;
    }
}

////////////////// delete employee ///////////////

function deletemploye(index) {
    if (!confirm("supprimer cette employe ?")) return;
    employes.splice(index, 1);
    affichageemployees();
    renderAllZones();
}


////////////////// room buttons ////////////////////////

let conferencebtn = document.getElementById("conferencebtn");
let serveursbtn = document.getElementById("serveursbtn");
let archivebtn = document.getElementById("archivebtn");
let receptionbtn = document.getElementById("receptionbtn"); 
let personnelbtn = document.getElementById("personnelbtn");
let securitebtn = document.getElementById("securitebtn");

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

/////////////////// zone modal list //////////////////

let zonemodal = document.getElementById("zone-modal");
let zonetitle = document.getElementById("zone-title");
let zoneemployeeslist = document.getElementById("zone-employees-list");
let clozezonemodal = document.getElementById("close-zone-modal");

clozezonemodal.addEventListener("click", function () {
    zonemodal.classList.add("hidden");
});

function zoneemplyemodal(title, arrayemployees) {

    zonetitle.textContent = title;
    zoneemployeeslist.innerHTML = "";

    if (arrayemployees.length === 0) {
        zoneemployeeslist.innerHTML = `<p class="text-sm text-gray-500">aucune employe disponible</p>`;
    }

    arrayemployees.forEach(emp => {
        let el = document.createElement("div");
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

        el.querySelector(".assign-btn").addEventListener("click", function (ev) {
            ev.stopPropagation();
            assigntozone(emp.id);
        });

        el.addEventListener("click", function () {
            showdetails(emp.id);
        });
    });

    zonemodal.classList.remove("hidden");
}

////////////////// config_room: les metier el la capacite de chaque salle ///////////////

let room_config = {
    conferencebtn: { 
        title: "Salle de Conférence",
        capacity: 5, 
        allowed: ["manager", "nettoyage", "autre"] 
    },
    serveursbtn: { 
        title: "Salle des Serveurs", 
        capacity: 2, 
        allowed: ["technicien IT", "manager"] 
    },
    serveurbtn: { 
        title: "Salle des Serveurs", 
        capacity: 2, 
        allowed: ["technicien IT", "manager"] 
    }, 
    archivebtn: { 
        title: "Salle d'Archives", 
        capacity: 2,  
        allowed: ["manager"] 
    },
    receptionbtn: { 
        title: "Reception", 
        capacity: 3,  
        allowed: ["receptionniste", "manager", "nettoyage"] 
    },
    personnelbtn: { 
        title: "Salle du Personnel", 
        capacity: 8,  
        allowed: null 
    }, 
    securitebtn: { 
        title: "Salle de Securite", 
        capacity: 3, 
        allowed: ["agent de securite", "manager", "nettoyage"] 
    },
};

////////////////////// assign to zone (with role check + capacity check) ////////////////

function assigntozone(empId) {
    let employe = employes.find(e => e.id === empId);
    if (!employe) return;

    let cfg = room-config[curreentzone];
    if (!cfg) {
        alert("configuration de cette zone non trouver");
        return;
    }

    // test allowd
    let roleAllowed = (function () {
        if (!cfg.allowed) return true; // the personnel romm//
        return cfg.allowed.includes(employe.role);
    })();

    if (!roleAllowed) {
        alert(`Le metier "${employe.role}" n'est pas autorise dans cett salle `);
        return;
    }

    // test de capacite
    let currentcount = employes.filter(e => e.assigned && e.zone === curreentzone).length;
    if (currentcount >= cfg.capacity) {
        alert(`le maximum capacite attaint pour ${cfg.title} est (${cfg.capacity})`);
        return;
    }

    employe.zone = curreentzone;
    employe.assigned = true;

    zonemodal.classList.add("hidden");
    affichageemployees();
    renderAllZones();
}
// room elements (for rendering employees)

let roomels = {
    conferencebtn : document.getElementById("room1"),
    serveursbtn : document.getElementById("room2"),
    archivebtn: document.getElementById("room3"),
    receptionbtn: document.getElementById("room4"),
    personnelbtn: document.getElementById("room5"),
    serveurbtn: document.getElementById("room6"), 
};


///////////// render employees inside each room ///////////
function renderAllZones() {
    for (let zonekey in room_config) {
        renderZone(zonekey);
    }
}

function renderZone(zonekey) {
    let cfg = room_config[zonekey];
    let domelroom = roomels[zonekey];
    if (!domelroom) return;

    domelroom.querySelectorAll(".zone-employee").forEach(n => n.remove());

    let occupant = employes.filter(emp => emp.assigned && e.zone === zonekey);

    if (occupant.length === 0) {
        if (!domelroom.querySelector(".empty-overlay")) {
            let overlay = document.createElement("div");
            overlay.className = "empty-overlay absolute inset-0 bg-red-100/50 pointer-events-none rounded-md";
            domelroom.classList.add("relative"); 
            domelroom.appendChild(overlay);
        }
    } else {
        let overlay = domelroom.querySelector(".empty-overlay");
        if (overlay) overlay.remove();
    }

    occupant.forEach(emp => {
        let nemp = document.createElement("div");
        nemp.className = "zone-employee flex items-center gap-2 p-1 rounded-md mt-2 bg-white shadow-sm w-full justify-between";
        nemp.innerHTML = 
            `
                <div class="flex items-center gap-2">
                    <img src="${emp.photourl}" class="w-10 h-10 rounded-full object-cover border" alt="${emp.name}">
                    <div>
                    <div class="text-sm font-semibold">${emp.name}</div>
                    <div class="text-xs text-gray-500">${emp.role}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn-zone-detail text-blue-600" data-id="${emp.id}"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-unassign text-red-500" data-id="${emp.id}"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
        domelroom.appendChild(node);

        nemp.querySelector(".btn-unassign").addEventListener("click", function () {
            unassignEmployee(emp.id);
        });

        nemp.querySelector(".btn-zone-detail").addEventListener("click", function () {
            showdetails(emp.id);
        });
    });
}

//////////// unassign employee ////////////

function unassignEmployee(empId) {
    const emp = employes.find(e => e.id === empId);
    if (!emp) return;
    emp.zone = null;
    emp.assigned = false;
    affichageemployees();
    renderAllZones();
}

/////////// show details modal (simple) /////////
let detailModal = null;
function showdetails(empId) {

    let emp = employes.find(e => e.id === empId);
    if (!emp) return;

    // remove previous
    if (detailModal) detailModal.remove();

    detailModal = document.createElement("div");
    detailModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50";
    detailModal.innerHTML = `
            <div class="bg-white w-full max-w-lg p-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start gap-4">
                <div class="flex gap-4 items-center">
                <img src="${emp.photourl}" class="w-28 h-28 rounded-full object-cover border" alt="${emp.name}">
                <div>
                    <h2 class="text-xl font-bold">${emp.name}</h2>
                    <p class="text-sm text-gray-600">${emp.role}</p>
                    <p class="text-sm">${emp.email}</p>
                    <p class="text-sm">${emp.numerotelephone}</p>
                </div>
                </div>
                <div class="flex flex-col gap-2">
                <button id="close-detail-modal" class="px-3 py-1 bg-gray-200 rounded">Fermer</button>
                ${emp.assigned ? `<button id="remove-from-zone" class="px-3 py-1 bg-red-600 text-white rounded">Retirer</button>` : ''}
                </div>
            </div>
            <hr class="my-3" />
            <div>
                <h3 class="font-bold">Expériences</h3>
                <div id="exp-list" class="space-y-2 mt-2"></div>
            </div>
            </div>
        `;
    document.body.appendChild(detailModal);

    let expList = detailModal.querySelector("#exp-list");
    if (!emp.exprecinces || emp.exprecinces.length === 0) {
        expList.innerHTML = "<p class='text-sm text-gray-500'>Aucune expérience </p>";
    } else {
        emp.exprecinces.forEach(ex => {
            let el = document.createElement("div");
            el.className = "border p-2 rounded";
            el.innerHTML = `<div class="font-semibold">${ex.entreprisename || "—"}</div>
        <div class="text-sm text-gray-600">${ex.role || "—"}</div>
        <div class="text-xs text-gray-500">${ex.datefrom || "—"} → ${ex.dateto || "—"}</div>`;
            expList.appendChild(el);
        });
    }

    detailModal.querySelector("#close-detail-modal").addEventListener("click", () => { detailModal.remove(); detailModal = null; });
    let removeBtn = detailModal.querySelector("#remove-from-zone");
    if (removeBtn) removeBtn.addEventListener("click", () => { unassignEmployee(emp.id); if (detailModal) { detailModal.remove(); detailModal = null; } });

}

///////////// initial renders ////////////

affichageemployees();
renderAllZones();